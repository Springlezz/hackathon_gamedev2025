import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('wall-right');

export default class WallRight extends Entity {
    texture = texture;
    size = new Vector2(32, 576);
}