import Platform from '../entities/platform.js';
import BorderBottomFull from '../entities/border-bottom-full.js';
import Vector2 from '../vector2.js';
import Level from './level.js';
import PlatformThin from '../entities/platform-thin.js';
import Battery from '../entities/battery.js';
import BatterySlot from '../entities/battery-slot.js';
import Texture from '../texture.js';

const backgroundTexture = await Texture.load('backgrounds/1');

export default class extends Level {
    background = backgroundTexture;
    startPoint = new Vector2(-448, -224);
    endPoint = new Vector2(448, -224);

    platforms = [
        new BorderBottomFull(new Vector2(0, -272)),
        new PlatformThin(new Vector2(-80, -64), 2),
        new Platform(new Vector2(-256, -128), 2),
        new PlatformThin(new Vector2(-80, -192), 2),
        new Platform(new Vector2(0, -128), 4, true),
        new PlatformThin(new Vector2(176, -8), 5),
        new PlatformThin(new Vector2(344, -96), 3, true),
        new PlatformThin(new Vector2(240, -184), 3),
    ];
    batterySlots = [
        new BatterySlot(new Vector2(316, -164))
    ];
    batteries = [
        new Battery(new Vector2(-256, -245))
    ];
}
