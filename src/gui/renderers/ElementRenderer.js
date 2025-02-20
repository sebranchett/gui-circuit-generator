export class ElementRenderer {
    constructor(context) {
        this.context = context;
    }

    /**
     * Renders a terminal as a small circle.
     * @param {Position} position - The terminal's position.
     */
    renderTerminal(position) {
        this.context.fillStyle = 'black';
        this.context.beginPath();
        this.context.arc(position.x, position.y, 2, 0, Math.PI * 2);
        this.context.fill();
    }

    /**
     * Renders a label at a given position.
     * @param {string} text - The label text.
     * @param {number} x - X-coordinate.
     * @param {number} y - Y-coordinate.
     */
    renderLabel(text, x, y) {
        this.context.fillStyle = 'white';
        this.context.font = '12px Arial';
        this.context.textAlign = 'center';
        this.context.fillText(text, x, y);
    }

    /**
     * Abstract method for rendering an element.
     * @param {Object} element - The element to render.
     */
    renderElement(element) {
        throw new Error('renderElement() must be implemented in derived classes.');
    }
}
