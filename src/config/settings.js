import { ElementRegistry } from '../adapters/ElementRegistry.js';
import { generateId } from '../utils/idGenerator.js';
import { Resistor } from '../domain/entities/Resistor.js';
import { Wire } from '../domain/entities/Wire.js';
import { Properties } from '../domain/valueObjects/Properties.js';
import { Label } from '../domain/valueObjects/Label.js';

// Register Resistor
ElementRegistry.register('Resistor', (id = generateId('R'), nodes, label = null, properties = {}) => 
    new Resistor(id, nodes, label = null , new Properties(properties))
);

// Register Wire
ElementRegistry.register('Wire', (id = generateId('W'), nodes, label = null, properties = {}) => 
    new Wire(id, nodes, label = null , new Properties(properties))
);

export default ElementRegistry;
