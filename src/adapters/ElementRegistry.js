export const ElementRegistry = {
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
    }
};
