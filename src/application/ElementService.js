import { Position } from '../domain/valueObjects/Position.js';


export class ElementService {
    /**
     * Moves an element to a new position, updating all node positions.
     * 
     * @param {Element} element - The element to move.
     * @param {Position} newReferencePosition - The new position for the reference node.
     */
    static move(element, newReferencePosition) {
        const refNode = element.nodes[0]; // Reference node
        const deltaX = newReferencePosition.x - refNode.x;
        const deltaY = newReferencePosition.y - refNode.y;

        element.nodes = element.nodes.map(node => 
            new Position(node.x + deltaX, node.y + deltaY)
        );
    }

    /**
     * Rotates an existing element to a new orientation.
     * 
     * @param {Element} element - The element to rotate.
     * @param {number} newOrientation - The new orientation (0, 90, 180, or 270 degrees).
     */
    static rotate(element, newOrientation) {
        if (![0, 90, 180, 270].includes(newOrientation)) {
            throw new Error("Orientation must be one of 0, 90, 180, or 270 degrees.");
        }

        const refNode = element.nodes[0]; // Reference node
        const refX = refNode.x;
        const refY = refNode.y;

        element.nodes = element.nodes.map((node, index) => {
            if (index === 0) return node;

            const relX = node.x - refX;
            const relY = node.y - refY;

            const radians = (Math.PI / 180) * newOrientation;
            const cos = Math.cos(radians);
            const sin = Math.sin(radians);

            const newX = Math.round(refX + relX * cos - relY * sin);
            const newY = Math.round(refY + relX * sin + relY * cos);

            return new Position(newX, newY);
        });
    }

    /**
     * Rotates a position around the origin.
     * 
     * @param {number} x - The x-coordinate of the position.
     * @param {number} y - The y-coordinate of the position.
     * @param {number} angle - The angle to rotate by (in degrees).
     * @returns {number[]} The rotated [x, y] position.
     */
    static _rotatePosition(x, y, angle) {
        const radians = (Math.PI / 180) * angle;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const newX = Math.round(x * cos - y * sin);
        const newY = Math.round(x * sin + y * cos);
        return [newX, newY];
    }

    /**
     * Updates properties of an existing element.
     * 
     * @param {Element} element - The element whose properties are being updated.
     * @param {Object} updates - An object containing property updates.
     * @throws {Error} If any property value is invalid.
     */
    static updateProperties(element, updates) {
        Object.entries(updates).forEach(([key, value]) => {
            if (!element.properties.isValidValue(value)) {
                throw new Error(`Invalid value for property "${key}". Must be a float, "variable", or "undefined".`);
            }
            element.properties.values[key] = value;
        });
    }

    /**
     * Updates the label of an existing element.
     * 
     * @param {Element} element - The element whose label is being updated.
     * @param {Label} newLabel - The new label.
     */
    static updateLabel(element, newLabel) {
        element.label = newLabel;
    }
}