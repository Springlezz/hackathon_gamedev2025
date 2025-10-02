import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('acid-flow');

export default class AcidFlow extends Entity {
    texture = texture;
    size = new Vector2(20, 64);
    solid = false;
}