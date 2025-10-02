import Platform from '../entities/platform.js';
import BorderBottomFull from '../entities/border-bottom-full.js';
import Vector2 from '../vector2.js';
import Level from './level.js';
import PlatformThin from '../entities/platform-thin.js';
import Battery from '../entities/battery.js';
import BatterySlot from '../entities/battery-slot.js';


export default class extends Level {
    startPoint = new Vector2(-448, -224);
    endPoint = new Vector2(448, -224);

    platforms = [
        new BorderBottomFull(new Vector2(0, -272)),
        new Platform(new Vector2(0, -160), 3, true),
        new PlatformThin(new Vector2(208, 64), 3),
        new Platform(new Vector2(352, -96), 1, true),
        new PlatformThin(new Vector2(224, -144), 2),
        new Platform(new Vector2(-112, -176), 2),
        new Platform(new Vector2(-304, -48), 2),
        new Platform(new Vector2(-112, 64), 2),
    ];
    battaries = [
        {
            battary: new Battery(new Vector2(-320, -160)),
            slot: new BatterySlot(new Vector2(304, -112))
        }
    ];
}
