import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('door');

export default class Door extends Entity {
    texture = texture;
    size = new Vector2(64, 64);
}