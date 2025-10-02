const sounds = {};

export default class Sound {
    constructor(audio, volume = 1, loop = false) {
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

    static async load(name, volume = 1, loop = false) {
        if (sounds[name]) return new Sound(sounds[name], volume, loop);
        else {
            const audio = new Audio(`/sounds/${name}.mp3`);
            const promise = new Promise((resolve, reject) => {
                audio.addEventListener('canplaythrough', () => {
                    sounds[name] = audio;
                    resolve(new Sound(audio, volume, loop));
                });
                audio.addEventListener('error', reject);
            });
            return promise;
        }
    }
}