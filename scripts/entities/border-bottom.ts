import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import Entity from './entity.ts';

const texture = await Texture.load('border-bottom');

export default class BorderBottom extends Entity {
    texture = texture;
    size = new Vector2(64, 32);
    length: number;

    constructor(position: Vector2, length = 15) {
        super(position);
        this.length = length;
    }

    getSize() {
        return new Vector2(this.size.x * this.length, this.size.y);
    }

    render(ctx: CanvasRenderingContext2D, dt: number) {
        let offset = new Vector2((this.getSize().x - this.size.x) / 2, 0);
        for (let i = 0; i < this.length; ++i) {
            this.texture.render(ctx, dt, this.position.clone().add(offset));
            offset.x -= this.size.x;
        }
    }
}