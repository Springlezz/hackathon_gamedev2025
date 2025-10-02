import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('platform');

export default class Platform extends Entity {
    texture = texture;
    size = new Vector2(64, 32);

    constructor(position, length = 1, vertical = false) {
        super(position);
        this.length = length;
        this.vertical = vertical;
    }

    getSize() {
        return this.vertical ? new Vector2(this.size.y, this.size.x * this.length) : new Vector2(this.size.x * this.length, this.size.y);
    }

    render(ctx, dt) {
        if (this.vertical) {
            let offset = new Vector2(0, (this.getSize().y - this.size.x) / 2);
            for (let i = 0; i < this.length; ++i) {
                this.texture.render(ctx, dt, this.position.clone().add(offset), Math.PI / 2);
                offset.y -= this.size.x;
            }
        }
        else {
            let offset = new Vector2((this.getSize().x - this.size.x) / 2, 0);
            for (let i = 0; i < this.length; ++i) {
                this.texture.render(ctx, dt, this.position.clone().add(offset));
                offset.x -= this.size.x;
            }
        }
    }
}