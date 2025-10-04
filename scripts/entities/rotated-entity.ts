import Vector2 from '../vector2.ts';
import Entity from './entity.ts';

export default class RotatedEntity extends Entity {
    rotation: number;

    constructor(position: Vector2, rotation = 0) {
        super(position);
        this.rotation = rotation;
    }

    getSize() {
        const size = super.getSize();
        return this.rotation % 2 === 0 ? size : new Vector2(size.y, size.x);
    }

    render(ctx: CanvasRenderingContext2D, dt: number) {
        ctx.save();
        ctx.translate(this.position.x, -this.position.y);
        ctx.rotate(this.rotation * Math.PI / 2);
        this.getTexture().render(ctx, dt, new Vector2(0, 0));
        ctx.restore();
    }
}