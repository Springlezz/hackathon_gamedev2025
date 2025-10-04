import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import RotatedEntity from './rotated-entity.ts';

const texture = await Texture.load('laser');

export default class Laser extends RotatedEntity {
    texture = texture;
    size = new Vector2(64, 24);
    rayDirection: number;
    rayLength = 0;

    constructor(position: Vector2, rotation = 0, rayDirection = 0) {
        super(position, rotation);
        this.rayDirection = rayDirection;
    }

    getRayOrigin() {
        return new Vector2(
            this.position.x + Math.sin(this.rotation * Math.PI / 2) * this.size.y / 2,
            this.position.y + Math.cos(this.rotation * Math.PI / 2) * this.size.y / 2
        );
    }

    getRayDirection() {
        return new Vector2(
            Math.sin(this.rotation * Math.PI / 2 + this.rayDirection * Math.PI / 4),
            Math.cos(this.rotation * Math.PI / 2 + this.rayDirection * Math.PI / 4)
        );
    }

    render(ctx: CanvasRenderingContext2D, dt: number) {
        if (this.rayLength > 0) {
            const origin = this.getRayOrigin();
            ctx.save();
            ctx.translate(origin.x, -origin.y);
            ctx.rotate(this.rotation * Math.PI / 2 + this.rayDirection * Math.PI / 4);

            ctx.lineWidth = 4;
            ctx.strokeStyle = '#EA7575';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -this.rayLength);
            ctx.stroke();

            ctx.lineWidth = 2;
            ctx.strokeStyle = '#F23030';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -this.rayLength);
            ctx.stroke();

            ctx.restore();
        }
        super.render(ctx, dt);
    }
}