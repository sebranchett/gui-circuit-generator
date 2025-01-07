
/**
 * Represents a position with x and y coordinates.
 */
export class Position {
    /**
     * Creates an instance of Position.
     * @param {number} x - The x-coordinate, must be non-negative.
     * @param {number} y - The y-coordinate, must be non-negative.
     * @throws {Error} If either x or y is negative.
     */
    constructor(x, y) {
        if (x < 0 || y < 0) {
            throw new Error("Position coordinates must be non-negative.");
        }
        this.x = x;
        this.y = y;
    }

    /**
     * Checks if this position is equal to another position.
     * @param {Position} other - The other position to compare with.
     * @returns {boolean} True if the positions are equal, false otherwise.
     */
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
}