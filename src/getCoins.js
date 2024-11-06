import * as THREE from "three";

export default function getCoins() {
    var coins = [];
    for (var i = 0; i < 200; i++) {
        var texture = new THREE.TextureLoader().load("./images/bitcoin.png");

        var material = new THREE.MeshBasicMaterial({
            map: texture,
            // metalness: 0.7,
            // roughness: 0.3,
        })

        var geometry = new THREE.CylinderGeometry(1, 1, 0.1, 100);
        var coin = new THREE.Mesh(geometry, material)
        coins.push(coin);
        coin.position.z = -i * 210 - 210 + 15;
        coin.originalZ = -i * 210 - 210 + 15;
        coin.position.y = 2

        let dirR = Math.random();
        if (dirR <= 0.33) coin.position.x = -7.5;
        if (dirR >= 0.66) coin.position.x = 7.5;
        coin.rotation.x = 2
        coin.rotation.y = 1.5
    }

    return coins
}
