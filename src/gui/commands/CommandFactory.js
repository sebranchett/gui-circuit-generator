import { AddElementCommand } from "./AddElementCommand.js";
import { MoveElementCommand } from "./MoveElementCommand.js";

/**
 * CommandFactory is responsible for registering and retrieving commands dynamically.
 */
export class CommandFactory {
    constructor() {
        this.commands = new Map();

        // Register available commands
        this.register("addElement", new AddElementCommand());
        this.register("moveElement", new MoveElementCommand());
    }

    /**
     * Registers a command instance with a unique name.
     * @param {string} name - The command name (e.g., "addElement").
     * @param {Command} commandInstance - The command instance.
     */
    register(name, commandInstance) {
        this.commands.set(name, commandInstance);
    }

    /**
     * Retrieves a command instance by name.
     * @param {string} name - The name of the command.
     * @returns {Command} The command instance.
     */
    get(name) {
        return this.commands.get(name);
    }
}
