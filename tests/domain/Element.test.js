// src/tests/domain/Element.test.js

import { Element } from '../../src/domain/entities/Element.js';
import { Position } from '../../src/domain/value-objects/Position.js';
import { Resistance } from '../../src/domain/value-objects/Resistance.js';

// Mock concrete implementation of Element for testing
class MockElement extends Element {
    constructor(id, terminals, properties = {}, label = '') {
        super(id, terminals, properties, label);
        this.type = 'mock';
    }
}

describe('Element Class Tests', () => {
    test('An element should have a unique identifier', () => {
        const element = new MockElement('E1', []);
        expect(element.id).toBe('E1');
    });

    test('An element should have default properties', () => {
        const element = new MockElement('E2', [], { resistance: new Resistance(100) });
        expect(element.properties.resistance.value).toBe(100);
    });

    test('An element should support editable properties', () => {
        const element = new MockElement('E3', [], { resistance: new Resistance(100) });
        element.properties.resistance = new Resistance(200);
        expect(element.properties.resistance.value).toBe(200);
    });

    test('An element should be abstract and not directly instantiable', () => {
        expect(() => new Element('E4', [])).toThrow('Cannot instantiate abstract class Element directly.');
    });

    test('An element should support multiple properties', () => {
        const element = new MockElement('E5', [], { resistance: new Resistance(100), capacitance: 0.01 });
        expect(element.properties.resistance.value).toBe(100);
        expect(element.properties.capacitance).toBe(0.01);
    });

    test('An element should use value objects for shared properties', () => {
        const position = new Position(10, 20);
        const element = new MockElement('E6', [{ name: 'A', position }]);
        expect(element.terminals[0].position.equals(position)).toBe(true);
    });

    test('The position of an element should depend on its terminals', () => {
        const position1 = new Position(10, 20);
        const position2 = new Position(30, 40);
        const element = new MockElement('E7', [
            { name: 'A', position: position1 },
            { name: 'B', position: position2 },
        ]);
        expect(element.terminals.length).toBe(2);
        expect(element.terminals[0].position.equals(position1)).toBe(true);
        expect(element.terminals[1].position.equals(position2)).toBe(true);
    });

    test('An element should support labeling', () => {
        const element = new MockElement('E8', [], {}, 'Test Label');
        expect(element.label).toBe('Test Label');
    });

    test('A junction should be a valid element', () => {
        const junction = new MockElement('J1', [
            { name: 'T1', position: new Position(10, 20) },
            { name: 'T2', position: new Position(30, 40) },
            { name: 'T3', position: new Position(50, 60) },
        ]);
        expect(junction.type).toBe('mock');
        expect(junction.terminals.length).toBe(3);
    });
});
