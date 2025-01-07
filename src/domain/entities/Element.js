import { Label } from '../valueObjects/Label.js';
import { Position } from '../valueObjects/Position.js';
import { Properties } from '../valueObjects/Properties.js';

/**
 * Represents an abstract element in a circuit.
 * 
 * @abstract
 */
export class Element {
    /**
     * Creates an instance of an Element.
     * 
     * @param {string} id - The unique identifier for the element.
     * @param {Position[]} terminals - The list of terminal positions.
     * @param {Label|null} label - The label of the element (optional).
     * @param {Properties} properties - A container for the element's specific properties.
     * @throws {Error} If attempting to instantiate the abstract class directly.
     */
    constructor(id, terminals, label = null, properties) 
        {
        if (new.target === Element) {
            throw new Error("Cannot instantiate abstract class Element directly.");
        }
        if (!Array.isArray(terminals) || !terminals.every(t => t instanceof Position)) {
            throw new Error("Terminals must be an array of Position instances.");
        }
        if (label !== null && !(label instanceof Label)) {
            throw new Error("Label must be an instance of Label or null.");
        }
        if (!(properties instanceof Properties)) {
            throw new Error("Properties must be an instance of Properties.");
        }

        this.id = id;
        this.terminals = terminals;
        this.label = label;
        this.type = null; // Each subclass must define its type
        this.properties = properties; // Properties container
    }

    /**
     * Describes the element with its type, id, terminals, label, and properties.
     * 
     * @returns {string} A string description of the element.
     */
    describe() {
        const labelText = this.label ? `, label: "${this.label}"` : '';
        const terminalsText = this.terminals.map(t => `(${t.x}, ${t.y})`).join(', ');
        return `${this.type} (${this.id}): terminals: [${terminalsText}]${labelText}, properties: ${this.properties.describe()}`;
    }
}
