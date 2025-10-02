const textures = {};

export default class AnimatedTexture {
    constructor(image, framesNum) {
        this.image = image;
        this.width = image.width;
        this.height = image.height;
        this.framesNum = framesNum;
    }

    render(ctx, position, frame) {
        const frameWidth = this.width / this.framesNum;
        ctx.drawImage(this.image, frame * frameWidth, 0, frameWidth, this.height, position.x - this.width / 2, position.y - this.height / 2, frameWidth, this.height);
    }

    static async load(name, framesNum) {
        if (textures[name]) return textures[name];
        else {
            const img = new Image();
            const promise = new Promise((resolve, reject) => {
                img.addEventListener('load', () => {
                    textures[name] = img;
                    resolve(new AnimatedTexture(img, framesNum));
                });
                img.addEventListener('error', reject);
            });
            img.src = `/images/${name}.png`;
            return promise;
        }
    }
}