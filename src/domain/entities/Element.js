// src/domain/entities/Element.js

export class Element {
    constructor(id, position) {
        if (new.target === Element) {
            throw new Error("Cannot instantiate abstract class Element directly.");
        }
        this.id = id;
        this.position = position; // { x, y }
        this.type = null; // Each subclass must define its type
    }

    // Common behavior for all elements
    move(newPosition) {
        this.position = newPosition;
    }

    describe() {
        return `${this.type} (${this.id}) at position (${this.position.x}, ${this.position.y})`;
    }
}
