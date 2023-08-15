import { onMouseMove } from './onMouseMove';

// Function to handle double click event
export function onDoubleClick(event,placing,isDragging,mouse,raycaster,camera,selectedBox,offset,controls, boxMeshes, planeMesh,camera) {
    console.log(placing,isDragging);
    if (!placing && !isDragging) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(boxMeshes);

        if (intersects.length > 0) {
            selectedBox = intersects[0].object;
            offset.copy(selectedBox.position).sub(intersects[0].point);
            isDragging = true;
            controls.enabled = false;
            console.log("clicked")
        
        }
    }
}
