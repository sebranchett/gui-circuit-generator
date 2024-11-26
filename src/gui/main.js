import { Circuit } from "../domain/aggregates/Circuit.js";
import { CircuitService } from "../application/CircuitService.js";
import { FilePersistenceAdapter } from "../infrastructure/adapters/FilePersistenceAdapter.js";
import { Resistor } from "../domain/entities/Resistor.js";

const circuit = new Circuit("circuit-1");
const circuitService = new CircuitService(circuit);
const fileAdapter = new FilePersistenceAdapter();

// Add elements
circuitService.addResistor("R1", { x: 10, y: 20 }, 100);
circuitService.addCapacitor("C1", { x: 30, y: 40 }, 0.01);

// Connect elements
circuitService.connectElements("R1", "C1");

// Describe circuit
console.log("Circuit Description:");
console.log(circuitService.describeCircuit());

// Save circuit to file
fileAdapter.saveToFile(circuit, "circuit.txt");
console.log("Circuit saved to circuit.txt");
