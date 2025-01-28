import { ElementRenderer } from './ElementRenderer.js';

export class ResistorRenderer extends ElementRenderer {
    renderElement(resistor) {
        const [start, end] = resistor.nodes;
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        const width = 50; // Resistor body width
        const height = 20; // Resistor body height

        // Draw terminals
        this.renderTerminal(start);
        this.renderTerminal(end);

        // Draw resistor body
        this.context.fillStyle = 'blue';
        this.context.fillRect(midX - width / 2, midY - height / 2, width, height);

        // Add label
        if (resistor.label) {
            this.renderLabel(resistor.label.text, midX, midY + 4);
        }
    }
}
