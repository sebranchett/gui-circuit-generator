import { ElementRenderer } from './ElementRenderer.js';
import { Position } from "../../domain/valueObjects/Position.js";

export class ResistorRenderer extends ElementRenderer {
    constructor(context) {
        super(context);
        this.image = new Image();
        this.image.src = './assets/R.png'; // Path to the resistor image
        this.imageLoaded = false;

        this.image.onload = () => {
            this.imageLoaded = true;
        };

        // Define proper dimensions for the resistor image
        this.SCALED_WIDTH = 60;  // Adjusted width for display
        this.SCALED_HEIGHT = 20; // Adjusted height for display
    }

    renderElement(resistor) {
        if (!this.imageLoaded) return; // Ensure image is loaded before rendering

        const [start, end] = resistor.nodes;
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;

        // **Ensure correct node alignment**
        const leftNode = new Position(midX - this.SCALED_WIDTH / 2, midY);
        const rightNode = new Position(midX + this.SCALED_WIDTH / 2, midY);

        // Draw terminals (aligned properly)
        this.renderTerminal(leftNode);
        this.renderTerminal(rightNode);

        // Draw scaled resistor image
        this.context.drawImage(
            this.image,
            midX - this.SCALED_WIDTH / 2,
            midY - this.SCALED_HEIGHT / 2,
            this.SCALED_WIDTH,
            this.SCALED_HEIGHT
        );

        // Add label (centered below the resistor)
        if (resistor.label) {
            this.renderLabel(resistor.label.text, midX, midY + 25);
        }
    }

    registerClickHandler(canvas, command) {
        canvas.addEventListener("mouseup", (event) => {
            const rect = canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top;

            console.log(`📌 Click detected at: ${clickX}, ${clickY}`);

            // Ensure correct positions for terminals based on scaled image
            const nodes = [
                new Position(clickX - this.SCALED_WIDTH / 2, clickY), // Left terminal
                new Position(clickX + this.SCALED_WIDTH / 2, clickY)  // Right terminal
            ];

            console.log(`📌 Calculated node positions:`, nodes);

            // Execute the command with computed positions
            if (command) {
                command.execute(nodes);
                console.log(`✅ AddElementCommand executed for ${command.elementType}`);
            } else {
                console.warn("⚠️ No command provided for adding the element.");
            }
        }, { once: true });
    }
}
