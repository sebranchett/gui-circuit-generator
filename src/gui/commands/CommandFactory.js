export class CommandFactory {
    constructor() {
        this.commands = new Map();
    }

    /**
     * Registers a new command dynamically.
     */
    register(name, CommandClass) {
        this.commands.set(name, (...args) => new CommandClass(...args));
    }

    /**
     * Retrieves a command instance dynamically.
     */
    get(name, ...args) {
        if (!this.commands.has(name)) {
            throw new Error(`Command "${name}" not found.`);
        }
        return this.commands.get(name)(...args);
    }
}
