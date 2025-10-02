import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('player');

export default class Player extends Entity {
    texture = texture;
    size = new Vector2(17, 41);
    mass = 1;

    invert = false;

    render(ctx, dt) {
        if (this.velocity.x < 0 !== this.invert) this.invert = !this.invert;

        ctx.save();
        if (this.invert) {
            ctx.translate(this.position.x, -this.position.y);
            ctx.scale(-1, 1);
            this.texture.render(ctx, new Vector2(0, 0), dt);
        }
        else this.texture.render(ctx, this.position, dt);
        ctx.restore();
    }
}