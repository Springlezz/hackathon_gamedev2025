import Vector2 from '../vector2.js';

const GRAVITY = 980;

export default class Entity {
    velocity = new Vector2(0, 0);
    mass = 0;

    constructor(position) {
        this.position = position;
    }

    physicsUpdate(dt) {
        if (this.mass === 0) return;
        this.velocity.y -= GRAVITY * dt / 2;
        this.position.add(this.velocity.clone().mult(dt));
        this.velocity.y -= GRAVITY * dt / 2;
    }

    render(ctx, dt) {
        this.texture.render(ctx, this.position, dt);
    }
}