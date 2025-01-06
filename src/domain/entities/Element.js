
/**
 * Represents an abstract element in a circuit.
 * 
 * @abstract
 */
export class Element {
    constructor(id, position) {
        if (new.target === Element) {
            throw new Error("Cannot instantiate abstract class Element directly.");
        }
        this.id = id;
        this.position = position; // { x, y }
        this.type = null; // Each subclass must define its type
    }

    /**
     * Describes the element with its type, id, and position.
     * 
     * @returns {string} A string description of the element.
     */
    describe() {
        return `${this.type} (${this.id}) at position (${this.position.x}, ${this.position.y})`;
    }
}
