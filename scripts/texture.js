const textures = {};

export default class Texture {
    constructor(image) {
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }

    render(ctx, position) {
        ctx.drawImage(this.image, position.x - this.width / 2, position.y - this.height / 2, this.width, this.height);
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