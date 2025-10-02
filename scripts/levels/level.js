import BorderLeft from '../entities/border-left.js';
import BorderRight from '../entities/border-right.js';
import BorderTop from '../entities/border-top.js';
import Door from '../entities/door.js';
import MirrorDiagonal from '../entities/mirror-diagonal.js';
import Player from '../entities/player.js';
import Sound from '../sound.js';
import Vector2 from '../vector2.js';

const soundPutBattery = await Sound.load('put-battery');

export default class Level {
    #borders = [
        new BorderLeft(new Vector2(-496, 0)),
        new BorderRight(new Vector2(496, 0)),
        new BorderTop(new Vector2(0, 272))
    ];
    platforms = [];
    ladders = [];
    lazers = [];
    mirrors = [];
    batterySlots = [];
    batteries = [];
    #entities = [];

    constructor(nextLevel) {
        this.nextLevel = nextLevel;
    }

    init() {
        this.startDoor = new Door(this.startPoint.clone());
        this.endDoor = new Door(this.endPoint.clone());
        this.player = new Player(this.startPoint.clone());

        for (const slot of this.batterySlots) slot.hasBattery = false;

        this.#entities = [
            ...this.#borders,
            this.startDoor,
            this.endDoor,
            ...this.platforms,
            ...this.ladders,
            ...this.lazers,
            ...this.mirrors,
            ...this.batterySlots,
            ...this.batteries,
            this.player
        ];
    }

    getPenetrationVector(entity1, entity2) {
        const sumHalfSizes = entity1.size.clone().add(entity2.size).div(2);
        const dist = entity1.position.clone().sub(entity2.position);
        const overlapX = sumHalfSizes.x - Math.abs(dist.x);
        const overlapY = sumHalfSizes.y - Math.abs(dist.y);
        if (overlapX <= 0 || overlapY <= 0) return null;
        if (overlapX < overlapY)
            return new Vector2(Math.sign(dist.x) * overlapX, 0);
        else
            return new Vector2(0, Math.sign(dist.y) * overlapY);
    }

    resolveCollision(entity1, entity2) {
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

    raycastEntity(rayOrigin, rayDir, entity) {
        const halfSize = entity.size.clone().div(2);
        const t1 = entity.position.clone().sub(halfSize).sub(rayOrigin).div(rayDir);
        const t2 = entity.position.clone().add(halfSize).sub(rayOrigin).div(rayDir);
        const tMin = Math.max(Math.min(t1.x, t2.x), Math.min(t1.y, t2.y));
        const tMax = Math.min(Math.max(t1.x, t2.x), Math.max(t1.y, t2.y));
        return tMax >= 0 && tMin <= tMax ? Math.max(0, tMin) : Infinity;
    }

    raycastEntities(rayOrigin, rayDir, filter = () => true) {
        return this.#entities.filter(filter).reduce(([prevEntity, dist], entity) => {
            const d = this.raycastEntity(rayOrigin, rayDir, entity);
            return d < dist ? [entity, d] : [prevEntity, dist];
        }, [null, Infinity]);
    }

    isIntersecting(entity1, entity2) {
        const sumHalfSizes = entity1.size.clone().add(entity2.size).div(2);
        const dist = entity1.position.clone().sub(entity2.position);
        return sumHalfSizes.x > Math.abs(dist.x) && sumHalfSizes.y > Math.abs(dist.y);
    }

    updateKeyboard(pressed) {
        if (pressed.has('KeyR')) return this.init();

        if (pressed.has('ArrowUp') || pressed.has('KeyW') || pressed.has('Space')) {
            let onLadder = false;
            for (const ladder of this.ladders) {
                if (this.isIntersecting(this.player, ladder)) {
                    onLadder = true;
                    break;
                }
            }
            if (onLadder) this.player.velocity.y = 0.05;
            else {
                const filter = entity => entity !== this.player && entity.solid;
                const [leftEntity, leftDist] = this.raycastEntities(
                    this.player.position.clone().add(new Vector2(-this.player.size.x / 2, -this.player.size.y / 2)),
                    new Vector2(0, -1),
                    filter
                );
                const [rightEntity, rightDist] = this.raycastEntities(
                    this.player.position.clone().add(new Vector2(this.player.size.x / 2, -this.player.size.y / 2)),
                    new Vector2(0, -1),
                    filter
                );
                if (Math.min(leftDist, rightDist) === 0) this.player.velocity.y = 0.42;
            }
        }
        const right = pressed.has('ArrowRight') || pressed.has('KeyD');
        const left = pressed.has('ArrowLeft') || pressed.has('KeyA');
        this.player.velocity.x = Math.min(Math.max(this.player.velocity.x + (right - left) / 100, -0.1), 0.1);

        if (pressed.has('KeyE')) {
            if (this.player.hasBattery) {
                for (const slot of this.batterySlots) {
                    if (!slot.hasBattery && this.isIntersecting(this.player, slot)) {
                        slot.hasBattery = true;
                        this.player.hasBattery = false;
                        soundPutBattery.play();
                        break;
                    }
                }
            }
            else {
                for (const battery of this.batteries) {
                    if (this.#entities.includes(battery) && this.isIntersecting(this.player, battery)) {
                        this.player.hasBattery = true;
                        this.#entities.splice(this.#entities.indexOf(battery), 1);
                        soundPutBattery.play();
                        break;
                    }
                }
            }
        }
    }

    updatePhysics(dt) {
        if (this.isIntersecting(this.player, this.endDoor) && this.batterySlots.every(slot => slot.hasBattery)) {
            this.nextLevel();
            return;
        }

        for (let i = 0; i < 10; ++i) {
            for (const entity of this.#entities) {
                entity.physicsUpdate(dt / 10);
            }
            for (let i = 0; i < this.#entities.length; ++i) {
                for (let j = i + 1; j < this.#entities.length; ++j) {
                    this.resolveCollision(this.#entities[i], this.#entities[j]);
                }
            }
        }
        for (const mirror of this.mirrors) mirror.rayLength = 0;
        for (const lazer of this.lazers) {
            const [entity, dist] = this.raycastEntities(
                new Vector2(lazer.position.x, lazer.position.y - lazer.size.y / 2),
                new Vector2(0, -1),
                e => e !== lazer
            );
            lazer.rayLength = dist;
            if (entity instanceof MirrorDiagonal) {
                const [entity2, dist] = this.raycastEntities(
                    new Vector2(entity.position.x, entity.position.y),
                    entity.left ? new Vector2(-1, 1) : new Vector2(1, 1),
                    e => e !== entity && e.solid
                );
                entity.rayLength = dist;
            }
        }
    }

    render(ctx, dt) {
        this.background.render(ctx, dt, 0, 0);
        for (const entity of this.#entities) {
            entity.render(ctx, dt);
        }
    }

    renderDebug(ctx) {
        ctx.save();
        ctx.globalAlpha = 0.75;
        for (const entity of this.#entities) {
            const x = Math.round(entity.position.x - entity.size.x / 2);
            const y = Math.round(-entity.position.y - entity.size.y / 2);
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(x + 0.5, y + 0.5, entity.size.x - 1, entity.size.y - 1);
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