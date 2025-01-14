// src/config/settings.js
import { ElementRegistry } from '../adapters/ElementRegistry.js';
import { Resistor } from '../domain/entities/Resistor.js';
import { Wire } from '../domain/entities/Wire.js';

// Instantiate the registry
const elementRegistry = new ElementRegistry();

// Register elements
elementRegistry.register('Resistor', (id, nodes, properties) => new Resistor(id, nodes, properties));
elementRegistry.register('Wire', (id, nodes, properties) => new Wire(id, nodes, properties));

export default elementRegistry;
