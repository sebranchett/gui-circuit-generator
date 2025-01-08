import { expect } from 'chai';
import { ElementService } from '../../src/application/ElementService.js';
import { MockElement } from './MockElement.js'; // A mock element class for testing
import { Position } from '../../src/domain/valueObjects/Position.js';
import { Properties } from '../../src/domain/valueObjects/Properties.js';
import { Label } from '../../src/domain/valueObjects/Label.js';

describe('Element Service Tests', () => {
    describe('Element Creation', () => {
        it('should create an element successfully', () => {
            const terminals = [new Position(10, 20), new Position(30, 40)];
            const properties = new Properties({ resistance: 100 });
            const element = ElementService.createElement(MockElement, 'E1', terminals, [null, properties]);

            expect(element).to.be.instanceOf(MockElement);
            expect(element.id).to.equal('E1');
            expect(element.terminals).to.deep.equal(terminals);
            expect(element.properties).to.equal(properties);
        });

        it('should throw an error if creation inputs are invalid', () => {
            expect(() => ElementService.createElement(MockElement, 'E2', [10, 20], [null, new Properties()])).to.throw(
                "Terminals must be an array of Position instances."
            );
        });
    });

    describe('Element Deletion', () => {
        it('should delete an element successfully', () => {
            const terminals = [new Position(10, 20)];
            const properties = new Properties();
            const element = new MockElement('E3', terminals, null, properties);

            let elements = [element];
            elements = ElementService.deleteElement(elements, 'E3');

            expect(elements).to.be.an('array').that.is.empty;
        });

        it('should do nothing when deleting a non-existent element', () => {
            const terminals = [new Position(10, 20)];
            const properties = new Properties();
            const element = new MockElement('E4', terminals, null, properties);

            let elements = [element];
            elements = ElementService.deleteElement(elements, 'NonExistentID');

            expect(elements).to.have.lengthOf(1);
            expect(elements[0].id).to.equal('E4');
        });
    });

    describe('Element Movement', () => {
        it('should move an element successfully', () => {
            const terminals = [new Position(10, 20), new Position(30, 40)];
            const element = new MockElement('E5', terminals, null, new Properties());

            ElementService.moveElement(element, new Position(20, 30));

            expect(element.terminals).to.deep.equal([
                new Position(20, 30),
                new Position(40, 50),
            ]);
        });

        it('should not change terminals if moved to the same position', () => {
            const terminals = [new Position(10, 20), new Position(30, 40)];
            const element = new MockElement('E6', terminals, null, new Properties());

            ElementService.moveElement(element, new Position(10, 20));

            expect(element.terminals).to.deep.equal(terminals);
        });
    });

    describe('Element Rotation', () => {
        it('should rotate an element by 90 degrees', () => {
            const terminals = [new Position(10, 10), new Position(20, 10)];
            const element = new MockElement('E7', terminals, null, new Properties());

            ElementService.rotateElement(element, 90);

            expect(element.terminals).to.deep.equal([
                new Position(10, 10), // Reference terminal remains unchanged
                new Position(10, 20), // Rotated position
            ]);
        });

        it('should rotate an element by 180 degrees', () => {
            const terminals = [new Position(10, 10), new Position(20, 10)];
            const element = new MockElement('E8', terminals, null, new Properties());

            ElementService.rotateElement(element, 180);

            expect(element.terminals).to.deep.equal([
                new Position(10, 10), // Reference terminal remains unchanged
                new Position(0, 10), // Rotated position
            ]);
        });

        it('should throw an error for invalid rotation angles', () => {
            const terminals = [new Position(10, 10), new Position(20, 10)];
            const element = new MockElement('E9', terminals, null, new Properties());

            expect(() => ElementService.rotateElement(element, 45)).to.throw(
                "Orientation must be one of 0, 90, 180, or 270 degrees."
            );
        });
    });
});