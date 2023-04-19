const draggables = document.querySelectorAll('.draggable');
const dropTarget = document.getElementById('dropTarget');

// Cache draggable elements 
draggables.forEach((draggable, i) => {
    draggable.id = `draggable-${i}`;
    draggable.addEventListener('dragstart', e => dragStart(e, draggable));
    draggable.addEventListener('dragend', e => dragEnd(e, draggable));
});

function dragStart(e, draggable) {
    const rect = draggable.getBoundingClientRect();
    const offset = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };

    // Create drag image 
    const clone = draggable.cloneNode(true);
    clone.classList.add('drag-image');

    // Append clone 
    document.body.appendChild(clone);
    e.dataTransfer.setDragImage(clone, offset.x, offset.y);

    draggable.classList.add('dragging');
    draggable.setAttribute('aria-grabbed', 'true');
    draggable.setAttribute('role', 'draggable');
    e.dataTransfer.setData('text/plain', draggable.id);
}

function dragEnd(e, draggable) {
    document.body.removeChild(document.querySelector('.drag-image'));

    draggable.classList.remove('dragging');
    draggable.setAttribute('aria-grabbed', 'false');

    e.dataTransfer.clearData();
    draggable.blur();
    ;
}

dropTarget.addEventListener('dragenter', e => {
    e.preventDefault()
});
dropTarget.addEventListener('dragover', e => {
    e.preventDefault()
});
dropTarget.addEventListener('drop', e => {
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    dropTarget.appendChild(draggable);
});