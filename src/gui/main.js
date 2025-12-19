import { initializeCircuitApp, createStyles, createCircuitDOM } from './common.js';

// Inject styles first
const style = createStyles();
document.body.appendChild(style);

// Create DOM structure
const { stage, canvas, controls } = createCircuitDOM();
document.body.appendChild(stage);

// Initialize the circuit application
await initializeCircuitApp(stage, canvas, controls);
