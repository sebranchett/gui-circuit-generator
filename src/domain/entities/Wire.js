import { Element } from './Element.js';

export class Wire extends Element {
    constructor(id, terminals, label = null, properties = new Properties()) {
        super(id, terminals, label, properties);
        this.type = 'wire';
    }
}
