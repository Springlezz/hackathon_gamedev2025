import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import RotatedEntity from './rotated-entity.js';

const texture = await Texture.load('mirror');

export default class Mirror extends RotatedEntity {
    texture = texture;
    size = new Vector2(64, 12);
    rays = [];

    constructor(position, rotation = 0) {
        super(position, rotation);
        if (rotation === 0) this.static = false;
    }

    render(ctx, dt) {
        for (const [origin, direction, length] of this.rays) {
            ctx.save();
            ctx.translate(origin.x, -origin.y);
            ctx.rotate(direction.getAngle());

            ctx.lineWidth = 4;
            ctx.strokeStyle = '#EA7575';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -length);
            ctx.stroke();

            ctx.lineWidth = 2;
            ctx.strokeStyle = '#F23030';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -length);
            ctx.stroke();

            ctx.restore();
        }
        super.render(ctx, dt);
    }
}