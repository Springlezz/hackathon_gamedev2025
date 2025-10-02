import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import RotatedEntity from './rotated-entity.js';

const [texture, textureActive] = await Promise.all([
    Texture.load('sensor'),
    Texture.load('sensor-active')
]);

export default class Sensor extends RotatedEntity {
    size = new Vector2(32, 16);
    active = false;

    getTexture() {
        return this.active ? textureActive : texture;
    }
}