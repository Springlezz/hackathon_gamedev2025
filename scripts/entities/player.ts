import AnimatedTexture from '../animated-texture.ts';
import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import Entity from './entity.ts';

const [textureStay, textureWalk, textureJump] = await Promise.all([
    Texture.load('player-stay'),
    AnimatedTexture.load('player-walk', 8, 70),
    AnimatedTexture.load('player-jump', 9, 120)
]);

export default class Player extends Entity {
    size = new Vector2(17, 43);
    static = false;
    onGround = false;
    onLadder = false;
    invert = false;
    hasBattery = false;

    getTexture() {
        return this.onGround || this.onLadder ? Math.abs(this.velocity.x) > 0.01 ? textureWalk : textureStay : textureJump;
    }

    render(ctx: CanvasRenderingContext2D, dt: number) {
        if (this.velocity.x < 0 !== this.invert) this.invert = !this.invert;
        this.getTexture().render(ctx, dt, this.position, 0, this.invert ? -1 : 1);
    }
}