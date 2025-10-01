import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('platforms/platform');

export default class Platform extends Entity {
    texture = texture;
    size = new Vector2(64, 32);
}