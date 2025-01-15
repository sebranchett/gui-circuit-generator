export class WireComponent {
    /**
     * Creates a WireComponent instance.
     * @param {CircuitService} circuitService - The service managing circuit logic.
     */
    constructor(circuitService) {
        this.circuitService = circuitService;
    }

    /**
     * Adds a wire to the circuit.
     */
    addWire() {
        console.log('Adding wire...');
        const wire = this.circuitService.createElement('Wire', {
            id: `W${Date.now()}`,
            nodes: [
                { x: 150, y: 150 }, // Start position
                { x: 250, y: 150 }  // End position
            ]
        });

        this.circuitService.addElement(wire);
    }
}
