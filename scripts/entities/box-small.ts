import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import Entity from './entity.ts';

const texture = await Texture.load('box-small');

export default class BoxSmall extends Entity {
    texture = texture;
    size = new Vector2(64, 64);
    static = false;
}