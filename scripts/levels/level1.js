import Platform from '../entities/platform.js';
import Player from '../entities/player.js';
import WallBottomFull from '../entities/wall-bottom-full.js';
import WallLeft from '../entities/wall-left.js';
import WallRight from '../entities/wall-right.js';
import WallTop from '../entities/wall-top.js';
import Vector2 from '../vector2.js';
import Level from './level.js';

export default class extends Level {
    player = new Player(new Vector2(-400, -100));
    entities = [
        this.player,
        new WallLeft(new Vector2(-496, 0)),
        new WallRight(new Vector2(496, 0)),
        new WallTop(new Vector2(0, 272)),
        new WallBottomFull(new Vector2(0, -272)),
        new Platform(new Vector2(-184, -182)),
        new Platform(new Vector2(-314, -112))
    ];
}