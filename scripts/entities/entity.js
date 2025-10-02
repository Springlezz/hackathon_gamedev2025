import Vector2 from '../vector2.js';

const GRAVITY = 0.98;

export default class Entity {
    velocity = new Vector2(0, 0);
    static = true;
    solid = true;

    constructor(position) {
        this.position = position;
    }

    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    physicsUpdate(dt) {
        if (this.static) return;
        this.velocity.y -= GRAVITY * dt / 2000;
        this.position.add(this.velocity.clone().mult(dt));
        this.velocity.y -= GRAVITY * dt / 2000;
        this.velocity.x *= 1 - dt / 200;
    }

    render(ctx, dt) {
        this.texture.render(ctx, dt, this.position);
    }
}