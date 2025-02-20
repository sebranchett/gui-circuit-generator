import { GUICommand } from "./GUICommand.js";
import { Position } from "../../domain/valueObjects/Position.js";

/**
 * Command to add an element to the circuit.
 * Directly modifies the circuit and notifies UI updates.
 */
export class AddElementCommand extends GUICommand {
    constructor(circuitService, circuitRenderer, elementRegistry, elementType) {
        super();
        this.circuitService = circuitService;
        this.circuitRenderer = circuitRenderer;
        this.elementRegistry = elementRegistry;
        this.elementType = elementType;

        // Default positioning for new elements
        this.DEFAULT_X = 400;  // Center X position
        this.DEFAULT_Y = 300;  // Center Y position
        this.ELEMENT_WIDTH = 60;  // Width for default elements (matches image size)
    }

    /**
     * Executes the command with provided node positions.
     * @param {Position[]} nodes - The precise node positions calculated by the renderer.
     */
    execute(nodes = null) {
        console.log(`Executing AddElementCommand for: ${this.elementType}`);

        const factory = this.elementRegistry.get(this.elementType);
        if (!factory) {
            console.error(`❌ Factory function for element type "${this.elementType}" not found.`);
            return;
        }

        // If no nodes are provided, use a default position
        if (!nodes || !Array.isArray(nodes) || nodes.length !== 2) {
            console.warn("⚠️ No valid node positions provided. Using default centered position.");

            nodes = [
                new Position(this.DEFAULT_X - this.ELEMENT_WIDTH / 2, this.DEFAULT_Y), // Left terminal
                new Position(this.DEFAULT_X + this.ELEMENT_WIDTH / 2, this.DEFAULT_Y)  // Right terminal
            ];
        }

        console.log(`📌 Final node positions:`, nodes);

        // Create the element with computed positions
        const element = factory(undefined, nodes, null, {});
        console.log("✅ Element created:", element);

        // Add to circuit and update UI
        this.circuitService.addElement(element);
        this.circuitService.emit("update", { type: "addElement", element });
        this.circuitRenderer.render();
    }

    bind() {
        const button = document.getElementById(`add${this.elementType}`);
        if (!button) {
            console.warn(`Button with ID "add${this.elementType}" not found.`);
            return;
        }
        button.addEventListener("click", () => this.execute());
        console.log(`Bound AddElementCommand to add${this.elementType}`);
    }
}
