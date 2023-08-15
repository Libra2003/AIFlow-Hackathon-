
// Function to handle mouse up
export function onMouseUp(isDragging,selectedBox,controls) {
    console.log("Dragging7");

    isDragging = false;
    selectedBox = null;
    controls.enabled = true;
    return isDragging
}

// Function to handle mouse move
export function onMouseMove(event, isDragging, selectedBox, mouse, raycaster, planeMesh, camera, offset, controls) {


    if (isDragging && selectedBox) {
        console.log("Dragging2");

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(planeMesh);

        if (intersects.length > 0) {
            console.log("Dragging3");
            const intersectionPoint = intersects[0].point;
            selectedBox.position.copy(intersectionPoint).add(offset);
            const halfBoxHeight = selectedBox.geometry.parameters.height / 2;
            if (selectedBox.position.y < halfBoxHeight) {
                selectedBox.position.y = halfBoxHeight;
                console.log("Dragging4");

                window.addEventListener('mouseup', (event) => {
                    onMouseUp(event, isDragging, selectedBox, controls);
                }, false);
                
            }

        }
     
    }

}
