## **1. User Stories and Acceptance Criteria**

### **User Story 1: Add an Element to the Circuit**
As a **circuit designer**,  
I want to add a element to the circuit,  
So that I can include resistance as part of the design.

#### **Acceptance Criteria**
- The element has a unique identifier.
- The element is displayed on the canvas at a specified position.
- Element properties are editable in the view to update resistance, capacitance, etc.
- The Element has default properties that can be edited.
- The resistor must be added to the `Circuit` aggregate logic.
- Elements can be added to the circuit via the GUI.
- An Element is an abstract class that can be extended by adding new component types.

#### **Definition of Done (DoD)**
- The element is visible on the canvas.
- The element's data is stored in the domain model.

#### **Tasks**
- [ ] Create a class `Element` with properties `id`, `type`, `position`, and `properties`.
- [ ] Create a class `Resistor` that extends `Element` with a property `resistance`.
- [ ] Create a class `Capacitor` that extends `Element` with a property `capacitance`.
- [ ] Create e class `Junction` that extends `Element` with a property `type`.  

---

### **User Story 2: Connect Two Elements**
As a **circuit designer**,  
I want to connect two elements in the circuit,  
So that I can define relationships between components.

#### **Acceptance Criteria**
- A connection is established between two valid elements.
- A line with terminal dots is drawn between the connected elements.
- The connection is recorded in the domain model as a relationship.

#### **Definition of Done (DoD)**
- A line with dots is visible between two connected elements on the canvas.
- The connection is stored in the domain model.
- The system validates the connection logic (e.g., elements must exist).

---

### **User Story 3: Export the Circuit**
As a **circuit designer**,  
I want to export the circuit to a netlist file,  
So that I can save my design for later use.

#### **Acceptance Criteria**
- The circuit can be exported to a netlist file.
- The exported file includes all elements and connections, as well as relative positions.
- The export functionality is triggered via the GUI.

#### **Definition of Done (DoD)**
- A netlist file is downloaded when the export button is clicked.
- The file contains all elements and connections from the domain model.

---

### **User Story 4: Import a Circuit from Netlist file**
As a **circuit designer**,
I want to import a circuit from a Netlist file,
So that I can load an existing design.

---

### **User Story 5: Import multiple circuits from multiple Netlist files**
As a **circuit designer**,
I want to import multiple circuits from multiple Netlist files,
So that I can load and reuse multiple existing designs.

#### **Acceptance Criteria**
- When circuits are loaded they should not overlap on the canvas instead they should be distanced from each other.

---
### **User Story 6: Abstract Circuits as components**
As a **circuit designer**,
I want to abstract circuits as components,
So that I can reuse circuits in other designs.

#### **Acceptance Criteria**
- A circuit can be abstracted as a component.
- Circuits could be programmaticallly added to create connections even without a GUI.

#### **Issues**
This feature could influence the decision of adding Resistance, Capacitance, etc as value objects for example.


### **User Story 3: Edit Element Properties**
As a **circuit designer**,  
I want to edit the properties of an element,  
So that I can customize the circuit components.

#### **Acceptance Criteria**
- The element properties can be edited through a properties panel.
- Changes to properties are reflected in the domain model.
- The canvas updates to reflect changes in properties (e.g., resistance value).

#### **Definition of Done (DoD)**
- The properties panel is visible and functional.
- Changes to properties are stored in the domain model.
- The canvas updates to reflect changes in properties.

#### **Tasks**
- [ ] Create a `PropertiesPanel` component in `src/gui/PropertiesPanel.js` to display and edit element properties.
- [ ] Implement the `updateElementProperties` method in `src/application/CircuitAppService.js` to handle property updates.
- [ ] Update the `CanvasAdapter` in `src/infrastructure/adapters/CanvasAdapter.js` to reflect changes on the canvas.
- [ ] Update the GUI in `src/gui/index.html` to include the properties panel.

---

### **User Story 4: Delete an Element from the Circuit**
As a **circuit designer**,  
I want to delete an element from the circuit,  
So that I can remove unwanted components.

#### **Acceptance Criteria**
- The element can be selected and deleted from the canvas.
- The element is removed from the domain model.
- The canvas updates to reflect the removal of the element.

#### **Definition of Done (DoD)**
- The element is no longer visible on the canvas.
- The element's data is removed from the domain model.

#### **Tasks**
- [ ] Implement the `deleteElement` method in `src/application/CircuitAppService.js` to handle element deletion.
- [ ] Update the `CanvasAdapter` in `src/infrastructure/adapters/CanvasAdapter.js` to handle element removal from the canvas.
- [ ] Update the GUI in `src/gui/index.html` to allow selecting and deleting elements.

---

### **User Story 5: Zoom and Pan the Canvas**
As a **circuit designer**,  
I want to zoom and pan the canvas,  
So that I can navigate and view different parts of the circuit.

