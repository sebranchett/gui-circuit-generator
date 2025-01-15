import { Circuit } from '../domain/aggregates/Circuit.js';
import { CircuitService } from '../application/CircuitService.js';
import { GUIAdapter } from './adapters/GUIAdapter.js';
import ElementRegistry  from '../config/settings.js'; // Assuming ElementRegistry is configured in settings.js

// Set up the circuit and services
const circuit = new Circuit();
const circuitService = new CircuitService(circuit, ElementRegistry);

// Get the canvas from the DOM
const canvas = document.getElementById('circuitCanvas');

// Create and initialize the GUI Adapter
const guiAdapter = new GUIAdapter(canvas, circuitService);
guiAdapter.initialize();
