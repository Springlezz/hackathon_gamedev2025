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

        if (entity1.mass === 0)
            entity2.position.sub(penetrationVector);
        else if (entity2.mass === 0)
            entity1.position.add(penetrationVector);
        else {
            const totalMass = entity1.mass + entity2.mass;
            entity1.position.add(penetrationVector.mult(entity2.mass / totalMass));
            entity2.position.sub(penetrationVector.mult(entity1.mass / totalMass));
        }

        const collisionNormal = penetrationVector.clone().normalize();
        const relativeVelocity = entity2.velocity.clone().sub(entity1.velocity);
        const normalVelocity = relativeVelocity.dot(collisionNormal);
        const tangent = relativeVelocity.clone().sub(collisionNormal.clone().mult(normalVelocity));

        const tangentLength = tangent.length();
        if (tangentLength > 0) tangent.div(tangentLength);

        for (const entity of [entity1, entity2]) {
            if (entity.mass === 0) continue;
            entity.velocity.sub(collisionNormal.mult(entity.velocity.dot(collisionNormal)));

            if (tangentLength > 0) {
                const normalComponent = entity.velocity.clone().dot(collisionNormal);
                const normalVelocity = collisionNormal.clone().mult(normalComponent);
                const tangentVelocity = entity.velocity.clone().sub(normalVelocity);
                tangentVelocity.mult(0.9);
                entity.velocity = normalVelocity.add(tangentVelocity);
            }
        }
    }

    raycastEntity(rayOrigin, rayDir, entity) {
        const halfSize = entity.size.clone().div(2);
        const t1 = entity.position.clone().sub(halfSize).sub(rayOrigin).div(rayDir);
        const t2 = entity.position.clone().add(halfSize).sub(rayOrigin).div(rayDir);
        const tMin = Math.max(Math.min(t1.x, t2.x), Math.min(t1.y, t2.y));
        const tMax = Math.min(Math.max(t1.x, t2.x), Math.max(t1.y, t2.y));
        return tMax >= 0 && tMin <= tMax && tMin >= 0 ? tMin : Infinity;
    }

    raycastEntities(rayOrigin, rayDir) {
        return this.entities.reduce((dist, entity) => {
            const d = this.raycastEntity(rayOrigin, rayDir, entity);
            return d < dist ? d : dist;
        }, Infinity);
    }

    updateKeyboard(pressed) {
        if (pressed.has('ArrowUp') || pressed.has('KeyW') || pressed.has('Space')) {
            const dist = this.raycastEntities(
                this.player.position.clone().add(new Vector2(0, this.player.size.y / 2)),
                new Vector2(0, 1)
            );
            if (dist === 0) this.player.velocity.y = -500;
        }
        const right = pressed.has('ArrowRight') || pressed.has('KeyD');
        const left = pressed.has('ArrowLeft') || pressed.has('KeyA');
        this.player.velocity.x = Math.min(Math.max(this.player.velocity.x + (right - left) * 10, -100), 100);
    }

    updatePhysics(dt) {
        for (const entity of this.entities) {
            entity.physicsUpdate(dt);
        }
        for (const entity1 of this.entities) {
            for (const entity2 of this.entities) {
                if (entity1 === entity2) continue;
                this.resolveCollision(entity1, entity2);
            }
        }
    }

    render(ctx, dt) {
        for (const entity of this.entities) {
            entity.render(ctx, dt);
        }
    }
}