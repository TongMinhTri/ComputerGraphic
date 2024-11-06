import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

export default function getMagnets() {
    var magnets = [];
    for (var i = 0; i < 50; i++) {
        var texture = new THREE.TextureLoader().load("./images/magnet.png");

        var material = new THREE.MeshBasicMaterial({
            map: texture,
        });

        var geometry = new THREE.CylinderGeometry(1, 1, 0.1, 100);
        var magnet = new THREE.Mesh(geometry, material);
        magnets.push(magnet);
        magnet.position.z = -i * 1260 - 210 + 15;
        magnet.originalZ = -i * 1260 - 210 + 15;
        magnet.position.y = 5.5;

        let dirR = Math.random();
        if (dirR <= 0.33) magnet.position.x = -7.5;
        if (dirR >= 0.66) magnet.position.x = 7.5;
        magnet.rotation.x = 2;
        magnet.rotation.y = 1.5;
    }

    return magnets;
}
