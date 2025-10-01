import Platform from '../entities/platform.js';
import Player from '../entities/player.js';
import Vector2 from '../vector2.js';
import Level from './level.js';

export default class extends Level {
    player = new Player(new Vector2(100, 100));
    entities = [
        this.player,
        new Platform(new Vector2(100, 350)),
        new Platform(new Vector2(164, 350)),
        new Platform(new Vector2(228, 350)),
        new Platform(new Vector2(292, 350)),
        new Platform(new Vector2(328, 270)),
        new Platform(new Vector2(198, 200))
    ];
}