import BorderBottomFull from '../entities/border-bottom.js';
import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Level from './level.js';

const backgroundTexture = await Texture.load('backgrounds/4');

export default class Level4 extends Level {
    background = backgroundTexture;
    startPoint = new Vector2(-448, -224);
    endPoint = new Vector2(448, 224);
    platforms = [
        new BorderBottomFull(new Vector2(0, -272))
    ];
}
