import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('lever');

export default class Lever extends Entity {
    texture = texture;
    size = new Vector2(14, 10);
    solid = false;
    pressed = false;

    constructor(position, left) {
        super(position);
        this.left = left;
    }

    render(ctx, dt) {
        this.texture.render(ctx, dt, this.position, 0, this.left ? -1 : 1);
    }
}