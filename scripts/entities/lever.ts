import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import Entity from './entity.ts';

const texture = await Texture.load('lever');

export default class Lever extends Entity {
    texture = texture;
    size = new Vector2(14, 10);
    solid = false;
    left: boolean;
    pressed = false;

    constructor(position: Vector2, left = false) {
        super(position);
        this.left = left;
    }

    render(ctx: CanvasRenderingContext2D, dt: number) {
        this.texture.render(ctx, dt, this.position, 0, this.left ? -1 : 1);
    }
}