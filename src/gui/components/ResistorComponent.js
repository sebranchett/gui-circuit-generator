export class ResistorComponent {
    /**
     * Creates a ResistorComponent instance.
     * @param {CircuitService} circuitService - The service managing circuit logic.
     */
    constructor(circuitService) {
        this.circuitService = circuitService;
    }

    /**
     * Adds a resistor to the circuit.
     */
    addResistor() {
        console.log('Adding resistor...');
        const resistor = this.circuitService.createElement('Resistor', {
            nodes: [
                { x: 100, y: 100 }, // Start position
                { x: 200, y: 100 }  // End position
            ],
            properties: { resistance: 100 }
        });

        this.circuitService.addElement(resistor);
    }
}
