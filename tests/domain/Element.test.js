import { expect } from 'chai';
import { Element } from '../../src/domain/entities/Element.js';
import { Position } from '../../src/domain/value-objects/Position.js';
import { Resistance } from '../../src/domain/value-objects/Resistance.js';

/**
 * MockElement class extends the Element class to create a mock element for testing purposes.
 * 
 * @class
 * @extends Element
 * 
 * @param {string} id - The unique identifier for the element.
 * @param {Array} [terminals=[]] - The terminals associated with the element.
 * @param {Object} [properties={}] - The properties of the element.
 * @param {string} [label=''] - The label for the element.
 */
class MockElement extends Element {
    constructor(id, terminals = [], properties = {}, label = '') {
        super(id, terminals, properties, label);
        this.type = 'mock';
        this.terminals = terminals;
        this.properties = { ...properties };
    }
}

describe('Element Class Tests', () => {
    it('An element should have a unique identifier', () => {
        const element = new MockElement('E1', []);
        expect(element.id).to.equal('E1');
    });

    it('An element should have default properties', () => {
        const element = new MockElement('E2', [], { resistance: new Resistance(100) });
        expect(element.properties.resistance.value).to.equal(100);
    });

    it('An element should support editable properties', () => {
        const element = new MockElement('E3', [], { resistance: new Resistance(100) });
        element.properties.resistance = new Resistance(200);
        expect(element.properties.resistance.value).to.equal(200);
    });

    it('An element should be abstract and not directly instantiable', () => {
        expect(() => new Element('E4', [])).to.throw('Cannot instantiate abstract class Element directly.');
    });

    it('An element should support multiple properties', () => {
        const element = new MockElement('E5', [], { resistance: new Resistance(100), capacitance: 0.01 });
        expect(element.properties.resistance.value).to.equal(100);
        expect(element.properties.capacitance).to.equal(0.01);
    });

    it('An element should use value objects for shared properties', () => {
        const position = new Position(10, 20);
        const element = new MockElement('E6', [{ name: 'A', position }]);
        expect(element.terminals[0].position.equals(position)).to.be.true;
    });

    it('The position of an element should depend on its terminals', () => {
        const position1 = new Position(10, 20);
        const position2 = new Position(30, 40);
        const element = new MockElement('E7', [
            { name: 'A', position: position1 },
            { name: 'B', position: position2 },
        ]);
        expect(element.terminals.length).to.equal(2);
        expect(element.terminals[0].position.equals(position1)).to.be.true;
        expect(element.terminals[1].position.equals(position2)).to.be.true;
    });

    it('An element should support labeling', () => {
        const element = new MockElement('E8', [], {}, 'Test Label');
        expect(element.label).to.equal('Test Label');
    });

    it('A junction should be a valid element', () => {
        const junction = new MockElement('J1', [
            { name: 'T1', position: new Position(10, 20) },
            { name: 'T2', position: new Position(30, 40) },
            { name: 'T3', position: new Position(50, 60) },
        ]);
        expect(junction.type).to.equal('mock');
        expect(junction.terminals.length).to.equal(3);
    });
});
