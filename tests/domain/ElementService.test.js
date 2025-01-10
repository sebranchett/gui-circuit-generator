import { expect } from 'chai';
import { ElementService } from '../../src/application/ElementService.js';
import { MockElement } from './MockElement.js'; // A mock element class for testing
import { Position } from '../../src/domain/valueObjects/Position.js';
import { Properties } from '../../src/domain/valueObjects/Properties.js';
import { Label } from '../../src/domain/valueObjects/Label.js';

describe('Element Service Tests', () => {
    describe('Element Rotation', () => {
        it('should rotate an element by 90 degrees', () => {
            const nodes = [new Position(10, 10), new Position(20, 10)];
            const element = new MockElement('E7', nodes, null, new Properties());

            ElementService.rotate(element, 90);

            expect(element.nodes).to.deep.equal([
                new Position(10, 10), // Reference node remains unchanged
                new Position(10, 20), // Rotated position
            ]);
        });

        it('should rotate an element by 180 degrees', () => {
            const nodes = [new Position(10, 10), new Position(20, 10)];
            const element = new MockElement('E8', nodes, null, new Properties());

            ElementService.rotate(element, 180);

            expect(element.nodes).to.deep.equal([
                new Position(10, 10), // Reference node remains unchanged
                new Position(0, 10), // Rotated position
            ]);
        });

        it('should throw an error for invalid rotation angles', () => {
            const nodes = [new Position(10, 10), new Position(20, 10)];
            const element = new MockElement('E9', nodes, null, new Properties());

            expect(() => ElementService.rotate(element, 45)).to.throw(
                "Orientation must be one of 0, 90, 180, or 270 degrees."
            );
        });
    });

    describe('Element State Updates', () => {
        it('should update properties through ElementService', () => {
            const nodes = [new Position(10, 20)];
            const properties = new Properties({ resistance: 100 });
            const element = new MockElement('E2', nodes, null, properties);
    
            // Update the property to a new float value
            ElementService.updateProperties(element, { resistance: 200 });
    
            expect(element.properties.values.resistance).to.equal(200);
        });

        it('should allow defining a property as undefined', () => {
            const nodes = [new Position(10, 20)];
            const properties = new Properties({ resistance: 100 });
            const element = new MockElement('E1', nodes, null, properties);
    
            // Update the property to undefined
            ElementService.updateProperties(element, { resistance: "undefined" });
    
            expect(element.properties.values.resistance).to.equal("undefined");
        });
    
        it('should allow defining properties as a variable parameter for the simulation engine', () => {
            const nodes = [new Position(10, 20)];
            const properties = new Properties({ resistance: 100 });
            const element = new MockElement('E3', nodes, null, properties);
    
            // Define the property as "variable"
            ElementService.updateProperties(element, { resistance: "variable" });
    
            expect(element.properties.values.resistance).to.equal("variable");
        });

        it('should update the label of an element', () => {
            const nodes = [new Position(10, 20)];
            const element = new MockElement('E4', nodes, new Label('Old Label'), new Properties());

            // Update the label
            ElementService.updateLabel(element, new Label('New Label'));

            expect(element.label.toString()).to.equal('New Label');
        });
    });

    describe('Element Movement', () => {
        it('should move an element successfully', () => {
            const nodes = [new Position(10, 20), new Position(30, 40)];
            const element = new MockElement('E5', nodes, null, new Properties());
    
            ElementService.move(element, new Position(20, 30));
    
            expect(element.nodes).to.deep.equal([
                new Position(20, 30),
                new Position(40, 50),
            ]);
        });
    
        it('should not change nodes if moved to the same position', () => {
            const nodes = [new Position(10, 20), new Position(30, 40)];
            const element = new MockElement('E6', nodes, null, new Properties());
    
            ElementService.move(element, new Position(10, 20));
    
            expect(element.nodes).to.deep.equal(nodes);
        });
    });
    
});