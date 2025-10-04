import type Texture from '../texture.ts';
import Vector2 from '../vector2.ts';

const GRAVITY = 0.98;

export default class Entity {
    texture!: Texture;
    position: Vector2;
    size!: Vector2;
    velocity = new Vector2(0, 0);
    static = true;
    solid = true;

    constructor(position: Vector2) {
        this.position = position;
    }

    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    getSize() {
        return this.size.clone();
    }

    getTexture() {
        return this.texture;
    }

    physicsUpdate(dt: number) {
        if (this.static) return;
        this.velocity.y -= GRAVITY * dt / 2000;
        this.position.add(this.velocity.clone().mult(dt));
        this.velocity.y -= GRAVITY * dt / 2000;
        this.velocity.x *= 1 - dt / 200;
    }

    render(ctx: CanvasRenderingContext2D, dt: number) {
        this.getTexture().render(ctx, dt, this.position);
    }
}