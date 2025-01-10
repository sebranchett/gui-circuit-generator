import { Element } from './Element.js';

export class Wire extends Element {
    constructor(id, nodes, label = null, properties = new Properties()) {
        super(id, nodes, label, properties);
        this.type = 'wire';
    }
}
