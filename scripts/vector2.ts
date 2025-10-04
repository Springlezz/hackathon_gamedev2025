export default class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    clone(): Vector2 {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    add(vector: Vector2) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    sub(vector: Vector2) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    mult(value: number) {
        this.x *= value;
        this.y *= value;
        return this;
    }

    div(value: number): Vector2;
    div(value: Vector2): Vector2;
    div(valueOrVec: number | Vector2) {
        if (valueOrVec instanceof Vector2) {
            this.x /= valueOrVec.x;
            this.y /= valueOrVec.y;
        }
        else {
            this.x /= valueOrVec;
            this.y /= valueOrVec;
        }
        return this;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        const length = this.length();
        this.x /= length;
        this.y /= length;
        return this;
    }

    dot(vector: Vector2) {
        return this.x * vector.x + this.y * vector.y;
    }

    getAngle() {
        return Math.atan2(this.x, this.y);
    }
}