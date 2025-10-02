import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('mirror');

export default class Mirror extends Entity {
    texture = texture;
    size = new Vector2(16, 64);
}