import { Circuit } from '../domain/aggregates/Circuit.js';
import { CircuitService } from '../application/CircuitService.js';
import { GUIAdapter } from './adapters/GUIAdapter.js';
import { ElementRegistry, rendererFactory, GUICommandRegistry  }   from '../config/settings.js'; // Assuming ElementRegistry is configured in settings.js
// import document from 'document'; // Assuming document is a global object

// Set up the circuit and services
const circuit = new Circuit();
const circuitService = new CircuitService(circuit, ElementRegistry);

console.log('ElementRegistry:', ElementRegistry);
console.log('rendererFactory:', rendererFactory);
console.log('GUICommandRegistry:', GUICommandRegistry);

// Get the canvas from the DOM
const canvas = document.getElementById('circuitCanvas');
console.log('Canvas:', canvas);

// Create and initialize the GUI Adapter
const guiAdapter = new GUIAdapter(canvas, circuitService, ElementRegistry, rendererFactory, GUICommandRegistry);
guiAdapter.initialize();
