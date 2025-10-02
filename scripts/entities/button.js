import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('button');

export default class Button extends Entity {
    texture = texture;
    solid = false;

    constructor(position, vertical = false) {
        super(position);
        this.vertical = vertical;
        this.size = vertical ? new Vector2(32, 16) : new Vector2(16, 32);
    }

    render(ctx, dt) {
        this.texture.render(ctx, dt, this.position, this.vertical ? Math.PI / 2 : 0);
    }
}