import { Position } from '../../domain/valueObjects/Position.js'; // Adjust the path as needed

export class CircuitRenderer {
    /**
     * Creates a CircuitRenderer instance.
     * @param {HTMLCanvasElement} canvas - The canvas element to render the circuit on.
     * @param {CircuitService} circuitService - The service managing circuit logic.
     */
    constructor(canvas, circuitService) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.circuitService = circuitService;
        this.draggedElement = null; // Track the element being dragged
        this.offset = { x: 0, y: 0 }; // Track the drag offset
    }

    /**
     * Clears the canvas.
     */
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Renders the entire circuit on the canvas.
     */
    render() {
        this.clearCanvas();

        // Render each element in the circuit
        this.circuitService.getElements().forEach((element) => {
            if (element.type === 'Resistor') {
                this.renderResistor(element);
            } else if (element.type === 'Wire') {
                this.renderWire(element);
            }
        });
    }

    /**
     * Renders a resistor element.
     * @param {Object} resistor - The resistor element to render.
     */
    renderResistor(resistor) {
        const [start, end] = resistor.nodes;
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        const width = 50; // Resistor body width
        const height = 20; // Resistor body height

        // Draw terminals
        this.renderTerminal(start);
        this.renderTerminal(end);

        // Draw resistor body as a rectangle
        this.context.fillStyle = 'blue';
        this.context.fillRect(midX - width / 2, midY - height / 2, width, height);

        // Add label (optional)
        if (resistor.label) {
            this.context.fillStyle = 'white';
            this.context.font = '12px Arial';
            this.context.textAlign = 'center';
            this.context.fillText(resistor.label.text, midX, midY + 4);
        }
    }

    /**
     * Renders a wire element.
     * @param {Object} wire - The wire element to render.
     */
    renderWire(wire) {
        const [start, end] = wire.nodes;

        this.renderTerminal(start);
        this.renderTerminal(end);
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 1;
        this.context.beginPath();
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.stroke();
    }

    /**
     * Renders a terminal as a small circle.
     * @param {Position} position - The terminal's position (must be an instance of Position).
     */
    renderTerminal(position) {
        if (!(position instanceof Position)) {
            throw new Error('Invalid position. Expected an instance of Position.');
        }

        this.context.fillStyle = 'black';
        this.context.beginPath();
        this.context.arc(position.x, position.y, 5, 0, Math.PI * 2);
        this.context.fill();
    }

    /**
     * Starts dragging an element.
     * @param {number} x - The x-coordinate of the click.
     * @param {number} y - The y-coordinate of the click.
     */
    startDrag(x, y) {
        for (const element of this.circuitService.getElements()) {
            if (this.isInsideElement(x, y, element)) {
                this.draggedElement = element;

                // Calculate offset to maintain relative drag position
                const [start] = element.nodes;
                this.offset.x = x - start.x;
                this.offset.y = y - start.y;
                return;
            }
        }
    }

    /**
     * Drags the currently selected element.
     * @param {number} x - The new x-coordinate.
     * @param {number} y - The new y-coordinate.
     */
    dragElement(x, y) {
        if (this.draggedElement) {
            const dx = x - this.offset.x;
            const dy = y - this.offset.y;

            // Update all terminal positions based on the drag offset
            this.draggedElement.nodes = this.draggedElement.nodes.map((node) => ({
                x: dx + (node.x - this.draggedElement.nodes[0].x),
                y: dy + (node.y - this.draggedElement.nodes[0].y),
            }));

            this.render();
        }
    }

    /**
     * Stops dragging the element.
     */
    stopDrag() {
        this.draggedElement = null;
    }

    /**
     * Checks if a point is inside an element's boundary.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @param {Object} element - The element to check.
     * @returns {boolean} True if the point is inside the element.
     */
    isInsideElement(x, y, element) {
        const [start] = element.nodes;
        const size = 50; // Assume a fixed size for simplicity
        return (
            x >= start.x &&
            x <= start.x + size &&
            y >= start.y &&
            y <= start.y + size
        );
    }
}
