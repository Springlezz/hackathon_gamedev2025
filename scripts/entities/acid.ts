import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import Entity from './entity.ts';

const texture = await Texture.load('acid');

export default class Acid extends Entity {
    texture = texture;
    size = new Vector2(64, 30);
    solid = false;
}