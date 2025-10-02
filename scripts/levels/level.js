import Vector2 from '../vector2.js';

export default class Level {
    player = null;
    entities = [];

    constructor() {
        this.entities.push(this.player);
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
        if (!penetrationVector || (entity1.mass === 0 && entity2.mass === 0)) return;

        const collisionNormal = penetrationVector.clone().normalize();
        const relativeVelocity = entity2.velocity.clone().sub(entity1.velocity);

        if (entity1.mass === 0)
            entity2.position.sub(penetrationVector);
        else if (entity2.mass === 0)
            entity1.position.add(penetrationVector);
        else {
            const totalMass = entity1.mass + entity2.mass;
            entity1.position.add(penetrationVector.clone().mult(entity2.mass / totalMass));
            entity2.position.sub(penetrationVector.clone().mult(entity1.mass / totalMass));
        }

        let velocityAlongNormal = relativeVelocity.dot(collisionNormal);
        if (entity1.mass !== 0 && entity2.mass !== 0) velocityAlongNormal /= 2;

        const impulse = collisionNormal.clone().mult(velocityAlongNormal);
        if (entity1.mass !== 0) {
            entity1.velocity.add(impulse);
        }
        if (entity2.mass !== 0) {
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

    raycastEntities(rayOrigin, rayDir) {
        return this.entities.reduce((dist, entity) => {
            const d = this.raycastEntity(rayOrigin, rayDir, entity);
            return d < dist ? d : dist;
        }, Infinity);
    }

    updateKeyboard(pressed) {
        if (pressed.has('ArrowUp') || pressed.has('KeyW') || pressed.has('Space')) {
            const left = this.raycastEntities(
                this.player.position.clone().add(new Vector2(-this.player.size.x / 2, -this.player.size.y / 2)),
                new Vector2(0, -1)
            );
            const right = this.raycastEntities(
                this.player.position.clone().add(new Vector2(this.player.size.x / 2, -this.player.size.y / 2)),
                new Vector2(0, -1)
            );
            const dist = Math.min(left, right);
            console.log(dist);
            if (dist === 0) this.player.velocity.y = 500;
        }
        const right = pressed.has('ArrowRight') || pressed.has('KeyD');
        const left = pressed.has('ArrowLeft') || pressed.has('KeyA');
        this.player.velocity.x = Math.min(Math.max(this.player.velocity.x + (right - left) * 10, -100), 100);
    }

    updatePhysics(dt) {
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
    }

    render(ctx, dt) {
        for (const entity of this.entities) {
            entity.render(ctx, dt);
        }
    }

    renderDebug(ctx) {
        ctx.save();
        ctx.globalAlpha = 0.75;
        for (const entity of this.entities) {
            const x = Math.round(entity.position.x - entity.texture.width / 2);
            const y = Math.round(-entity.position.y - entity.texture.height / 2);
            ctx.strokeStyle = 'red';
            ctx.strokeRect(x + 0.5, y + 0.5, entity.texture.width - 1, entity.texture.height - 1);
        }
        for (const entity of this.entities) {
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