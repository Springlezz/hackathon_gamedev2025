import Platform from '../entities/platform.js';
import BorderBottomFull from '../entities/border-bottom-full.js';
import Vector2 from '../vector2.js';
import Level from './level.js';
import PlatformThin from '../entities/platform-thin.js';
import Battery from '../entities/battery.js';
import BatterySlot from '../entities/battery-slot.js';
import Button from '../entities/button.js';
import Ladder from '../entities/ladder.js';
import LaserStation from '../entities/laser-station.js';


export default class extends Level {
    startPoint = new Vector2(-448, -224);
    endPoint = new Vector2(448, -224);

    platforms = [
        new BorderBottomFull(new Vector2(0, -272)),
 
        new Platform(new Vector2(-150, -40), 2), //справа
        new Platform(new Vector2(150, -100), 2), //слева

        new PlatformThin(new Vector2(-400, 192), 2, true), //3 up, убирающееся панель
        new Button(new Vector2(-473, 180), false), //слева на стене кнопка
        new Button(new Vector2(266, 248), true), //справа наверху кнопка
        
        new Ladder(new Vector2(-280, -32)),
        new Ladder(new Vector2(310, -90)),

        new LaserStation(new Vector2(-30, 248)),
        new LaserStation(new Vector2(30, 248)),

        
    ];
}