#### **Acceptance Criteria**
- The canvas can be zoomed in and out.
- The canvas can be panned in all directions.
- The zoom and pan functionality is smooth and responsive.

#### **Definition of Done (DoD)**
- The canvas supports zooming and panning.
- The zoom and pan functionality is smooth and responsive.

#### **Tasks**
- [ ] Implement zoom functionality in `src/infrastructure/adapters/CanvasAdapter.js`.
- [ ] Implement pan functionality in `src/infrastructure/adapters/CanvasAdapter.js`.
- [ ] Update the GUI in `src/gui/index.html` to include zoom and pan controls.

---

### **User Story 6: Save Circuit Design**
As a **circuit designer**,  
I want to save the circuit design,  
So that I can preserve my work for future use.

#### **Acceptance Criteria**
- The circuit design can be saved to a file.
- The save functionality is accessible via the GUI.
- The saved file includes all elements and connections.

#### **Definition of Done (DoD)**
- The save functionality is implemented and accessible.
- The saved file contains all circuit data.

#### **Tasks**
- [ ] Implement the `saveCircuit` method in `src/application/CircuitAppService.js` to handle saving circuit designs.
- [ ] Update the `CircuitRepository` in `src/infrastructure/repositories/CircuitRepository.js` to handle saving data to a file.
- [ ] Update the GUI in `src/gui/index.html` to include a save button.

---

### **User Story 7: Load Circuit Design**
As a **circuit designer**,  
I want to load a saved circuit design,  
So that I can continue working on a previous design.

#### **Acceptance Criteria**
- The circuit design can be loaded from a file.
- The load functionality is accessible via the GUI.
- The loaded design includes all elements and connections.

#### **Definition of Done (DoD)**
- The load functionality is implemented and accessible.
- The loaded data is correctly displayed on the canvas.

#### **Tasks**
- [ ] Implement the `loadCircuit` method in `src/application/CircuitAppService.js` to handle loading circuit designs.
- [ ] Update the `CircuitRepository` in `src/infrastructure/repositories/CircuitRepository.js` to handle loading data from a file.
- [ ] Update the GUI in `src/gui/index.html` to include a load button.

---

### **User Story 8: Undo and Redo Actions**
As a **circuit designer**,  
I want to undo and redo actions,  
So that I can easily correct mistakes and revert changes.

#### **Acceptance Criteria**
- The undo functionality reverts the last action.
- The redo functionality re-applies the last undone action.
- The undo and redo functionality is accessible via the GUI.

#### **Definition of Done (DoD)**
- The undo and redo functionality is implemented and accessible.
- The canvas and domain model correctly reflect the undo and redo actions.

#### **Tasks**
- [ ] Implement the `undo` and `redo` methods in `src/application/CircuitAppService.js` to handle undoing and redoing actions.
- [ ] Update the `CanvasAdapter` in `src/infrastructure/adapters/CanvasAdapter.js` to reflect undo and redo actions on the canvas.
- [ ] Update the GUI in `src/gui/index.html` to include undo and redo buttons.

---

### **User Story 9: Simulate Circuit Behavior**
As a **circuit designer**,  
I want to simulate the behavior of the circuit,  
So that I can analyze its performance.

#### **Acceptance Criteria**
- The simulation can be started and stopped via the GUI.
- The simulation results are displayed on the canvas.
- The simulation takes into account all elements and connections.

#### **Definition of Done (DoD)**
- The simulation functionality is implemented and accessible.
- The simulation results are correctly displayed on the canvas.

#### **Tasks**
- [ ] Implement the `simulateCircuit` method in `src/application/CircuitAppService.js` to handle circuit simulation.
- [ ] Update the `CanvasAdapter` in `src/infrastructure/adapters/CanvasAdapter.js` to display simulation results on the canvas.
- [ ] Update the GUI in `src/gui/index.html` to include simulation controls.

---

### **User Story 10: Display Circuit Information**
As a **circuit designer**,  
I want to display information about the circuit,  
So that I can view details about the components and connections.

#### **Acceptance Criteria**
- The circuit information is displayed in an information panel.
- The information includes details about all elements and connections.
- The information panel is accessible via the GUI.

#### **Definition of Done (DoD)**
- The information panel is implemented and accessible.
- The information panel displays correct and up-to-date circuit information.

#### **Tasks**
- [ ] Create an `InformationPanel` component in `src/gui/InformationPanel.js` to display circuit information.
- [ ] Implement the `getCircuitInformation` method in `src/application/CircuitAppService.js` to retrieve circuit information.
- [ ] Update the GUI in `src/gui/index.html` to include the information panel.

---

These additional user stories should cover more functionalities and interactions within the GUI module of the QuCAT package.