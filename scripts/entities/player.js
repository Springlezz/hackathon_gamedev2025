import AnimatedTexture from '../animated-texture.js';
import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const textureStay = await Texture.load('player-stay');
const textureWalk = await AnimatedTexture.load('player-walk', 8, 80);

export default class Player extends Entity {
    size = new Vector2(17, 43);
    static = false;
    invert = false;

    render(ctx, dt) {
        if (this.velocity.x < 0 !== this.invert) this.invert = !this.invert;
        (Math.abs(this.velocity.x) > 0.01 ? textureWalk : textureStay)
            .render(ctx, dt, this.position, 0, this.invert ? -1 : 1);
    }
}