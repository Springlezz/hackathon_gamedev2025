import Entity from './entity.js';
import { imageResource } from './resourcesLoader.js';
import Vector2 from './vector2.js';

async function loadLevel(levelNumber){
    let response = await fetch(`/levels/${levelNumber}.json`);
    let levelInfo = await response.json();
    return levelInfo.map(entity => new Entity(imageResource(entity.texture), new Vector2(entity.width, entity.height), new Vector2(entity.x, entity.y)));
}