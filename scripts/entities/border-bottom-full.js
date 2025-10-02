import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('border-horizontal');

export default class BorderBottomFull extends Entity {
    texture = texture;
    size = new Vector2(960, 32);

    render(ctx, dt) {
        this.texture.render(ctx, dt, this.position, 0, 1, -1);
    }
}