const sounds: Record<string, HTMLAudioElement> = {};

export default class Sound {
    audio: HTMLAudioElement;
    loop: boolean;
    volume: number;

    constructor(audio: HTMLAudioElement, volume = 1, loop = false) {
        this.audio = audio;
        this.loop = loop;
        this.volume = volume;
    }

    play() {
        const audio = this.audio.cloneNode() as HTMLAudioElement;
        audio.volume = this.volume;
        audio.loop = this.loop;
        audio.play();
    }

    static async load(name: string, volume = 1, loop = false): Promise<Sound> {
        if (sounds[name]) return new Sound(sounds[name], volume, loop);
        else {
            return new Promise((resolve: (value: Sound) => void, reject) => {
                const audio = new Audio(`/sounds/${name}.mp3`);
                audio.addEventListener('canplaythrough', () => {
                    sounds[name] = audio;
                    resolve(new Sound(audio, volume, loop));
                });
                audio.addEventListener('error', reject);
            });
        }
    }
}