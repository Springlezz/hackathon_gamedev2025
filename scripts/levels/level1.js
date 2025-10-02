import BoxSmall from '../entities/box-small.js';
import Platform from '../entities/platform.js';
import Player from '../entities/player.js';
import BorderBottomFull from '../entities/border-bottom-full.js';
import BorderLeft from '../entities/border-left.js';
import BorderRight from '../entities/border-right.js';
import BorderTop from '../entities/border-top.js';
import Vector2 from '../vector2.js';
import Door from '../entities/door.js';
import Level from './level.js';
import PlatformThin from '../entities/platform-thin.js';

export default class extends Level {
    player = new Player(new Vector2(-400, -100));
    entities = [
        this.player,
        new BorderLeft(new Vector2(-496, 0)),
        new BorderRight(new Vector2(496, 0)),
        new BorderTop(new Vector2(0, 272)),
        new BorderBottomFull(new Vector2(0, -272)),

        new Platform(new Vector2(0, -112)),
        new Platform(new Vector2(-64, -112)),
        new Platform(new Vector2(-360, -112)),
        new Platform(new Vector2(-300, -112)),
        new PlatformThin(new Vector2(-260, -200)),
        new BoxSmall(new Vector2(-314, 0)),
        new Door(new Vector2(450, -225)),
        new BorderRight(new Vector2(40, -272)),
    ];
}