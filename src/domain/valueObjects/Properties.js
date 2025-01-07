/**
 * A container for element-specific properties.
 */
export class Properties {
    /**
     * Creates a properties container.
     * 
     * @param {Object} values - An object containing the value objects for the properties.
     */
    constructor(values = {}) {
        if (typeof values !== 'object') {
            throw new Error("Properties must be an object.");
        }

        this.values = values; // Store value objects (e.g., Resistance, Capacitance)
    }

    /**
     * Describes the properties in the container.
     * 
     * @returns {string} A string description of the properties.
     */
    describe() {
        return Object.entries(this.values)
            .map(([key, value]) => `${key}: ${value.toString()}`)
            .join(', ');
    }
}
