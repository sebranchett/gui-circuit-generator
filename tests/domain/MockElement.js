import { Element } from '../../src/domain/entities/Element.js';
import { Properties } from '../../src/domain/valueObjects/Properties.js';

/**
 * MockElement class extends the Element class for testing purposes.
 */
export class MockElement extends Element {
    /**
     * Creates an instance of MockElement.
     * 
     * @param {string} id - The unique identifier for the element.
     * @param {Position[]} terminals - The list of terminal positions.
     * @param {Label|null} label - The label of the element (optional).
     * @param {Properties} properties - A container for the element's specific properties.
     */
    constructor(id, terminals = [], label = null, properties = new Properties()) {
        super(id, terminals, label, properties);
        this.type = 'mock';
    }
}
