import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('laser-station');

export default class LaserStation extends Entity {
    texture = texture;
    size = new Vector2(64, 24);
    rayLength = 0;

    render(ctx, dt) {
        super.render(ctx, dt);

        if (this.rayLength > 0) {
            ctx.save();
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#F88';
            ctx.beginPath();
            ctx.moveTo(this.position.x, -this.position.y + this.size.y / 2);
            ctx.lineTo(this.position.x, -this.position.y + this.size.y / 2 + this.rayLength);
            ctx.stroke();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#F00';
            ctx.beginPath();
            ctx.moveTo(this.position.x, -this.position.y + this.size.y / 2);
            ctx.lineTo(this.position.x, -this.position.y + this.size.y / 2 + this.rayLength);
            ctx.stroke();
            ctx.restore();
        }
    }
}