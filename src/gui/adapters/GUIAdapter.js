/**
 * @class GUIAdapter
 * @description
 * The `GUIAdapter` serves as the bridge between the user interface (UI) and the underlying application logic.
 * It coordinates user interactions, circuit rendering, and dynamic element creation by utilizing the application and domain layers.
 *
 * **Core Concepts**:
 * - **Events**: User actions, such as clicks, trigger events that the GUI reacts to by executing specific handlers.
 * - **Event Listeners**: Functions attached to UI elements (e.g., buttons) that execute when a specific event occurs.
 * - **Dynamic Behavior**: By leveraging the `ElementRegistry`, the GUI can adapt to new circuit element types without hardcoding logic for each type.
 * - **Separation of Concerns**: The class ensures a clear distinction between UI, business logic (`CircuitService`), and rendering (`CircuitRenderer`).
 *
 * **Responsibilities**:
 * 1. **Initialization**:
 *    - Sets up the rendering system and binds UI controls to ensure user interactions are connected to application logic.
 * 2. **Dynamic Element Creation**:
 *    - Dynamically detects circuit element types from the `ElementRegistry` and binds corresponding buttons in the UI to create those elements.
 *    - This approach ensures flexibility and extensibility, allowing new element types to be added with minimal changes.
 * 3. **UI Interaction Binding**:
 *    - Attaches event listeners to UI buttons (e.g., `addResistor`, `addWire`) to enable dynamic user interactions.
 *    - Listeners trigger the creation of circuit elements, which are then added to the circuit and rendered on the canvas.
 * 4. **Rendering**:
 *    - Ensures that the current state of the circuit is visually represented on the canvas after every user interaction.
 *
 * **Key Concepts**:
 * - **Event Propagation**: Events in the DOM propagate in two phases: capturing (downward) and bubbling (upward).
 * - **Extensibility**: New circuit element types can be added easily by updating the `ElementRegistry` and adding corresponding buttons to the UI.
 * - **Reactivity**: The `GUIAdapter` ensures the UI reacts in real-time to user actions, synchronizing the application's state with its visual representation.
 *
 * **Example Workflow**:
 * 1. A user clicks the "Add Resistor" button.
 * 2. The `click` event triggers an event listener registered by `GUIAdapter`.
 * 3. The listener creates a new `Resistor` element with random positions, adds it to the circuit via `CircuitService`, and updates the canvas via `CircuitRenderer`.
 *
 * **Benefits**:
 * - **Decoupled Architecture**: Isolates UI logic from business and rendering logic, improving maintainability and testability.
 * - **Dynamic and Flexible**: Supports dynamic addition of new circuit element types with minimal effort.
 *
 * @example
 * const guiAdapter = new GUIAdapter(canvas, circuitService, elementRegistry);
 * guiAdapter.initialize();
 */

import { Position } from '../../domain/valueObjects/Position.js';
import { Circuit } from '../../domain/aggregates/Circuit.js';
import { CircuitService } from '../../application/CircuitService.js';
import { CircuitRenderer } from '../components/CircuitRenderer.js';
import ElementRegistry from '../../config/settings.js';

export class GUIAdapter {
    /**
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering the circuit.
     */
    constructor(canvas, circuitService, elementRegistry) {
        this.canvas = canvas;
        this.circuitService = circuitService;
        this.circuitRenderer = new CircuitRenderer(canvas, circuitService);
        this.elementRegistry = elementRegistry || {};
    }    

    /**
     * Dynamically binds UI controls to their corresponding actions based on the `ElementRegistry` (e.g., "addResistor", "addWire").
     */
    bindUIControls() {
        if (this.controlsBound) {
            console.warn('UI controls already bound. Skipping.');
            return;
        }
        this.controlsBound = true;
    
        Object.keys(ElementRegistry)
        .filter((key) => typeof ElementRegistry[key] === 'function' && !['register', 'create'].includes(key))
        .forEach((type) => {
            const buttonId = `add${type}`;
            const button = document.getElementById(buttonId);
    
            if (!button) {
                console.warn(`Button with ID "${buttonId}" not found.`);
                return;
            }
    
            button.addEventListener('click', () => {
                const properties = {}; // Placeholder for element properties
                const nodes = [this.randomPosition(), this.randomPosition()];
    
                // Create and add the element using CircuitService
                this.circuitService.addElement({ type, properties, nodes });
    
                // Render the updated circuit
                this.circuitRenderer.render();
            });
        });
    }
            
    /**
     * Generates a random position for testing purposes.
     * @returns {Position} A random Position instance.
     */
    randomPosition() {
            const x = Math.floor(Math.random() * this.canvas.width);
            const y = Math.floor(Math.random() * this.canvas.height);
            return new Position(x, y); // Return an instance of Position
    }

    /**
     * Initializes the GUI by rendering the circuit and binding UI controls.
     */
    initialize() {
        // Initial rendering
        this.circuitRenderer.render();

        // Bind UI controls to actions
        this.bindUIControls();
    }
}
