- `dragstart` - Fired when the user starts dragging an element.
- `drag` - Fired repeatedly while the element is being dragged.
- `dragenter` - Fired when the element being dragged enters a valid drop target.
- `dragleave` - Fired when the element being dragged leaves a valid drop target.
- `dragover` - Fired repeatedly while the element is over a valid drop target.
- `drop` - Fired when the dragged element is dropped on a valid drop target.
- `dragend` - Fired when the drag operation ends.

For drag and drop to work, you need:

- A draggable element - The element that the user can drag.
- Drop targets - The elements where the draggable element can be dropped.
- Event handlers for the necessary drag and drop events.


The DataTransfer object is used to hold the data that is being dragged during a drag and drop operation in HTML. It contains the data being dragged, as well as information about the drag operation.

Some important properties of the DataTransfer object are:

- `setData() ` and `getData()` - Used to set and get the data being dragged. You can store text, HTML, files, etc.
- `types` - An array of the types of data being dragged. For example, ["text/plain", "text/html"] 
- `dropEffect ` - The effect that will happen when the data is dropped. Can be "move", "copy", "link", etc.
- `effectAllowed ` - The effects that are allowed to happen when the data is dropped.

`e.dataTransfer.setData('text/plain', draggable.id);`