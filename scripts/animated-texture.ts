import type Vector2 from './vector2.ts';

const textures: Record<string, HTMLImageElement> = {};

export default class AnimatedTexture {
    image: HTMLImageElement;
    width: number;
    height: number;
    framesNum: number;
    timeChange: number;
    protected time = 0;

    constructor(image: HTMLImageElement, framesNum: number, timeChange: number) {
        this.image = image;
        this.width = image.width;
        this.height = image.height;
        this.framesNum = framesNum;
        this.timeChange = timeChange;
    }

    render(ctx: CanvasRenderingContext2D, dt: number, position: Vector2, rotation = 0, invertX = 1, invertY = 1) {
        this.time += dt;
        const frame = ((this.time / this.timeChange | 0) % this.framesNum + this.framesNum) % this.framesNum;
        const frameWidth = this.width / this.framesNum;
        if (frame > this.framesNum - 1 || frame < 0) console.error(frame, this.framesNum, this.time);

        ctx.save();
        ctx.translate(position.x, -position.y);
        ctx.rotate(rotation);
        ctx.scale(invertX, invertY);
        ctx.drawImage(
            this.image,
            frame * frameWidth, 0,
            frameWidth, this.height,
            -frameWidth / 2, -this.height / 2,
            frameWidth, this.height
        );
        ctx.restore();
    }

    static async load(name: string, framesNum: number, timeChange: number): Promise<AnimatedTexture> {
        if (textures[name]) return new AnimatedTexture(textures[name], framesNum, timeChange);
        else {
            const img = new Image();
            const promise = new Promise((resolve: (value: AnimatedTexture) => void, reject) => {
                img.addEventListener('load', () => {
                    textures[name] = img;
                    resolve(new AnimatedTexture(img, framesNum, timeChange));
                });
                img.addEventListener('error', reject);
            });
            img.src = `/textures/${name}.png`;
            return promise;
        }
    }
}