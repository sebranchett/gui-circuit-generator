/**
 * @class CircuitRenderer
 * @description
 * Responsible for rendering a circuit on the provided canvas, using specific renderers for each element type.
 * The class relies on the `RendererFactory` to create and manage renderers dynamically, ensuring a clean and
 * scalable approach to adding new element types.
 *
 * **Core Responsibilities**:
 * - Manage rendering logic for the circuit.
 * - Delegate element-specific rendering to appropriate renderers via the `RendererFactory`.
 * - Handle user interactions such as dragging elements.
 *
 * @example
 * const canvas = document.getElementById('circuitCanvas');
 * const circuitRenderer = new CircuitRenderer(canvas, circuitService);
 * circuitRenderer.render();
 */

export class CircuitRenderer {
    /**
     * @constructor
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
     * @param {CircuitService} circuitService - The service managing circuit elements.
     * @param {RendererFactory} rendererFactory - The factory responsible for creating element renderers.
     */
    constructor(canvas, circuitService, rendererFactory) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.circuitService = circuitService;
        this.rendererFactory = rendererFactory; // Injected dependency for creating renderers.
        
        // Preload renderers from the factory
        this.renderers = new Map(
            Array.from(rendererFactory.registry.entries()).map(([type, RendererClass]) => [
                type,
                new RendererClass(this.context), // Instantiate each renderer with context
            ])
        );
    
        this.draggedElement = null; // The element currently being dragged.
        this.offset = { x: 0, y: 0 }; // Offset for drag operations.
    }
    

    /**
     * Clears the canvas by resetting its drawing context.
     */
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Renders the entire circuit by delegating rendering to specific renderers.
     */
    render() {
        this.clearCanvas();

        // Iterate over circuit elements and render them using appropriate renderers.
        this.circuitService.getElements().forEach((element) => {
            if (!this.renderers.has(element.type)) {
                // Lazily create and cache renderers for element types.
                const renderer = this.rendererFactory.create(element.type, this.context);
                if (!renderer) {
                    console.warn(`No renderer found for element type: ${element.type}`);
                    return;
                }
                this.renderers.set(element.type, renderer);
            }

            const renderer = this.renderers.get(element.type);
            renderer.renderElement(element);
        });
    }

    /**
     * Starts dragging an element based on cursor position.
     * @param {number} x - X-coordinate of the cursor.
     * @param {number} y - Y-coordinate of the cursor.
     */
    startDrag(x, y) {
        for (const element of this.circuitService.getElements()) {
            if (this.isInsideElement(x, y, element)) {
                this.draggedElement = element;

                // Calculate the drag offset.
                const [start] = element.nodes;
                this.offset.x = x - start.x;
                this.offset.y = y - start.y;
                return;
            }
        }
    }

    /**
     * Drags the currently selected element to a new position.
     * @param {number} x - The new X-coordinate of the cursor.
     * @param {number} y - The new Y-coordinate of the cursor.
     */
    dragElement(x, y) {
        if (this.draggedElement) {
            const dx = x - this.offset.x;
            const dy = y - this.offset.y;

            // Update all node positions for the dragged element.
            this.draggedElement.nodes = this.draggedElement.nodes.map((node) => ({
                x: dx + (node.x - this.draggedElement.nodes[0].x),
                y: dy + (node.y - this.draggedElement.nodes[0].y),
            }));

            // Re-render the circuit to reflect changes.
            this.render();
        }
    }

    /**
     * Stops the current drag operation.
     */
    stopDrag() {
        this.draggedElement = null;
    }

    /**
     * Determines if a point is inside an element's boundary.
     * @param {number} x - The X-coordinate of the point.
     * @param {number} y - The Y-coordinate of the point.
     * @param {Object} element - The circuit element to check.
     * @returns {boolean} True if the point is within the element's boundary.
     */
    isInsideElement(x, y, element) {
        const [start] = element.nodes;
        const size = 50; // Fixed size for simplicity.
        return (
            x >= start.x &&
            x <= start.x + size &&
            y >= start.y &&
            y <= start.y + size
        );
    }
}
