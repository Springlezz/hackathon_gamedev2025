const sounds = {};

export default class Sound {
    constructor(audio, loop = false, volume = 1) {
        this.audio = audio;
        this.loop = loop;
        this.volume = volume;
    }

    play() {
        const audio = this.audio.cloneNode();
        audio.volume = this.volume;
        audio.loop = this.loop;
        audio.play();
    }

    static async load(name, loop = false, volume = 1) {
        if (sounds[name]) return new Sound(sounds[name], loop, volume);
        else {
            const audio = new Audio(`/sounds/${name}.mp3`);
            const promise = new Promise((resolve, reject) => {
                audio.addEventListener('canplaythrough', () => {
                    sounds[name] = audio;
                    resolve(new Sound(audio, loop, volume));
                });
                audio.addEventListener('error', reject);
            });
            return promise;
        }
    }
}