const textures = {};

export default class Texture {
    constructor(image) {
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }

    render(ctx, position) {
        const x = Math.round(position.x - this.width / 2);
        const y = Math.round(-position.y - this.height / 2);
        ctx.drawImage(this.image, x, y, this.width, this.height);
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