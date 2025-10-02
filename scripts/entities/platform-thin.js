import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('platform-thin');

export default class PlatformThin extends Entity {
    texture = texture;

    constructor(position, length = 1, vertical = false) {
        super(position);
        this.length = length;
        this.vertical = vertical;

        if (vertical) this.size = new Vector2(16, this.length * 64);
        else this.size = new Vector2(this.length * 64, 16);
    }

    render(ctx, dt) {
        if (this.vertical) {
            let offset = new Vector2(0, (1 - 1 / this.length) * this.size.y / 2);
            for (let i = 0; i < this.length; ++i) {
                this.texture.render(ctx, dt, this.position.clone().add(offset), Math.PI / 2);
                offset.y -= this.size.y / this.length;
            }
        }
        else {
            let offset = new Vector2((1 - 1 / this.length) * this.size.x / 2, 0);
            for (let i = 0; i < this.length; ++i) {
                this.texture.render(ctx, dt, this.position.clone().add(offset));
                offset.x -= this.size.x / this.length;
            }
        }
    }
}