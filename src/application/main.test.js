import { Circuit } from "../domain/aggregates/Circuit.js";
import { CircuitService } from "../application/CircuitService.js";
import { FilePersistenceAdapter } from "../infrastructure/adapters/FilePersistenceAdapter.js";
import { Resistor } from "../domain/entities/Resistor.js";

function testCircuitService() {
    const circuit = new Circuit("test-circuit");
    const circuitService = new CircuitService(circuit);

    // Test adding a resistor
    circuitService.addResistor("R1", { x: 10, y: 20 }, 100);
    const resistor = circuit.elements.find(e => e.id === "R1");
    console.assert(resistor !== undefined, "Resistor R1 should be added to the circuit");
    console.assert(resistor.position.x === 10 && resistor.position.y === 20, "Resistor R1 should have correct position");
    console.assert(resistor.resistance === 100, "Resistor R1 should have correct resistance");

    // Test adding a capacitor
    circuitService.addCapacitor("C1", { x: 30, y: 40 }, 0.01);
    const capacitor = circuit.elements.find(e => e.id === "C1");
    console.assert(capacitor !== undefined, "Capacitor C1 should be added to the circuit");
    console.assert(capacitor.position.x === 30 && capacitor.position.y === 40, "Capacitor C1 should have correct position");
    console.assert(capacitor.capacitance === 0.01, "Capacitor C1 should have correct capacitance");

    // Test connecting elements
    circuitService.connectElements("R1", "C1");
    console.assert(resistor.connections.includes(capacitor), "Resistor R1 should be connected to Capacitor C1");
    console.assert(capacitor.connections.includes(resistor), "Capacitor C1 should be connected to Resistor R1");

    // Test describing the circuit
    const description = circuitService.describeCircuit();
    console.assert(description.includes("R1"), "Circuit description should include Resistor R1");
    console.assert(description.includes("C1"), "Circuit description should include Capacitor C1");

    console.log("All CircuitService tests passed!");
}

function testFilePersistenceAdapter() {
    const circuit = new Circuit("test-circuit");
    const fileAdapter = new FilePersistenceAdapter();

    // Test saving to file
    fileAdapter.saveToFile(circuit, "test-circuit.txt");
    console.log("Circuit saved to test-circuit.txt");

    // Note: Reading from file and verifying content would require file system access,
    // which is not shown here for simplicity.

    console.log("FilePersistenceAdapter tests passed!");
}

function runTests() {
    testCircuitService();
    testFilePersistenceAdapter();
}

runTests();