import type AcidFlowCorner from '../entities/acid-flow-corner.ts';
import type AcidFlow from '../entities/acid-flow.ts';
import type Acid from '../entities/acid.ts';
import type BatterySlot from '../entities/battery-slot.ts';
import type Battery from '../entities/battery.ts';
import BorderLeft from '../entities/border-left.ts';
import BorderRight from '../entities/border-right.ts';
import BorderTop from '../entities/border-top.ts';
import type BoxBig from '../entities/box-big.ts';
import type BoxSmall from '../entities/box-small.ts';
import Door from '../entities/door.ts';
import type Entity from '../entities/entity.ts';
import type Ladder from '../entities/ladder.ts';
import type Laser from '../entities/laser.ts';
import type Lever from '../entities/lever.ts';
import Mirror from '../entities/mirror.ts';
import Player from '../entities/player.ts';
import Sensor from '../entities/sensor.ts';
import Sound from '../sound.ts';
import type Texture from '../texture.ts';
import Vector2 from '../vector2.ts';

const [soundJump, soundPutBattery, soundDoor] = await Promise.all([
    Sound.load('jump', 0.75),
    Sound.load('put-battery'),
    Sound.load('door')
]);

export default class Level {
    nextLevel: () => void;
    background!: Texture;

    startPoint!: Vector2;
    endPoint!: Vector2;
    startDoor!: Door;
    endDoor!: Door;
    player!: Player;

