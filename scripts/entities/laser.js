import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('lazer');

export default class Lazer extends Entity {
    texture = texture;
    size = new Vector2(64, 64);
}