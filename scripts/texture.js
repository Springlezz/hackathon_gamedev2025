const textures = {};

export default class Texture {
    constructor(image) {
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }

    render(ctx, dt, position, rotation = 0, invertX = 1, invertY = 1) {
        ctx.save();
        ctx.translate(position.x, -position.y);
        ctx.rotate(rotation);
        ctx.scale(invertX, invertY);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    static async load(name) {
        if (textures[name]) return textures[name];
        else {
            const img = new Image();
            const promise = new Promise((resolve, reject) => {
                img.addEventListener('load', () => {
                    textures[name] = img;
                    resolve(new Texture(img));
                });
                img.addEventListener('error', reject);
            });
            img.src = `/images/${name}.png`;
            return promise;
        }
    }
}