import { expect } from 'chai';
import sinon from 'sinon';
import { setupJsdom } from '../setup/jsdomSetup.js';
import { GUIAdapter } from '../../src/gui/adapters/GUIAdapter.js';
import { Circuit } from '../../src/domain/aggregates/Circuit.js';
import { CircuitService } from '../../src/application/CircuitService.js';

describe('GUIAdapter Tests', () => {
    let canvas;
    let guiAdapter;

    beforeEach(() => {
        setupJsdom();
    
        // Add mock buttons to the DOM
        const resistorButton = document.createElement('button');
        resistorButton.id = 'addResistor';
        document.body.appendChild(resistorButton);
    
        const wireButton = document.createElement('button');
        wireButton.id = 'addWire';
        document.body.appendChild(wireButton);
    
        // Spy on addEventListener
        sinon.spy(resistorButton, 'addEventListener');
        sinon.spy(wireButton, 'addEventListener');
    
        // Mock canvas element
        canvas = {
            width: 800,
            height: 600,
            getContext: () => ({
                clearRect: sinon.spy(),
                beginPath: sinon.spy(),
                moveTo: sinon.spy(),
                lineTo: sinon.spy(),
                stroke: sinon.spy(),
                arc: sinon.spy(),
                fill: sinon.spy(),
                fillRect: sinon.spy(),
                fillText: sinon.spy(),
            }),
        };
    
        // Create a CircuitService with a mock Circuit
        const circuit = new Circuit();
        const circuitService = new CircuitService(circuit);
        guiAdapter = new GUIAdapter(canvas, circuitService);
    
        // Stub ElementRegistry to only include Resistor
        guiAdapter.elementRegistry = {
            Resistor: () => {},
        };
    });
    
    it('should initialize without errors', () => {
        expect(() => guiAdapter.initialize()).to.not.throw();
    });

    it('should dynamically bind UI controls based on registered elements', () => {
        const resistorButton = document.getElementById('addResistor');
        const wireButton = document.getElementById('addWire');

        // Verify that the buttons exist
        expect(resistorButton).to.not.be.null;
        expect(wireButton).to.not.be.null;

        guiAdapter.bindUIControls();

        // Ensure event listeners are registered
        expect(resistorButton.addEventListener).to.be.a('function');
        expect(wireButton.addEventListener).to.be.a('function');
    });

    it('should render the circuit when initialized', () => {
        const renderSpy = sinon.spy(guiAdapter.circuitRenderer, 'render');
        guiAdapter.initialize();
        expect(renderSpy.calledOnce).to.be.true;
    });

    it('should create and add elements via UI control bindings', () => {
        const resistorButton = document.getElementById('addResistor');

        // Spy on CircuitService.addElement
        const addElementSpy = sinon.spy(guiAdapter.circuitService, 'addElement');

        guiAdapter.bindUIControls();

        // Verify single event listener registration
        expect(resistorButton.addEventListener.callCount).to.equal(1);

        // Simulate button click
        const registeredHandler = resistorButton.addEventListener.args[0][1];
        expect(registeredHandler).to.be.a('function');

        // Call the registered handler
        registeredHandler();

        // Verify addElement was called once
        expect(addElementSpy.calledOnce).to.be.true;

        // Verify the added element's type, properties, and nodes
        const addedElement = addElementSpy.args[0][0];
        expect(addedElement).to.have.property('type', 'Resistor');
        expect(addedElement).to.have.property('nodes').that.is.an('array').with.lengthOf(2);
        expect(addedElement).to.have.property('properties').that.is.an('object');
    });

    afterEach(() => {
        // Restore sinon stubs and spies
        document.body.innerHTML = ''; // Clear mock DOM
        sinon.restore();
    });
});
