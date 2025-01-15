import { Circuit } from '../domain/aggregates/Circuit.js';
import { Element } from '../domain/entities/Element.js';
import { generateId } from '../utils/idGenerator.js'; // Import the ID generator


/**
 * CircuitService orchestrates operations on the Circuit aggregate,
 * ensuring high-level use cases like adding, deleting, and connecting elements
 * while delegating validation and low-level operations to the Circuit aggregate.
 */
export class CircuitService {
    /**
     * Constructs a new CircuitService.
     * 
     * @param {Circuit} circuit - The circuit aggregate to manage.
     */
    constructor(circuit) {
        /**
         * The circuit aggregate representing the current circuit design.
         * @type {Circuit}
         */
        this.circuit = circuit;
    }

    /**
     * Adds an element to the circuit after validation.
     * 
     * Delegates validation to the Circuit aggregate to ensure that the element
     * adheres to all circuit-level rules, such as uniqueness of element ID and
     * non-conflicting node positions.
     * 
     * @param {Element} element - The element to add.
     * @throws {Error} If the element violates circuit rules.
     */
    addElement(element) {
        // Generate an ID if the element does not already have one
        if (!element.id) {
            const prefix = element.type.charAt(0).toUpperCase(); // e.g., "R" for Resistor
            element.id = generateId(prefix);
        }
    
        this.circuit.validateAddElement(element); // Delegate validation to Circuit
        this.circuit.elements.push(element); // Add the element to the circuit
    }

    /**
     * Deletes an element from the circuit.
     * 
     * Removes the element from the list of elements and updates any connections
     * involving the deleted element.
     * 
     * @param {string} elementId - The unique ID of the element to delete.
     */
    deleteElement(elementId) {
        // Remove the element from the circuit
        this.circuit.elements = this.circuit.elements.filter(el => el.id !== elementId);

        // Update connections after deletion
        for (const [key, connectedElements] of this.circuit.connections.entries()) {
            const updatedConnections = connectedElements.filter(el => el.id !== elementId);
            if (updatedConnections.length === 0) {
                this.circuit.connections.delete(key); // Remove empty connections
            } else {
                this.circuit.connections.set(key, updatedConnections); // Update connections
            }
        }
    }

    /**
     * Connects two elements in the circuit if the connection is valid.
     * 
     * Delegates validation to the Circuit aggregate and establishes the connection
     * if the rules are met.
     * 
     * @param {Element} element1 - The first element to connect.
     * @param {Element} element2 - The second element to connect.
     * @throws {Error} If the connection violates circuit rules.
     */
    connectElements(element1, element2) {
        this.circuit.validateConnection(element1, element2); // Delegate to Circuit
    }

    /**
     * Finds all elements connected to a given element.
     * 
     * Searches through the circuit's connections map to identify and return
     * all elements that share a connection with the specified element.
     * 
     * @param {Element} element - The element whose connections to find.
     * @returns {Element[]} List of connected elements.
     */
    findConnections(element) {
        const connectedElements = [];
        for (const [key, elements] of this.circuit.connections.entries()) {
            if (elements.includes(element)) {
                connectedElements.push(...elements.filter(el => el !== element));
            }
        }
        return connectedElements;
    }

    /**
     * Retrieves all elements in the circuit.
     * 
     * This is a simple delegate method to provide read-only access
     * to the elements of the circuit aggregate.
     * 
     * @returns {Element[]} The list of elements in the circuit.
     */
    getElements() {
        return [...this.circuit.elements]; // Return a shallow copy to avoid direct modification
    }
}