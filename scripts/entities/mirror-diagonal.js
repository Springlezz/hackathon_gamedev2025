import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('mirror-diagonal');

export default class MirrorDiagonal extends Entity {
    texture = texture;
    size = new Vector2(14, 27);
    static = false;
    rayLength = 0;

    constructor(position, left = false) {
        super(position);
        this.left = left;
    }

    render(ctx, dt) {
        this.texture.render(ctx, dt, this.position, 0, this.left ? -1 : 1);

        if (this.rayLength > 0) {
            const dir = this.left ? -1 : 1;
            ctx.save();
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#F88';
            ctx.beginPath();
            ctx.moveTo(this.position.x, -this.position.y);
            ctx.lineTo(this.position.x + this.rayLength, -this.position.y - this.rayLength);
            ctx.stroke();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#F00';
            ctx.beginPath();
            ctx.moveTo(this.position.x, -this.position.y);
            ctx.lineTo(this.position.x + this.rayLength, -this.position.y - this.rayLength);
            ctx.stroke();
            ctx.restore();
        }
    }
}