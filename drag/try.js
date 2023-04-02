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
    clone.classList.add('dragging');
    clone.style.position = 'fixed';
    clone.style.left = '-9999px';
    draggable.style.opacity = 0;

    // Add clone to document and set as drag image 
    document.body.appendChild(clone);
    e.dataTransfer.setDragImage(clone, offset.x, offset.y);

    draggable.setAttribute('aria-grabbed', 'true');
    draggable.setAttribute('role', 'draggable');
    e.dataTransfer.setData('text/plain', draggable.id);
}

function dragEnd(e, draggable) {
    // Logic for drag end 
    document.body.removeChild(document.querySelector('.dragging'));
    draggable.style.removeProperty('opacity');

    draggable.setAttribute('aria-grabbed', 'false');
    draggable.classList.remove('dragging');
    e.dataTransfer.clearData();
    draggable.blur();
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