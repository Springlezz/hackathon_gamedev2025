import Entity from './entity.js';
import { resolveCollisions } from './physics.js';
import Vector2 from './vector2.js';
import { imageResource } from './resourcesLoader.js';
import Texture from './texture.js';

const $menu = document.getElementById('menu');
const $playBtn = document.getElementById('play-btn');
const $canvas = document.getElementById('canvas');

const block = new Entity(new Texture(await imageResource('tile-bricks')), new Vector2(32, 32), new Vector2(100, 50));
const player = new Entity(new Texture(await imageResource('player')), new Vector2(32, 32), new Vector2(100, 100));

const entities = [block, player];
for (let i = 0; i < 16; ++i) {
    const tile = new Entity(new Texture(await imageResource('tile-bricks')), new Vector2(32, 32), new Vector2(i * 32, 200));
    tile.mass = 0;
    entities.push(tile);
}

const ctx = $canvas.getContext('2d');

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const entity of entities) entity.render(ctx);
    requestAnimationFrame(render);
}

function resize() {
    const width = innerHeight * 16 / 9;
    if (width <= innerWidth) {
        $canvas.width = width;
        $canvas.height = innerHeight;
    }
    else {
        $canvas.width = innerWidth;
        $canvas.height = innerWidth * 9 / 16;
    }
}
addEventListener('resize', resize);
resize();

function start() {
    $menu.style.display = 'none';
    $canvas.style.display = 'block';

    render();

    setInterval(() => {
        player.position.y += 1;
        block.position.y += 1;
        resolveCollisions(entities);
    }, 1000 / 60);
}

$playBtn.addEventListener('click', start);