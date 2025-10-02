import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('platform');

export default class Platform extends Entity {
    texture = texture;
    size = new Vector2(64, 32);

    constructor(position, vertical = false) {
        super(position);
        this.vertical = vertical;
    }

    render(ctx, dt) {
        this.texture.render(ctx, dt, this.position, this.vertical ? Math.PI / 2 : 0);
    }
}