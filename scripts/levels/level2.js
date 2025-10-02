import BorderBottomFull from '../entities/border-bottom-full.js';
import Ladder from '../entities/ladder.js';
import Laser from '../entities/laser.js';
import Mirror from '../entities/mirror.js';
import PlatformThin from '../entities/platform-thin.js';
import Platform from '../entities/platform.js';
import Sensor from '../entities/sensor.js';
import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Level from './level.js';

const backgroundTexture = await Texture.load('backgrounds/2');

export default class Level2 extends Level {
    background = backgroundTexture;
    startPoint = new Vector2(-448, -224);
    endPoint = new Vector2(448, -224);

    sensor = new Sensor(new Vector2(360, 248), 2); //справа наверху
    lazerCap = new PlatformThin(new Vector2(-416, 128), 2); // убирающееся панель

    platforms = [
        new BorderBottomFull(new Vector2(0, -272)),
        new Platform(new Vector2(-192, 48), 2), // справа
        new Platform(new Vector2(192, -16), 2), // слева
        this.lazerCap
    ];
    ladders = [
        new Ladder(new Vector2(-116, -96), 5),
        new Ladder(new Vector2(268, -128), 4)
    ];
    lazers = [
        new Laser(new Vector2(-160, 20), 2, -1),
        new Laser(new Vector2(160, -44), 2, 1)
    ];
    mirrors = [
        new Mirror(new Vector2(474, 132), 3),
        new Mirror(new Vector2(-192, 70)),
        new Mirror(new Vector2(192, 6))
    ];
    sensors = [
        new Sensor(new Vector2(-472, 192), 1), // слева на стене
        this.sensor
    ];

    updatePhysics(dt) {
        super.updatePhysics(dt);
        if (this.sensor.active) {
            const index = this.entities.indexOf(this.lazerCap);
            if (index !== -1) this.entities.splice(index, 1);
        }
        else if (!this.entities.includes(this.lazerCap)) this.entities.push(this.lazerCap);
    }
}