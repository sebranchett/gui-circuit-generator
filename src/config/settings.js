import { ElementRegistry } from '../domain/factories/ElementRegistry.js';
import { RendererFactory } from '../gui/renderers/RendererFactory.js';
import { Resistor } from '../domain/entities/Resistor.js';
import { Wire } from '../domain/entities/Wire.js';
import { ResistorRenderer } from '../gui/renderers/ResistorRenderer.js';
import { WireRenderer } from '../gui/renderers/WireRenderer.js';
import { generateId } from '../utils/idGenerator.js';
import { Properties } from '../domain/valueObjects/Properties.js';

// Ensure elements are registered once
if (ElementRegistry.getTypes().length === 0) {
    console.log(" Registering elements in ElementRegistry...");

    ElementRegistry.register('Resistor', (id = generateId('R'), nodes, label = null, properties = {}) =>
        new Resistor(id, nodes, label, new Properties(properties))
    );
    ElementRegistry.register('Wire', (id = generateId('W'), nodes, label = null, properties = {}) =>
        new Wire(id, nodes, label, new Properties(properties))
    );
}

console.log(" ElementRegistry after registration:", ElementRegistry.getTypes());

// Configure RendererFactory
const rendererFactory = new RendererFactory();
rendererFactory.register('resistor', ResistorRenderer);
rendererFactory.register('wire', WireRenderer);

export { ElementRegistry, rendererFactory };
export default ElementRegistry; // Add default export
