import Platform from '../entities/platform.js';
import BorderBottomFull from '../entities/border-bottom-full.js';
import Vector2 from '../vector2.js';
import Level from './level.js';
import PlatformThin from '../entities/platform-thin.js';
import Button from '../entities/button.js';
import Ladder from '../entities/ladder.js';
import LaserStation from '../entities/laser-station.js';
import Texture from '../texture.js';
import Mirror from '../entities/mirror.js';
import MirrorDiagonal from '../entities/mirror-diagonal.js';

const backgroundTexture = await Texture.load('backgrounds/1');

export default class extends Level {
    background = backgroundTexture;
    startPoint = new Vector2(-448, -224);
    endPoint = new Vector2(448, -224);

    platforms = [
        new BorderBottomFull(new Vector2(0, -272)),

        new Platform(new Vector2(-150, -40), 2), //справа
        new Platform(new Vector2(150, -100), 2), //слева

        new PlatformThin(new Vector2(-400, 192), 2, true), //3 up, убирающееся панель
    ];
    ladders = [
        new Ladder(new Vector2(-260, -102), 4),
        new Ladder(new Vector2(280, -100), 4)
    ];
    lazers = [
        new LaserStation(new Vector2(-32, 244)),
        new LaserStation(new Vector2(32, 244)),
    ];
    buttons = [
        new Button(new Vector2(-473, 180), false), //слева на стене кнопка
        new Button(new Vector2(266, 248), true), //справа наверху кнопка
    ];
    mirrors = [
        // new Mirror(new Vector2(472, 110)),
        new MirrorDiagonal(new Vector2(-150, 0)),
    ];
}