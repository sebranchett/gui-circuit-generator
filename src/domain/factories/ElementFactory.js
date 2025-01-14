/**
 * A factory class responsible for creating instances of various element types.
 * This class provides a centralized way to register and create elements based
 * on their type, ensuring decoupled and flexible creation logic.
 */
export class ElementFactory {
    /**
     * Constructs a new instance of the ElementFactory.
     * Initializes an empty registry for storing element type mappings.
     */
    constructor() {
        /**
         * A registry for storing mappings of element types to their corresponding classes.
         * @type {Object.<string, Function>}
         */
        this.registry = {};
    }

    /**
     * Registers an element type with the factory.
     * Associates a string identifier (type) with a specific element class (constructor).
     *
     * @param {string} type - The string identifier for the element type (e.g., "Resistor", "Junction").
     * @param {Function} ElementClass - The constructor function for the element type.
     */
    register(type, ElementClass) {
        this.registry[type] = ElementClass;
    }

    /**
     * Creates a new instance of an element based on the specified type.
     * Retrieves the appropriate constructor from the registry and instantiates the element.
     *
     * @param {string} type - The type of the element to create (must be registered).
     * @param {string} id - The unique identifier for the new element.
     * @param {Position[]} nodes - An array of terminal positions for the element.
     * @param {Object[]} propertiesArgs - Additional arguments for initializing the element's properties.
     * @returns {Object} - An instance of the requested element type.
     * @throws {Error} - If the specified type is not registered in the factory.
     */
    create(type, id, nodes, propertiesArgs) {
        // Retrieve the constructor for the requested element type
        const ElementClass = this.registry[type];

        // Throw an error if the type is not registered
        if (!ElementClass) {
            throw new Error(`Element type "${type}" is not registered.`);
        }

        // Create and return a new instance of the requested element
        return new ElementClass(id, nodes, ...propertiesArgs);
    }
}
