import AnimatedTexture from '../animated-texture.ts';
import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import Entity from './entity.ts';

const [textureStay, textureWalk, textureJump, textureClimb] = await Promise.all([
    Texture.load('player-stay'),
    AnimatedTexture.load('player-walk', 8, 70),
    AnimatedTexture.load('player-jump', 9, 120),
    AnimatedTexture.load('player-climb', 7, 100)
]);

export default class Player extends Entity {
    size = new Vector2(17, 43);
    static = false;
    onGround = false;
    onLadder = false;
    invert = false;
    hasBattery = false;

    jumpForce = 0.42;
    climbSpeed = 0.075;

    getTexture() {
        if (this.onGround || this.onLadder && this.velocity.y < -this.climbSpeed) {
            if (Math.abs(this.velocity.x) > 0.01) return textureWalk;
            else return textureStay;
        }
        else if (this.onLadder) return textureClimb;
        return textureJump;
    }

    render(ctx: CanvasRenderingContext2D, dt: number) {
        if (this.velocity.x < 0 !== this.invert) this.invert = !this.invert;
        const time = this.onLadder && this.velocity.y >= -this.climbSpeed ? dt * this.velocity.y / this.climbSpeed : dt;
        this.getTexture().render(ctx, time, this.position, 0, this.invert ? -1 : 1);
    }
}