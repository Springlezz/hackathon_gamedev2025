export default class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vector2(this.x, this.y);
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
    div(value) {
        this.x /= value;
        this.y /= value;
        return this;
    }
}