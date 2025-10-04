import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import Entity from './entity.ts';

const texture = await Texture.load('key');

export default class Key extends Entity {
    texture = texture;
    size = new Vector2(32, 32);
}