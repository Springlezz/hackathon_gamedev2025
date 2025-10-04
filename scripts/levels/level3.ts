import AcidFlowCorner from '../entities/acid-flow-corner.ts';
import AcidFlow from '../entities/acid-flow.ts';
import Acid from '../entities/acid.ts';
import BorderBottom from '../entities/border-bottom.ts';
import BoxSmall from '../entities/box-small.ts';
import Lever from '../entities/lever.ts';
import PlatformThin from '../entities/platform-thin.ts';
import Platform from '../entities/platform.ts';
import Texture from '../texture.ts';
import Vector2 from '../vector2.ts';
import Level from './level.ts';

const [backgroundTexture, pipeTexture] = await Promise.all([
    Texture.load('backgrounds/3'),
    Texture.load('backgrounds/pipe')
]);

export default class Level3 extends Level {
    background = backgroundTexture;
    startPoint = new Vector2(-448, -224);
    endPoint = new Vector2(448, 224);

    acidCorner1 = new AcidFlowCorner(new Vector2(52, -44));
    acidCorner2 = new AcidFlowCorner(new Vector2(308, 36));
    acidFlow1 = new AcidFlow(new Vector2(64, -192), 4);
    acidFlow2 = new AcidFlow(new Vector2(320, -144), 5);
    lever1 = new Lever(new Vector2(128, -251));
    lever2 = new Lever(new Vector2(-128, -251));
    platform = new PlatformThin(new Vector2(0, 160));
    platform2 = new PlatformThin(new Vector2(320, -128));

    platforms = [
        new BorderBottom(new Vector2(-288, -272), 6),
        new BorderBottom(new Vector2(0, -272), 1),
        new BorderBottom(new Vector2(192, -272), 3),
        new BorderBottom(new Vector2(416, -272), 2),
        new PlatformThin(new Vector2(-64, -72), 3),
        new Platform(new Vector2(-176, -160), 3, true),
        new PlatformThin(new Vector2(64, 8), 5),
        new Platform(new Vector2(-224, -192)),
        new Platform(new Vector2(-336, -112)),
        new Platform(new Vector2(-224, -32)),
        new Platform(new Vector2(384, 128), 2),
        this.platform,
        this.platform2
    ];
    acids = [
        this.acidCorner1,
        this.acidFlow1,
        this.acidCorner2,
        this.acidFlow2,
        new Acid(new Vector2(-64, -273)),
        new Acid(new Vector2(64, -273)),
        new Acid(new Vector2(320, -273)),
    ];
    levers = [
        this.lever1,
        this.lever2
    ];
    boxes = [
        new BoxSmall(new Vector2(0, 200))
    ];

    time = 0;
    updatePhysics(dt: number) {
        super.updatePhysics(dt);

        if (this.lever1.left) {
            const index1 = this.entities.indexOf(this.acidFlow1);
            if (index1 !== -1) this.entities.splice(index1, 1);
            const index2 = this.entities.indexOf(this.acidCorner1);
            if (index2 !== -1) this.entities.splice(index2, 1);


            if (!this.entities.includes(this.acidFlow2)) this.entities.push(this.acidFlow2);
            if (!this.entities.includes(this.acidCorner2)) this.entities.push(this.acidCorner2);
        }
        else {
            if (!this.entities.includes(this.acidFlow1)) this.entities.push(this.acidFlow1);
            if (!this.entities.includes(this.acidCorner1)) this.entities.push(this.acidCorner1);

            const index1 = this.entities.indexOf(this.acidFlow2);
            if (index1 !== -1) this.entities.splice(index1, 1);
            const index2 = this.entities.indexOf(this.acidCorner2);
            if (index2 !== -1) this.entities.splice(index2, 1);
        }

        if (this.lever2.left) {
            const index = this.entities.indexOf(this.platform);
            if (index !== -1) this.entities.splice(index, 1);
        }
        else {
            if (!this.entities.includes(this.platform)) this.entities.push(this.platform);
        }

        this.time += dt;
        this.platform2.position.x = 320 + Math.sin(this.time / 1000) * 64;
        this.platform2.position.y = Math.cos(this.time / 1000) * 96 - 96;
    }

    render(ctx: CanvasRenderingContext2D, dt: number) {
        this.background.render(ctx, dt, new Vector2(0, 0));
        if (this.lever1.left) {
            pipeTexture.render(ctx, dt, new Vector2(64, -32), Math.PI / 2);
        }
        for (const entity of this.entities) {
            entity.render(ctx, dt);
        }
    }
}
