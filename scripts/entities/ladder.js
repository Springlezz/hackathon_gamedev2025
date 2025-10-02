import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('ladder');

export default class Ladder extends Entity {
    texture = texture;
    solid = false;

    constructor(position, length = 1) {
        super(position);
        this.length = length;
        this.size = new Vector2(24, this.length * 64);
    }

    render(ctx, dt) {
        let offset = new Vector2(0, (1 - 1 / this.length) * this.size.y / 2);
        for (let i = 0; i < this.length; ++i) {
            this.texture.render(ctx, dt, this.position.clone().add(offset));
            offset.y -= this.size.y / this.length;
        }
    }
}