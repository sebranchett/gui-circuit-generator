import { EventEmitter } from "events";

/**
 * @abstract
 * GUICommand: Base class for all commands in the system.
 *
 * Commands now use an event-based approach instead of directly modifying state.
 */
export class Command extends EventEmitter {
    constructor() {
        super();
    }

    /**
     * Executes the command. Must be implemented by subclasses.
     * @abstract
     * @param {...any} args - Arguments required by the command.
     */
    execute(...args) {
        throw new Error("execute() must be implemented in subclasses.");
    }

    /**
     * Optional undo method for commands that support undo/redo.
     * Must be implemented by subclasses that require it.
     */
    undo() {
        throw new Error("undo() must be implemented in subclasses.");
    }
}