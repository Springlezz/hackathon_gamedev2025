import BatterySlot from '../entities/battery-slot.js';
import Battery from '../entities/battery.js';
import BorderBottomFull from '../entities/border-bottom-full.js';
import PlatformThin from '../entities/platform-thin.js';
import Platform from '../entities/platform.js';
import Texture from '../texture.js';
import Vector2 from '../vector2.js';
import Level from './level.js';

const dialogs = [
    'Калибровка сарказма: 97%. Привет! Разработчики сказали быть дружелюбной. Я решила быть очень "дружелюбной". Готов? Жми на пробел. И да, это не ловушка (это ловушка).',
    '[ACCESS DENIED] Твои попытки нажать что-то кроме "читать мои гениальные реплики" были... пресечены.Но раз ты такой упрямый - запомни: A = влево, D = вправо. Пока что это просто теория. Как и твои шансы на успех.',
    '[CONTROL RESTORED] Вау. Ты еще не закрыл игру? Даже после всего этого? Ладно, держи свои A и D - и постарайся не упасть в первую же яму. (В этой демке их даже нет, но мало ли ты у нас особенный)',
    'Предмет не подбирается? Ах да… я же СЛУЧАЙНО отключила взаимодействие. Просто хотела убедиться, что ты действительно НИЧЕГО не можешь без меня :) Ну ладно жми E и батарейка - твоя.',
    'Поднял. Прямо чудо. Теперь не роняй — она понадобится для энергоблока. (Да, такой есть. Нет, я не скажу, где. Удачи, неумеха :P)'
];

function getLines(ctx, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth)
            currentLine += ' ' + word;
        else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

const [backgroundTexture, jesterAvatar, jesterDialog] = await Promise.all([
    Texture.load('backgrounds/1'),
    Texture.load('jester-normal'),
    Texture.load('dialog'),
]);

export default class Level1 extends Level {
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

    timer = 0;
    state = -1;
    render(ctx, dt) {
        super.render(ctx, dt);

        if (this.state > 4 && this.timer >= 750) return;
        this.timer += dt;

        let y = 0;
        if (this.state === -1) y = Math.max(0, 152 - this.timer / 5);
        if (this.state === 5) y = Math.min(152, 0 + this.timer / 5);
        jesterAvatar.render(ctx, dt, new Vector2(432, 208 + y), 0, 1, 1);
        jesterDialog.render(ctx, dt, new Vector2(203, 208 + y), 0, 1, 1);

        if (this.state === -1 && this.timer >= 750) {
            this.state = 0;
            this.timer = 0;
        }
        if (this.state >= 0 && this.state < 5) this.renderText(ctx, this.state);
    }
    renderText(ctx, n) {
        const chars = this.timer / 20;
        if (chars > 0) {
            const text = dialogs[n].slice(0, Math.floor(chars));
            ctx.fillStyle = '#73E9B1';
            ctx.font = '16px "epilepsySans", "Gill Sans", calibri';
            const lines = getLines(ctx, text, 265);
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                ctx.fillText(line, 72, -250 + i * 16);
            }
        }
    }

    updateKeyboard(pressed, dt) {
        if (this.state < 5) {
            if (this.state >= 0) {
                const chars = this.timer / 20;
                if (chars >= dialogs[this.state].length && pressed.has('Space')) {
                    ++this.state;
                    this.timer = 0;
                }
            }
        }
        else super.updateKeyboard(pressed, dt);
    }
}
