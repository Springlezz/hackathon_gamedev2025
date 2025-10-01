export default class Texture {
    constructor(image) {
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }

    render(ctx, position) {
        ctx.drawImage(this.image, position.x - this.width / 2, position.y - this.height / 2);
    }
}