import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('acid-flow-corner');

export default class AcidFlowCorner extends Entity {
    texture = texture;
    size = new Vector2(40, 40);
    solid = false;

    constructor(position, left = false) {
        super(position);
        this.left = left;
    }

    render(ctx, dt) {
        this.texture.render(ctx, dt, this.position, 0, this.left ? -1 : 1);
    }
}