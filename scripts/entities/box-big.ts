import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import Entity from './entity.ts';

const texture = await Texture.load('box-big');

export default class BoxBig extends Entity {
    texture = texture;
    size = new Vector2(128, 128);
    static = false;
}