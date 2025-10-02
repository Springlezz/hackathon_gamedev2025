import Level1 from './levels/level1.js';

const $menu = document.getElementById('menu');
const $playBtn = document.getElementById('play-btn');
const $canvasСontainer = document.getElementById('canvas-container');
const $canvas = document.getElementById('canvas');

const ctx = $canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const level = new Level1();
level.init();

const pressed = new Set();
document.addEventListener('keydown', event => pressed.add(event.code));
document.addEventListener('keyup', event => pressed.delete(event.code));

let renderTime;
function render() {
    const now = Date.now();
    const dt = now - renderTime;
    renderTime = now;

    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    ctx.save();
    ctx.translate(512, 288);
    level.render(ctx, dt);
    level.renderDebug(ctx);
    ctx.restore();

    requestAnimationFrame(render);
}

let physicsTime;
function updatePhysics() {
    const now = Date.now();
    const dt = now - physicsTime;
    physicsTime = now;

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

const audio = new Promise(resolve => {
    const audio = new Audio('/audios/theme.mp3');
    audio.volume = 0.25;
    audio.loop = true;
    audio.addEventListener('canplaythrough', () => resolve(audio));
});

function start() {
    $menu.style.display = 'none';
    $canvasСontainer.style.display = 'flex';

    audio.then(audio => audio.play());

    renderTime = Date.now();
    physicsTime = Date.now();
    requestAnimationFrame(render);
    setInterval(updatePhysics, 1000 / 60);
}

$playBtn.addEventListener('click', start);