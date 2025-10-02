const textures = {};

export default class AnimatedTexture {
    time = 0;
    frame = 0;

    constructor(image, framesNum, timeChange) {
        this.image = image;
        this.width = image.width;
        this.height = image.height;
        this.framesNum = framesNum;
        this.timeChange = timeChange;
    }

    render(ctx, dt, position, rotation = 0, invertX = 1, invertY = 1) {
        ctx.save();

        ctx.translate(position.x, -position.y);
        ctx.rotate(rotation);
        ctx.scale(invertX, invertY);

        this.time += dt;
        while (this.time >= this.timeChange) {
            this.time -= this.timeChange;
            this.frame = (this.frame + 1) % this.framesNum;
        }

        const frameWidth = this.width / this.framesNum;
        ctx.drawImage(
            this.image,
            this.frame * frameWidth, 0,
            frameWidth, this.height,
            -frameWidth / 2, -this.height / 2,
            frameWidth, this.height
        );

        ctx.restore();
    }

    static async load(name, framesNum, timeChange) {
        if (textures[name]) return textures[name];
        else {
            const img = new Image();
            const promise = new Promise((resolve, reject) => {
                img.addEventListener('load', () => {
                    textures[name] = img;
                    resolve(new AnimatedTexture(img, framesNum, timeChange));
                });
                img.addEventListener('error', reject);
            });
            img.src = `/images/${name}.png`;
            return promise;
        }
    }
}