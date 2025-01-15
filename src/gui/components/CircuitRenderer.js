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
        for (const element of this.circuitService.getElements()) {
            if (element.type === 'Resistor') {
                this.renderResistor(element);
            } else if (element.type === 'Wire') {
                this.renderWire(element);
            }
        }
    }

    /**
     * Renders a resistor element.
     * @param {Resistor} resistor - The resistor to render.
     */
    renderResistor(resistor) {
        const [start, end] = resistor.nodes;
        this.context.strokeStyle = 'blue';
        this.context.lineWidth = 2;
        this.context.beginPath();
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.stroke();

        // Add a label if available
        if (resistor.label) {
            this.context.fillStyle = 'blue';
            this.context.font = '12px Arial';
            this.context.fillText(resistor.label.text, (start.x + end.x) / 2, (start.y + end.y) / 2);
        }
    }

    /**
     * Renders a wire element.
     * @param {Wire} wire - The wire to render.
     */
    renderWire(wire) {
        const [start, end] = wire.nodes;
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 1;
        this.context.beginPath();
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.stroke();
    }
}
