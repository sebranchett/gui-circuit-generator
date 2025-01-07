import { expect } from 'chai';
import { Element } from '../../src/domain/entities/Element.js';
import { Position } from '../../src/domain/valueObjects/Position.js';
import { Label } from '../../src/domain/valueObjects/Label.js';
import { Properties } from '../../src/domain/valueObjects/Properties.js';

console.log("This test runs successfully")

describe('Basic Import Test', () => {
    it('should import Element successfully', () => {
        expect(Element).to.be.a('function');
    });
});
/**
 * MockElement class extends the Element class for testing purposes.
 */
class MockElement extends Element {
    constructor(id, terminals = [], label = null, properties = new Properties()) {
        super(id, terminals, label, properties);
        this.type = 'mock';
    }
}

describe('Element Class Tests', () => {
    it('An element should have a unique identifier', () => {
        const element = new MockElement('E1', [new Position(10, 20)], null, new Properties());
        expect(element.id).to.equal('E1');
    });

    it('An element should validate terminals as an array of Position instances', () => {
        const terminals = [new Position(10, 20), new Position(30, 40)];
        const element = new MockElement('E2', terminals, null, new Properties());
        expect(element.terminals).to.deep.equal(terminals);
    });

    it('An element should throw an error if terminals are invalid', () => {
        expect(() => new MockElement('E3', [10, 20], null, new Properties())).to.throw(
            "Terminals must be an array of Position instances."
        );
    });

    it('An element should accept a label of type Label or null', () => {
        const label = new Label('Test Label');
        const element = new MockElement('E4', [new Position(10, 20)], label, new Properties());
        expect(element.label).to.equal(label);
    });

    it('An element should throw an error if label is invalid', () => {
        expect(() => new MockElement('E5', [new Position(10, 20)], 'Invalid Label', new Properties())).to.throw(
            "Label must be an instance of Label or null."
        );
    });

    it('An element should accept properties of type Properties', () => {
        const properties = new Properties({ resistance: 100 });
        const element = new MockElement('E6', [new Position(10, 20)], null, properties);
        expect(element.properties).to.equal(properties);
    });

    it('An element should throw an error if properties are invalid', () => {
        expect(() => new MockElement('E7', [new Position(10, 20)], null, { invalid: 'properties' })).to.throw(
            "Properties must be an instance of Properties."
        );
    });

    it('An element should be abstract and not directly instantiable', () => {
        expect(() => new Element('E8', [new Position(10, 20)], null, new Properties())).to.throw(
            "Cannot instantiate abstract class Element directly."
        );
    });

    it('An element should support the describe method', () => {
        const terminals = [new Position(10, 20), new Position(30, 40)];
        const label = new Label('Test Label');
        const properties = new Properties({ resistance: 100 });
        const element = new MockElement('E9', terminals, label, properties);

        const description = element.describe();
        expect(description).to.equal(
            'mock (E9): terminals: [(10, 20), (30, 40)], label: "Test Label", properties: resistance: 100'
        );
    });
});
