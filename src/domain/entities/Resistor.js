// src/domain/entities/Resistor.js
export class Resistor {
    constructor(id, position, resistance) {
        this.id = id;
        this.type = 'resistor'; // Used for rendering or logic
        this.position = position; // Position value object
        this.resistance = resistance; // Resistance value object
    }
}
