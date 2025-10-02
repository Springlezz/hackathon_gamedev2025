import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('battery');

export default class Battery extends Entity {
    texture = texture;
    size = new Vector2(24, 44);
}