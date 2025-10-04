import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import Entity from './entity.ts';

const texture = await Texture.load('border-horizontal');

export default class BorderTop extends Entity {
    texture = texture;
    size = new Vector2(960, 32);
}