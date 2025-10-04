import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import Entity from './entity.ts';

const texture = await Texture.load('battery');

export default class Battery extends Entity {
    texture = texture;
    size = new Vector2(12, 22);
    solid = false;
}