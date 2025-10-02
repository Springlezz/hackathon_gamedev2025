import Vector2 from '../vector2.js';
import Entity from './entity.js';

export default class RotatedEntity extends Entity {
    constructor(position, rotation = 0) {
        super(position);
        this.rotation = rotation;
    }

    getSize() {
        const size = super.getSize();
        return this.rotation % 2 === 0 ? size : new Vector2(size.y, size.x);
    }

    render(ctx, dt) {
        ctx.save();
        ctx.translate(this.position.x, -this.position.y);
        ctx.rotate(this.rotation * Math.PI / 2);
        this.getTexture().render(ctx, dt, new Vector2(0, 0));
        ctx.restore();
    }
}