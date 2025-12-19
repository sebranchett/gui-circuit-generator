import { initializeCircuitApp, injectStyles, createCircuitDOM } from './common.js';

// Inject styles first
injectStyles();

// Create DOM structure
const { stage, canvas, controls } = createCircuitDOM();

// Initialize the circuit application
const { circuit, circuitService, guiAdapter } = await initializeCircuitApp(stage, canvas, controls);
