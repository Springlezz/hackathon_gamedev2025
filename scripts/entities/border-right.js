import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('border-vertical');

export default class BorderRight extends Entity {
    texture = texture;
    size = new Vector2(32, 576);

    render(ctx, dt) {
        this.texture.render(ctx, dt, this.position, 0, -1);
    }
}