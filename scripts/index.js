import Sound from './sound.js';

const $menu = document.getElementById('menu');
const $playBtn = document.getElementById('play-btn');
const $canvasСontainer = document.getElementById('canvas-container');
const $canvas = document.getElementById('canvas');

const ctx = $canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

let level;
async function loadLevel(n) {
    level = null;
    const Level = (await import(`./levels/level${n}.js`)).default;
    level = new Level(() => loadLevel(n + 1));
    level.init();
}

const pressed = new Set();
document.addEventListener('keydown', event => pressed.add(event.code));
document.addEventListener('keyup', event => pressed.delete(event.code));

const debug = location.search.slice(1).split('&').includes('debug');
let renderTime;
function render() {
    const now = Date.now();
    let dt = now - renderTime;
    if (dt > 1000) dt = 1000;
    renderTime = now;

    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    if (level) {
        ctx.save();
        ctx.translate(512, 288);
        level.render(ctx, dt);
        if (debug) level.renderDebug(ctx);
        ctx.restore();
    }

    requestAnimationFrame(render);
}

let physicsTime;
function updatePhysics() {
    const now = Date.now();
    let dt = now - physicsTime;
    if (dt > 1000) dt = 1000;
    physicsTime = now;

    if (!level) return;
    level.updateKeyboard(pressed);
    level.updatePhysics(dt);
}

function resize() {
    const width = innerHeight * 16 / 9;
    if (width <= innerWidth) {
        $canvas.style.width = width + 'px';
        $canvas.style.height = innerHeight + 'px';
    }
    else {
        $canvas.style.width = innerWidth + 'px';
        $canvas.style.height = innerWidth * 9 / 16 + 'px';
    }
}
addEventListener('resize', resize);
resize();

const soundTheme = Sound.load('theme', 1, true);

async function start() {
    await loadLevel(1);

    $menu.style.display = 'none';
    $canvasСontainer.style.display = 'flex';

    soundTheme.then(sound => sound.play());

    renderTime = Date.now();
    physicsTime = Date.now();
    requestAnimationFrame(render);
    setInterval(updatePhysics, 1000 / 60);
}

$playBtn.addEventListener('click', start);