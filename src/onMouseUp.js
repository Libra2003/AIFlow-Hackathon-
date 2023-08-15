// Function to handle mouse up
export function onMouseUp(isDragging,selectedBox,controls) {
    console.log("Dragging7");

    isDragging = false;
    selectedBox = null;
    controls.enabled = true;
    return isDragging
}