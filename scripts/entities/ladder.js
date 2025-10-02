import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('ladder');

export default class Ladder extends Entity {
    texture = texture;
    size = new Vector2(24, 64);
    solid = false;
}