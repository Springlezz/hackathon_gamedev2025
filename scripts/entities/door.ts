import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import Entity from './entity.ts';

const [textureClosed, textureOpened] = await Promise.all([
    Texture.load('door-closed'),
    Texture.load('door-opened')
]);

export default class Door extends Entity {
    size = new Vector2(40, 40);
    solid = false;
    open = false;

    getTexture() {
        return this.open ? textureOpened : textureClosed;
    }
}