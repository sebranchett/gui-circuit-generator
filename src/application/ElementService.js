import { Position } from '../domain/valueObjects/Position.js';
import { Element } from '../domain/entities/Element.js';

export class ElementService {
    /**
     * Creates a new element.
     * 
     * @param {Function} ElementClass - The class of the element to create (e.g., Resistor, Junction).
     * @param {string} id - The unique identifier for the element.
     * @param {Position[]} terminals - The terminal positions.
     * @param {Object} propertiesArgs - The arguments for the specific properties container.
     * @returns {Element} The newly created element.
     */
    static createElement(ElementClass, id, terminals, propertiesArgs) {
        return new ElementClass(id, terminals, ...propertiesArgs);
    }

    /**
     * Deletes an element.
     * 
     * @param {Element[]} elements - The array of elements.
     * @param {string} id - The unique identifier of the element to delete.
     * @returns {Element[]} The updated list of elements.
     */
    static deleteElement(elements, id) {
        return elements.filter(element => element.id !== id);
    }

    /**
     * Moves an element to a new position, updating all terminal positions.
     * 
     * @param {Element} element - The element to move.
     * @param {Position} newReferencePosition - The new position for the reference terminal.
     */
    static moveElement(element, newReferencePosition) {
        const refTerminal = element.terminals[0]; // Reference terminal
        const deltaX = newReferencePosition.x - refTerminal.x;
        const deltaY = newReferencePosition.y - refTerminal.y;

        element.terminals = element.terminals.map(terminal => 
            new Position(terminal.x + deltaX, terminal.y + deltaY)
        );
    }

    /**
     * Rotates an element to a new orientation.
     * 
     * @param {Element} element - The element to rotate.
     * @param {number} newOrientation - The new orientation (0, 90, 180, or 270 degrees).
     */
    static rotateElement(element, newOrientation) {
        if (![0, 90, 180, 270].includes(newOrientation)) {
            throw new Error("Orientation must be one of 0, 90, 180, or 270 degrees.");
        }

        const refTerminal = element.terminals[0]; // Reference terminal
        const refX = refTerminal.x;
        const refY = refTerminal.y;

        element.terminals = element.terminals.map((terminal, index) => {
            if (index === 0) return terminal; // Keep the reference terminal unchanged

            // Calculate relative position
            const relX = terminal.x - refX;
            const relY = terminal.y - refY;

            // Rotate relative position
            const [newRelX, newRelY] = ElementService._rotatePosition(relX, relY, newOrientation);

            // Return the new absolute position
            return new Position(refX + newRelX, refY + newRelY);
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
}
