import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import RotatedEntity from './rotated-entity.ts';

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