import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('player');

export default class Player extends Entity {
    texture = texture;
    size = new Vector2(17, 41);
    static = false;

    invert = false;

    render(ctx, dt) {
        if (this.velocity.x < 0 !== this.invert) this.invert = !this.invert;
        this.texture.render(ctx, dt, this.position, 0, this.invert ? -1 : 1);
    }
}