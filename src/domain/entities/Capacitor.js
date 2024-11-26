import { Element } from "./Element.js";

export class Capacitor extends Element  {
    constructor(id, position, capacitance) {
        super(id, position);
        this.capacitance = capacitance; // Capacitance in Farads
    }

    describe() {
        return `Capacitor ${this.id} at (${this.position.x}, ${this.position.y}) with capacitance ${this.capacitance}F`;
    }
}
