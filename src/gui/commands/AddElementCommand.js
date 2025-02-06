import { GUICommand } from "./GUICommand.js";

export class AddElementCommand extends GUICommand {
    constructor(circuitService, circuitRenderer, elementRegistry, elementType) {
        super();
        this.circuitService = circuitService;
        this.circuitRenderer = circuitRenderer;
        this.elementRegistry = elementRegistry;
        this.elementType = elementType;
    }

    execute() {
        console.log(`Executing AddElementCommand for ${this.elementType}`);

        const factory = this.elementRegistry.get(this.elementType);
        if (!factory) {
            console.error(`Factory function for element type "${this.elementType}" not found.`);
            return;
        }

        const nodes = [
            { x: Math.random() * 800, y: Math.random() * 600 },
            { x: Math.random() * 800, y: Math.random() * 600 },
        ];
        const properties = {};
        const element = factory(undefined, nodes, null, properties);

        this.circuitService.addElement(element);
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
