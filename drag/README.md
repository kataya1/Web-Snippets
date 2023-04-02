To make other HTML elements draggable, three things must be done:

1. Set the draggable attribute to "true" on the element that you wish to make draggable.
2. Add a listener for the dragstart event.
3. Set the drag data in the above listener.
```html
<p draggable="true">This text <strong>may</strong> be dragged.</p>
```
```js
const draggableElement = document.querySelector('p[draggable="true"]');

draggableElement.addEventListener("dragstart", (event) =>
  event.dataTransfer.setData("text/plain", "This text may be dragged")
);
```
note:  images and links draggable attribute default value is true (text aswell i think)

## events 
- `dragstart` - Fired when the user starts dragging an element.
- `drag` - Fired repeatedly while the element is being dragged.
- `dragenter` - Fired when the element being dragged enters a valid drop target.
- `dragleave` - Fired when the element being dragged leaves a valid drop target.
- `dragover` - Fired repeatedly while the element is over a valid drop target.
- `drop` - Fired when the dragged element is dropped on a valid drop target.
- `dragend` - Fired when the drag operation ends. fired at the source of the drag (the same element that received the dragstart event)

For drag and drop to work, you need:

- A draggable element - The element that the user can drag.
- Drop targets - The elements where the draggable element can be dropped.
- Event handlers for the necessary drag and drop events.

## data data 
[https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#drag_data](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#drag_data)

The `DataTransfer` object is used to hold the data that is being dragged during a drag and drop operation in HTML. It contains the data being dragged (the value and the type (or format such as text/plain for text data)), as well as information about the drag operation.

Some important properties of the DataTransfer object are:

- `setData() ` and `getData()` - Used to set and get the data being dragged. You can store text, HTML, files, etc.
- `types` - An array of the types of data being dragged. For example, ["text/plain", "text/html"] 
- `dropEffect ` - The effect that will happen when the data is dropped. Can be "move", "copy", "link", etc.
- `effectAllowed ` - The effects that are allowed to happen when the data is dropped.

`e.dataTransfer.setData('text/plain', draggable.id);`

## Specifying drop targets
A listener for the dragenter and dragover events are used to indicate valid drop targets, that is, places where dragged items may be dropped. Most areas of a web page or application are not valid places to drop data. Thus, the default handling of these events is not to allow a drop. 
    <b>that why we use e.preventDefault() in dragover p.s: preventDefault() in dragenter aswell</b>