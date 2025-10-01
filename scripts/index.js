import Entity from './entity.js';
import { resolveCollisions } from './physics.js';
import Vector2 from './vector2.js';
import { imageResource } from './resourcesLoader.js';
import Texture from './texture.js';

const block = new Entity(new Texture(await imageResource('tile-bricks')), new Vector2(32, 32), new Vector2(100, 50));
const player = new Entity(new Texture(await imageResource('player')), new Vector2(32, 32), new Vector2(100, 100));

const entities = [block, player];
for (let i = 0; i < 16; ++i) {
    const tile = new Entity(new Texture(await imageResource('tile-bricks')), new Vector2(32, 32), new Vector2(i * 32, 200));
    tile.mass = 0;
    entities.push(tile);
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const entity of entities) entity.render(ctx);
    requestAnimationFrame(render);
}
render();

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
addEventListener('resize', resize);
resize();

setInterval(() => {
    player.position.y += 1;
    block.position.y += 1;
    resolveCollisions(entities);
}, 1000 / 60);