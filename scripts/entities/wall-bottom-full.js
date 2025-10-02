import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('wall-bottom-full');

export default class WallBottomFull extends Entity {
    texture = texture;
    size = new Vector2(960, 32);
}