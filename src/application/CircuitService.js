import { Resistor } from '../domain/entities/Resistor.js';
import { Capacitor } from '../domain/entities/Capacitor.js';

class CircuitService {
    constructor(circuit) {
        this.circuit = circuit;
    }

    addResistor(id, position, resistance) {
        const resistor = new Resistor(id, position, resistance);
        this.circuit.addElement(resistor);
    }

    addCapacitor(id, position, capacitance) {
        const capacitor = new Capacitor(id, position, capacitance);
        this.circuit.addElement(capacitor);
    }

    connectElements(id1, id2) {
        this.circuit.connectElements(id1, id2);
    }

    describeCircuit() {
        return this.circuit.describe();
    }
}

export { CircuitService };