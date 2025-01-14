import { Resistor } from '../domain/entities/Resistor.js';
import { Wire } from '../domain/entities/Wire.js';

export const ElementRegistry = {
    Resistor: (id, nodes, properties) => new Resistor(id, nodes, properties),
    Wire: (id, nodes, properties) => new Wire(id, nodes, properties),

    /**
     * Registers a new element type.
     * @param {string} type - The name of the element type.
     * @param {Function} factoryFunction - The factory function for creating the element.
     */
    register(type, factoryFunction) {
        if (this[type]) {
            throw new Error(`Element type "${type}" is already registered.`);
        }
        this[type] = factoryFunction;
    },

    /**
     * Creates an element using the registered factory functions.
     * @param {string} type - The type of element to create.
     * @param {string} id - The unique ID of the element.
     * @param {Array} nodes - The nodes for the element.
     * @param {Object} properties - The properties for the element.
     * @returns {Object} The created element.
     * @throws {Error} If the type is not registered.
     */
    create(type, id, nodes, properties) {
        if (!this[type]) {
            throw new Error(`Element type "${type}" is not registered.`);
        }
        return this[type](id, nodes, properties);
    },
};
