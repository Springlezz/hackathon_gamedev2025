import type Vector2 from './vector2.ts';

const textures: Record<string, Texture> = {};

export default class Texture {
    image: HTMLImageElement;
    width: number;
    height: number;

    constructor(image: HTMLImageElement) {
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }

    render(ctx: CanvasRenderingContext2D, _dt: number, position: Vector2, rotation = 0, invertX = 1, invertY = 1) {
        ctx.save();
        ctx.translate(position.x, -position.y);
        ctx.rotate(rotation);
        ctx.scale(invertX, invertY);
        ctx.drawImage(
            this.image,
            -this.width / 2, -this.height / 2,
            this.width, this.height
        );
        ctx.restore();
    }

    static async load(name: string): Promise<Texture> {
        if (textures[name]) return textures[name];
        else {
            const img = new Image();
            const promise = new Promise((resolve: (value: Texture) => void, reject) => {
                img.addEventListener('load', () => {
                    textures[name] = new Texture(img);
                    resolve(textures[name]);
                });
                img.addEventListener('error', reject);
            });
            img.src = `/textures/${name}.png`;
            return promise;
        }
    }
}