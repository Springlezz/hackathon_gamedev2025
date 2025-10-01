import Vector2 from './vector2.js';

export default class Entity {
    constructor(texture, size, position = new Vector2(0, 0)) {
        this.texture = texture;
        this.size = size;
        this.position = position;
        this.velocity = new Vector2(0, 0);
    }

    render(ctx) {
        this.texture.render(ctx, this.position);
    }
}