    #borders = [
        new BorderLeft(new Vector2(-496, 0)),
        new BorderRight(new Vector2(496, 0)),
        new BorderTop(new Vector2(0, 272))
    ];
    platforms: Entity[] = [];
    ladders: Ladder[] = [];
    acids: (Acid | AcidFlow | AcidFlowCorner)[] = [];
    levers: Lever[] = [];
    batterySlots: BatterySlot[] = [];
    batteries: Battery[] = [];
    lazers: Laser[] = [];
    mirrors: Mirror[] = [];
    sensors: Sensor[] = [];
    boxes: (BoxSmall | BoxBig)[] = [];
    entities: Entity[] = [];
    #leverStates: boolean[] = [];
    #mirrorPositions: Vector2[] = [];
    #boxedPositions: Vector2[] = [];

    constructor(nextLevel: () => void) {
        this.nextLevel = nextLevel;
    }

    init() {
        this.startDoor = new Door(this.startPoint.clone());
        this.endDoor = new Door(this.endPoint.clone());
        this.player = new Player(this.startPoint.clone());

        for (const slot of this.batterySlots) slot.hasBattery = false;

        if (this.mirrors.length !== this.#mirrorPositions.length) {
            this.#mirrorPositions = this.mirrors.map(mirror => mirror.position.clone());
        }
        else {
            for (let i = 0; i < this.mirrors.length; ++i) this.mirrors[i].position = this.#mirrorPositions[i].clone();
        }

        if (this.#leverStates.length !== this.levers.length) {
            this.#leverStates = this.levers.map(lever => lever.left);
        }
        else {
            for (let i = 0; i < this.levers.length; ++i) this.levers[i].left = this.#leverStates[i];
        }

        if (this.#boxedPositions.length !== this.boxes.length) {
            this.#boxedPositions = this.boxes.map(box => box.position.clone());
        }
        else {
            for (let i = 0; i < this.boxes.length; ++i) {
                this.boxes[i].position = this.#boxedPositions[i].clone();
                this.boxes[i].velocity = new Vector2(0, 0);
            }
        }

        this.entities = [
            ...this.#borders,
            this.startDoor,
            this.endDoor,
            ...this.platforms,
            ...this.ladders,
            ...this.acids,
            ...this.levers,
            ...this.batterySlots,
            ...this.batteries,
            ...this.lazers,
            ...this.mirrors,
            ...this.sensors,
            ...this.boxes,
            this.player
        ];

        this.updateEndDoor();
    }

    updateEndDoor() {
        this.endDoor.open = this.batterySlots.every(slot => slot.hasBattery) && this.sensors.every(sensor => sensor.active);
    }

    getPenetrationVector(entity1: Entity, entity2: Entity) {
        const sumHalfSizes = entity1.getSize().add(entity2.getSize()).div(2);
        const dist = entity1.position.clone().sub(entity2.position);
        const overlapX = sumHalfSizes.x - Math.abs(dist.x);
        const overlapY = sumHalfSizes.y - Math.abs(dist.y);
        if (overlapX <= 0 || overlapY <= 0) return null;
        if (overlapX < overlapY)
            return new Vector2(Math.sign(dist.x) * overlapX, 0);
        else
            return new Vector2(0, Math.sign(dist.y) * overlapY);
    }

    resolveCollision(entity1: Entity, entity2: Entity) {
        const penetrationVector = this.getPenetrationVector(entity1, entity2);
        if (!penetrationVector || (entity1.static && entity2.static) || !entity1.solid || !entity2.solid) return;

        const collisionNormal = penetrationVector.clone().normalize();
        const relativeVelocity = entity2.velocity.clone().sub(entity1.velocity);

        let mov = penetrationVector.clone();
        let vel = relativeVelocity.dot(collisionNormal);
        if (!entity1.static && !entity2.static) {
            mov.div(2);
            vel /= 2;
        }

        const impulse = collisionNormal.clone().mult(vel);
        if (!entity1.static) {
            entity1.position.add(mov);
            entity1.velocity.add(impulse);
        }
        if (!entity2.static) {
            entity2.position.sub(mov);
            entity2.velocity.sub(impulse);
        }
    }

    raycastEntity(rayOrigin: Vector2, rayDir: Vector2, entity: Entity) {
        const halfSize = entity.getSize().div(2);
        const t1 = entity.position.clone().sub(halfSize).sub(rayOrigin).div(rayDir);
        const t2 = entity.position.clone().add(halfSize).sub(rayOrigin).div(rayDir);
        const tMin = Math.max(Math.min(t1.x, t2.x), Math.min(t1.y, t2.y));
        const tMax = Math.min(Math.max(t1.x, t2.x), Math.max(t1.y, t2.y));
        return tMax >= 0 && tMin <= tMax ? Math.max(0, tMin) : Infinity;
    }

    raycastEntities(rayOrigin: Vector2, rayDir: Vector2, filter: (entity: Entity) => boolean = () => true) {
        return this.entities.filter(filter).reduce<[Entity | null, number]>(([prevEntity, dist], entity) => {
            const d = this.raycastEntity(rayOrigin, rayDir, entity);
            return d < dist ? [entity, d] : [prevEntity, dist];
        }, [null, Infinity]);
    }

    isIntersecting(entity1: Entity, entity2: Entity) {
        const sumHalfSizes = entity1.getSize().add(entity2.getSize()).div(2);
        const dist = entity1.position.clone().sub(entity2.position);
        return sumHalfSizes.x > Math.abs(dist.x) && sumHalfSizes.y > Math.abs(dist.y);
    }

    updateKeyboard(pressed: Set<string>, dt: number) {
        if (pressed.has('KeyR')) return this.init();

        if (pressed.has('ArrowUp') || pressed.has('KeyW') || pressed.has('Space')) {
            if (this.player.onLadder) this.player.velocity.y = 0.075;
            else if (this.player.onGround) {
                this.player.velocity.y = 0.42;
                soundJump.play();
            }
        }

        const right = pressed.has('ArrowRight') || pressed.has('KeyD');
        const left = pressed.has('ArrowLeft') || pressed.has('KeyA');
        this.player.velocity.x = Math.min(Math.max(this.player.velocity.x + (+right - +left) * dt / 1000, -0.1), 0.1);

        if (pressed.has('KeyE')) {
            if (this.player.hasBattery) {
                for (const slot of this.batterySlots) {
                    if (!slot.hasBattery && this.isIntersecting(this.player, slot)) {
                        slot.hasBattery = true;
                        this.player.hasBattery = false;
                        this.updateEndDoor();
                        soundPutBattery.play();
                        break;
                    }
                }
            }
            else {
                for (const battery of this.batteries) {
                    if (this.entities.includes(battery) && this.isIntersecting(this.player, battery)) {
                        this.player.hasBattery = true;
                        this.entities.splice(this.entities.indexOf(battery), 1);
                        soundPutBattery.play();
                        break;
                    }
                }
            }

            for (const lever of this.levers) {
                if (!lever.pressed && this.isIntersecting(this.player, lever)) {
                    lever.left = !lever.left;
                    lever.pressed = true;
                }
            }
        }
        else {
            for (const lever of this.levers) {
                lever.pressed = false;
            }
        }
    }

    emitLazer(enititySource: Entity, origin: Vector2, direction: Vector2, n = 0) {
        const [entityDest, distance] = this.raycastEntities(
            origin, direction,
            entity => entity !== enititySource && entity.solid
        );
        if (entityDest instanceof Mirror && n < 10) {
            const mirrorOrigin = origin.clone().add(direction.clone().mult(distance));
            const mirrorDirection = entityDest.rotation % 2 === 0 ? new Vector2(direction.x, -direction.y) : new Vector2(-direction.x, direction.y);
            entityDest.rays.push([
                mirrorOrigin,
                mirrorDirection,
                this.emitLazer(entityDest, mirrorOrigin, mirrorDirection, n + 1)
            ]);
        }
        else if (entityDest instanceof Sensor) {
            entityDest.active = true;
            this.updateEndDoor();
        }
        return distance;
    }

    updatePhysics(dt: number) {
        if (this.isIntersecting(this.player, this.endDoor) && this.endDoor.open) {
            soundDoor.play();
            this.nextLevel();
            return;
        }

        if (this.acids.some(acid => this.entities.includes(acid) && this.isIntersecting(this.player, acid))) {
            this.init();
            return;
        }

        for (let i = 0; i < 10; ++i) {
            for (const entity of this.entities) {
                entity.physicsUpdate(dt / 10);
            }
            for (let i = 0; i < this.entities.length; ++i) {
                for (let j = i + 1; j < this.entities.length; ++j) {
                    this.resolveCollision(this.entities[i], this.entities[j]);
                }
            }
        }
        for (const mirror of this.mirrors) mirror.rays = [];
        for (const sensor of this.sensors) sensor.active = false;
        for (const lazer of this.lazers) {
            lazer.rayLength = this.emitLazer(lazer, lazer.getRayOrigin(), lazer.getRayDirection());
        }

        const filter = (entity: Entity) => entity !== this.player && entity.solid;
        const [, leftDist] = this.raycastEntities(
            this.player.position.clone().add(this.player.getSize().div(-2)),
            new Vector2(0, -1),
            filter
        );
        const [, rightDist] = this.raycastEntities(
            this.player.position.clone().add(this.player.getSize().div(new Vector2(2, -2))),
            new Vector2(0, -1),
            filter
        );
        this.player.onGround = Math.abs(Math.min(leftDist, rightDist)) < 0.01;

        this.player.onLadder = false;
        for (const ladder of this.ladders) {
            if (this.isIntersecting(this.player, ladder)) {
                this.player.onLadder = true;
                break;
            }
        }
    }

    render(ctx: CanvasRenderingContext2D, dt: number) {
        this.background.render(ctx, dt, new Vector2(0, 0));
        for (const entity of this.entities) {
            entity.render(ctx, dt);
        }
    }

    renderDebug(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = 0.75;
        for (const entity of this.entities) {
            const size = entity.getSize();
            const x = Math.round(entity.position.x - size.x / 2);
            const y = Math.round(-entity.position.y - size.y / 2);
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(x + 0.5, y + 0.5, size.x - 1, size.y - 1);
        }

        ctx.save();
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(50, 0);
        ctx.lineTo(0, 0);
        ctx.lineTo(0, -50);
        ctx.moveTo(45, -5);
        ctx.lineTo(50, 0);
        ctx.lineTo(45, 5);
        ctx.moveTo(-5, -45);
        ctx.lineTo(0, -50);
        ctx.lineTo(5, -45);
        ctx.stroke();
        ctx.restore();

        ctx.restore();
    }
}