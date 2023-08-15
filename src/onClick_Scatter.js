import * as THREE from 'three';

// Function to handle click on scatter
export function onClick_Scatter(event, mouse, raycaster, camera, planeMesh, placing,copying, boxMeshes, placeButton, scene, cancelButton) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([planeMesh]);
    if (intersects.length > 0) {
        const intersectionPoint = intersects[0].point;
        if (placing) {
            const boxSize = 0.5;
            const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
            const boxColor = Math.random() * 0xffffff;
            const boxMaterial = new THREE.MeshBasicMaterial({ color: boxColor });
            const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
            boxMesh.position.copy(intersectionPoint);
            boxMesh.position.y += boxSize / 2;
            boxMesh.rotation.set(0, 0, 0);
            scene.add(boxMesh);
            boxMeshes.push(boxMesh);
            placeButton.disabled = true;
            cancelButton.disabled = true;
            placing = false;

        } else if (copying) {
            const boxSize = 0.5;
            const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
            const boxColor = Math.random() * 0xffffff;
            const boxMaterial = new THREE.MeshBasicMaterial({ color: boxColor });
            const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
            boxMesh.position.copy(intersectionPoint);
            boxMesh.position.y += boxSize / 2;
            boxMesh.rotation.set(0, 0, 0);
            scene.add(boxMesh);
            boxMeshes.push(boxMesh);
        }
        
    }
}