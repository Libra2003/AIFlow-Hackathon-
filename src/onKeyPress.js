// Function to handle key presses
export function onKeyPress(event, selectedBox,geometry ) {
    if (selectedBox) {
        const moveDistance = 0.3;
        const rotationSpeed = 1;

        switch (event.key) {
            case 'ArrowUp':
                if(event.shiftKey){
                    selectedBox.position.y -= moveDistance;
                }
                selectedBox.position.z -= moveDistance;
                break;
            case 'ArrowDown':
                if(event.shiftKey){
                    selectedBox.position.y += moveDistance;
                }
                selectedBox.position.z += moveDistance;
                break;
            case 'ArrowLeft':
                selectedBox.position.x -= moveDistance;
                break;
            case 'ArrowRight':
                selectedBox.position.x += moveDistance;
                break;
            case 'r':
            case 'R':
                if (event.shiftKey) {
                    selectedBox.rotation.y += rotationSpeed;
                } else {
                    selectedBox.rotation.y -= rotationSpeed;
                }
                break;
            case 't':
            case 'T':
                if (event.shiftKey) {
                    selectedBox.rotation.z += rotationSpeed;
                } else {
                    selectedBox.rotation.z -= rotationSpeed;
                }
            default:
                return;
        }

        const halfBoxHeight = selectedBox.geometry.parameters.height / 2;
        if (selectedBox.position.y < halfBoxHeight) {
            selectedBox.position.y = halfBoxHeight;
        }
    }
}