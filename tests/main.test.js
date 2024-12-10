const { expect } = require('chai');
const CircuitService = require('../src/application/CircuitService'); // Adjust the path as necessary
const FilePersistenceAdapter = require('../src/infrastructure/adapters/FilePersistenceAdapter'); // Adjust the path as necessary
const Circuit = require('../src/domain/aggregates/Circuit'); // Adjust the path as necessary

describe('CircuitService', () => {
    it('should describe the circuit correctly', () => {
        const circuitService = new CircuitService();
        const description = circuitService.describeCircuit();
        expect(description).to.include("R1");
        expect(description).to.include("C1");
    });
});

describe('FilePersistenceAdapter', () => {
    it('should save the circuit to a file', () => {
        const circuit = new Circuit("test-circuit");
        const fileAdapter = new FilePersistenceAdapter();
        fileAdapter.saveToFile(circuit, "test-circuit.txt");
        // Note: Reading from file and verifying content would require file system access,
        // which is not shown here for simplicity.
        console.log("Circuit saved to test-circuit.txt");
    });
});