import { Circuit } from "../domain/aggregates/Circuit.js";
import { CircuitService } from "../application/CircuitService.js";
import { GUIAdapter } from "./adapters/GUIAdapter.js";
import {
  ElementRegistry,
  rendererFactory,
  GUICommandRegistry,
  setupCommands
} from "../config/settings.js";
import { initMenu } from "./menu/initMenu.js";
import { Logger } from "../utils/Logger.js";
import { globalPerformanceMonitor } from "../utils/PerformanceUtils.js";

/* ---------- DOM Creation ---------- */
export function createCircuitDOM() {
  // Create main structure
  const stage = document.createElement('div');
  stage.className = 'circuit-stage';

  const menubar = document.createElement('div');
  menubar.className = 'menubar controls';
  menubar.id = 'menubar';

  const canvasContainer = document.createElement('div');
  canvasContainer.className = 'canvas-container';

  const canvas = document.createElement('canvas');
  canvas.id = 'circuitCanvas';

  // Assemble structure
  canvasContainer.appendChild(canvas);
  stage.appendChild(menubar);
  stage.appendChild(canvasContainer);

  const controls = null; // controls no longer used in this layout

  // Return references
  return { stage, canvas, controls };
}

/* ---------- Style Injection ---------- */
export function createStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Main layout styling */
    .controls {
      margin-top: 10px;
    }

    /* Ensure body and html have clean defaults */
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }

    /* Circuit stage - main container */
    .circuit-stage {
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* Menu bar - fixed at top, no scrolling */
    .menubar {
      flex-shrink: 0;
      background: white;
      border-bottom: 1px solid #e0e0e0;
      z-index: 1000;
    }

    /* Canvas container - this is where scrollbars should appear */
    .canvas-container {
      flex: 1;
      overflow: auto;
      position: relative;
      border: 1px solid #ccc;
      height: 100%;
      min-height: 0;
    }

    /* Canvas styling */
    #circuitCanvas {
      display: block;
      width: max(100%, 2400px);
      height: max(100%, 1600px);
      min-width: 2400px;
      min-height: 1600px;
      max-width: none;
      max-height: none;
      border: none;
    }

    /* CLEAN SCROLLBAR STYLING */
    .canvas-container::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background: transparent;
    }

    .canvas-container::-webkit-scrollbar-track {
      background: transparent;
    }

    .canvas-container::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 3px;
      border: none;
    }

    .canvas-container::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.5);
    }

    /* Test button styling - remove in production */
    .debug-button {
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 9999;
      padding: 8px 12px;
      background: #007AFF;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .debug-button:hover {
      background: #0056CC;
    }

    .debug-button:active {
      background: #004499;
    }

    /* Reserve layout, but keep pixels hidden until ready */
    #circuitCanvas {
      opacity: 0;
      transition: opacity 120ms ease;
    }

    .circuit-stage.ready #circuitCanvas {
      opacity: 1;
    }
  `;
  return style;
}

/* ---------- HiDPI helpers ---------- */
function fitCanvasHiDPIOnce(canvas){
  const dpr  = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();   // CSS size
  const cssW = Math.max(1, Math.round(rect.width));
  const cssH = Math.max(1, Math.round(rect.height));
  canvas.width  = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
}

function setupHiDPICanvas(canvas, onResize) {
  const ctx = canvas.getContext('2d');
  const resize = () => {
    const dpr  = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const cssW = Math.max(1, Math.round(rect.width));
    const cssH = Math.max(1, Math.round(rect.height));
    const pxW = Math.round(cssW * dpr);
    const pxH = Math.round(cssH * dpr);
    if (canvas.width !== pxW || canvas.height !== pxH) {
      canvas.width = pxW; canvas.height = pxH;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      onResize?.();
    }
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  window.addEventListener('resize', resize, { passive: true });
  resize(); // initial (will be no-op because we already pre-fit once)
  return () => { ro.disconnect(); window.removeEventListener('resize', resize); };
}

/**
 * Initialize the circuit application with provided DOM elements
 * @param {HTMLElement} stage - The circuit stage container
 * @param {HTMLCanvasElement} canvas - The canvas element for rendering
 * @param {HTMLElement} controls - The controls container (optional)
 */
export async function initializeCircuitApp(stage, canvas, controls) {
  /* ---------- Pre-fit BEFORE any render ---------- */
  fitCanvasHiDPIOnce(canvas);

  /* ---------- Services & GUI ---------- */
  const circuit = new Circuit();
  const circuitService = new CircuitService(circuit, ElementRegistry);
  const guiAdapter = new GUIAdapter(
    controls, canvas, circuitService, ElementRegistry, rendererFactory, GUICommandRegistry
  );

  /* ---------- Menu (emits ui:action only) ---------- */
  await initMenu();

  /* ---------- Commands, first render, reveal, THEN start resize observer ---------- */
  globalPerformanceMonitor.startTiming('app-initialization');

  setupCommands(circuitService, guiAdapter.circuitRenderer);
  guiAdapter.initialize();                  // this will call first render
  setupHiDPICanvas(canvas, () => {
      guiAdapter.circuitRenderer.reCenter(); // Re-center after canvas resize
      guiAdapter.circuitRenderer.centerScrollPosition(); // Center scroll position after resize
      guiAdapter.circuitRenderer.render();
  });
  // Center the coordinates and scroll position after the HiDPI canvas is set up
  guiAdapter.circuitRenderer.reCenter();
  guiAdapter.circuitRenderer.centerScrollPosition();
  stage.classList.add('ready');             // fade in only after crisp render

  const initTime = globalPerformanceMonitor.endTiming('app-initialization');

  // Add performance monitoring for development
  if (Logger.isDev) {
    // Monitor for slow operations
    const originalRender = guiAdapter.circuitRenderer.render;
    let renderCount = 0;
    
    guiAdapter.circuitRenderer.render = function() {
      renderCount++;
      const start = performance.now();
      const result = originalRender.apply(this, arguments);
      const duration = performance.now() - start;
      
      if (duration > 16) { // Slower than 60fps
        Logger.warn(`Slow render #${renderCount}: ${duration.toFixed(2)}ms`);
      }
      
      return result;
    };
  }
  
  return { circuit, circuitService, guiAdapter };
}
