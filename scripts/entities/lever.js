import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('lever');

export default class Lever extends Entity {
    texture = texture;
    size = new Vector2(32, 32);
}