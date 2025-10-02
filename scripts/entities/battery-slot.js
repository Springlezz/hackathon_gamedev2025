import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Entity from './entity.js';

const [textureEmpty, textureFilled] = await Promise.all([
    Texture.load('battery-slot-empty'),
    Texture.load('battery-slot-filled')
]);

export default class BatterySlot extends Entity {
    size = new Vector2(24, 24);
    solid = false;
    hasBattery = false;

    getTexture() {
        return this.hasBattery ? textureFilled : textureEmpty;
    }
}