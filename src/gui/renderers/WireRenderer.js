import { ElementRenderer } from './ElementRenderer.js';

export class WireRenderer extends ElementRenderer {
    renderElement(wire) {
        const [start, end] = wire.nodes;

        // Draw terminals
        this.renderTerminal(start);
        this.renderTerminal(end);

        // Draw the wire
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 1;
        this.context.beginPath();
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.stroke();
    }
}
