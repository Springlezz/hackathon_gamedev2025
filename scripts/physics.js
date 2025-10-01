import Vector2 from './vector2.js';

function getPenetrationVector(entity1, entity2) {
    const sumHalfSizes = entity1.size.clone().add(entity2.size).div(2);
    const dist = entity1.position.clone().sub(entity2.position);
    const overlapX = sumHalfSizes.x - Math.abs(dist.x);
    const overlapY = sumHalfSizes.y - Math.abs(dist.y);
    if (overlapX < 0 || overlapY < 0) return null;
    if (overlapX < overlapY)
        return new Vector2(Math.sign(dist.x) * overlapX, 0);
    else
        return new Vector2(0, Math.sign(dist.y) * overlapY);
}

function resolveCollision(entity1, entity2) {
    const penetrationVector = getPenetrationVector(entity1, entity2);
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
}

export function resolveCollisions(entities) {
    for (const entity1 of entities) {
        for (const entity2 of entities) {
            if (entity1 === entity2) continue;
            resolveCollision(entity1, entity2);
        }
    }
}