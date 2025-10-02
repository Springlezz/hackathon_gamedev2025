export default class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    mult(value) {
        this.x *= value;
        this.y *= value;
        return this;
    }
    div(valueOrVec) {
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

    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
}