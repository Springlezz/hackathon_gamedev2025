import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const texture = await Texture.load('battery_slot');

export default class BatterySlot extends Entity {
    texture = texture;
    size = new Vector2(32, 32);
}