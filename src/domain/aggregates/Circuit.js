export class Circuit {
    constructor(id) {
        this.id = id;
        this.elements = []; // List of elements
        this.connections = []; // List of connections
    }

    addElement(element) {
        if (this.elements.some(e => e.id === element.id)) {
            throw new Error(`Element with ID ${element.id} already exists.`);
        }
        this.elements.push(element);
    }

    connectElements(sourceId, targetId) {
        const source = this.elements.find(e => e.id === sourceId);
        const target = this.elements.find(e => e.id === targetId);

        if (!source || !target) {
            throw new Error('Cannot connect elements: One or both elements not found.');
        }

        // Check for duplicate connection
        if (this.connections.some(conn => conn.sourceId === sourceId && conn.targetId === targetId)) {
            throw new Error('Connection already exists.');
        }

        this.connections.push({ sourceId, targetId });
    }

    // Retrieve connections for a specific element
    getConnectionsForElement(elementId) {
        return this.connections.filter(conn => conn.sourceId === elementId || conn.targetId === elementId);
    }

    describe() {
        const elementsDescription = this.elements.map(e => `${e.constructor.name} (${e.id}) at position (${e.position.x}, ${e.position.y})`).join(', ');
        const connectionsDescription = this.connections.map(conn => `${conn.sourceId} connected to ${conn.targetId}`).join(', ');
        return `Elements: ${elementsDescription}\nConnections: ${connectionsDescription}`;
    }
}