import Level1 from './levels/level1.js';

const $menu = document.getElementById('menu');
const $playBtn = document.getElementById('play-btn');
const $canvas = document.getElementById('canvas');

const ctx = $canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const level = new Level1();

const pressed = new Set();
document.addEventListener('keydown', event => pressed.add(event.code));
document.addEventListener('keyup', event => pressed.delete(event.code));

function render() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    ctx.save();
    ctx.scale($canvas.width / 1024 * 2, $canvas.height / 768 * 2);
    level.render(ctx, 0);
    ctx.restore();
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
        level.updateKeyboard(pressed);
        level.updatePhysics(1 / 60);
    }, 1000 / 60);
}

$playBtn.addEventListener('click', start);