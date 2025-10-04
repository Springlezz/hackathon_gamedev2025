import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import Entity from './entity.ts';
// import AnimatedTexture from '../animated-texture.ts';

const texture = await Texture.load('acid-flow');
// const texture = await AnimatedTexture.load('acid-flow2', 64, 250);

export default class AcidFlow extends Entity {
    texture = texture;
    size = new Vector2(20, 64);
    solid = false;
    length: number;

    constructor(position: Vector2, length = 1) {
        super(position);
        this.length = length;
    }

    getSize() {
        return new Vector2(this.size.x, this.size.y * this.length);
    }

    render(ctx: CanvasRenderingContext2D, dt: number) {
        let offset = new Vector2(0, (this.getSize().y - this.size.y) / 2);
        for (let i = 0; i < this.length; ++i) {
            this.texture.render(ctx, dt, this.position.clone().add(offset));
            offset.y -= this.size.y;
        }
    }
}