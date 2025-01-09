import { Element } from './Element.js';
import { Properties } from '../valueObjects/Properties.js';

/**
 * Represents a Resistor in the circuit.
 */
export class Resistor extends Element {
    /**
     * Creates an instance of Resistor.
     * 
     * @param {string} id - The unique identifier for the resistor.
     * @param {Position[]} terminals - The two terminal positions for the resistor.
     * @param {Label|null} label - The label of the resistor (optional).
     * @param {Properties} properties - A container for the resistor's properties, including resistance.
     */
    constructor(id, terminals, label = null, properties = new Properties({ resistance: "undefined" })) {
        if (terminals.length !== 2) {
            throw new Error("A Resistor must have exactly two terminals.");
        }
        super(id, terminals, label, properties);
        this.type = 'resistor';
    }
}
