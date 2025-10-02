import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('box-small');

export default class BoxSmall extends Entity {
    texture = texture;
    size = new Vector2(64, 64);
    mass = 1;
}