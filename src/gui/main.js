import { initializeCircuitApp, injectStyles } from './common.js';

// Inject styles first
injectStyles();

const stage = document.querySelector('.circuit-stage');
const canvas = document.getElementById('circuitCanvas');
const controls = document.querySelector('.controls');

const { circuit, circuitService, guiAdapter } = await initializeCircuitApp(stage, canvas, controls);