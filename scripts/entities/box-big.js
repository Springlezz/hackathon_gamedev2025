import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('box-big');

export default class BoxBig extends Entity {
    texture = texture;
    size = new Vector2(128, 128);
    mass = 2;
}