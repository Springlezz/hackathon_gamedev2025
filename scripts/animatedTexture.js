import Texture from './texture.js';

export default class AnimatedTexture extends Texture {
    constructor(image, framesNum) {
        super(image);
        this.framesNum = framesNum;
    }

    render(ctx, position, frame) {
        const frameWidth = this.width / this.framesNum;
        ctx.drawImage(this.image, frame * frameWidth, 0, frameWidth, this.height, position.x - this.width / 2, position.y - this.height / 2, frameWidth, this.height);
    }
}