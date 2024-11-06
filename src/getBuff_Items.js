import * as THREE from "three";

export default function getBUffItems() {
    var buffItems = [];
    for (var i = 0; i < 200; i++) {
        var texture = new THREE.TextureLoader().load("./images/immortal.png");

        var material = new THREE.MeshBasicMaterial({
            map: texture,
            // metalness: 0.7,
            // roughness: 0.3,
        })

        var geometry = new THREE.CylinderGeometry(1, 1, 0.1, 100);
        var item = new THREE.Mesh(geometry, material)
        buffItems.push(item);
        item.position.z = -i * 350 - 210 + 30;
        // coin.originalZ = -i * 30 - 120;
        item.position.y = 2

        let dirR = Math.random();
        if (dirR <= 0.33) item.position.x = -7.5;
        if (dirR >= 0.66) item.position.x = 7.5;
        item.rotation.x = 2
        item.rotation.y = 1.5
    }

    return buffItems
}
