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
    }

    execute() {
        console.log("Executing AddElementCommand for:", this.elementType);

        // Retrieve the factory function for the element
        const factory = this.elementRegistry.get(this.elementType);
        if (!factory) {
            console.error(`Factory function for element type "${this.elementType}" not found.`);
            return;
        }

        // Generate valid node positions
        const nodes = [
            { x: Math.random() * 800, y: Math.random() * 600 },
            { x: Math.random() * 800, y: Math.random() * 600 }
        ].map(pos => new Position(pos.x, pos.y));

        const element = factory(undefined, nodes, null, {}); // ✅ Create the element

        //  Directly modify circuit state
        this.circuitService.addElement(element);

        //  Notify the UI about the update
        this.circuitService.emit("update", { type: "addElement", element });

        // Immediately update the renderer
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
