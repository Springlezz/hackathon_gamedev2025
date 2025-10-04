import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import Entity from './entity.ts';

const texture = await Texture.load('border-vertical');

export default class BorderRight extends Entity {
    texture = texture;
    size = new Vector2(32, 576);

    render(ctx: CanvasRenderingContext2D, dt: number) {
        this.texture.render(ctx, dt, this.position, 0, -1);
    }
}