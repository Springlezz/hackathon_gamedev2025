import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import Entity from './entity.ts';

const texture = await Texture.load('acid-flow-corner');

export default class AcidFlowCorner extends Entity {
    texture = texture;
    size = new Vector2(40, 40);
    solid = false;
    left: boolean;

    constructor(position: Vector2, left = false) {
        super(position);
        this.left = left;
    }

    render(ctx: CanvasRenderingContext2D, dt: number) {
        this.texture.render(ctx, dt, this.position, 0, this.left ? -1 : 1);
    }
}