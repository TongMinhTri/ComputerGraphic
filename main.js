import * as THREE from "three";
import gsap from "gsap";
import eventListener from "./src/eventListener";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// const controls = new OrbitControls(camera, renderer.domElement);
import {
  scene,
  camera,
  player,
  gravity,
  renderer,
  pointLight,
} from "./src/declaring";
import getCoins from "./src/getCoins";
import getCones from "./src/getCones";
import getJumpItems from "./src/getJump_Items";
import getBuffItems from "./src/getBuff_Items";
import getRoads from "./src/getRoads";
import getMagnets from "./src/getMagnets";
import {
  crashSound,
  playGameSound,
  stopGameSound,
  checkGameSound,
  itemSound,
  item2Sound,
  gamePlay,
} from "./src/getSounds";
import request from "./src/request";
import getModels, { getPoliceCarModel } from "./src/getModels";
import getHouses, {
  numberBuildings,
  poiRight,
  poiLeft,
} from "./src/getHouses";

var cones = [{ position: { z: 210 } }];

// Roads
var roads = [];

var topRoads = [];


// Load models

// Houses
var houses = [];

//Building
var buildings = [];

getModels().then(() => {
  getCones().then((loadedCones) => {
    loadedCones.forEach((cone) => {
      scene.add(cone);
    });
    cones = loadedCones;
    cones[0].visible = false;
  });

  getRoads().then((loadedRoads) => {
    loadedRoads.forEach((road) => {
      scene.add(road);
    });
    roads = loadedRoads;
  });

  getRoads(16.25, Math.PI).then((loadedRoads) => {
    loadedRoads.forEach((road) => {
      scene.add(road);
    });
    topRoads = loadedRoads;
  });

  //House
  getHouses().then((loadedHouses) => {
    loadedHouses.forEach((house) => {
      scene.add(house);
    });
    houses = loadedHouses;
  });

  //Building
  getHouses(1).then((loadBuilings) => {
    loadBuilings.forEach((building) => {
      scene.add(building);
    });
    buildings = loadBuilings;
  });

  const policeCar = getPoliceCarModel();

  player.add(policeCar);
  scene.add(player);
});

var panSpeed = 0.4;
document.body.appendChild(renderer.domElement);
eventListener();

// Bonus score
var bonus_coin = 0;
var totalCoins = 0;
export const getTotalCoins = () => {
  return totalCoins;
};

export const setTotalCoins = (value) => {
  totalCoins = value;
};

var score = 0;

var dist_magnet = 0;

// Coins
var coins = getCoins();
coins.forEach((coin) => {
  scene.add(coin);
});

// Jump Items
var jumpItems = getJumpItems();
jumpItems.forEach((item) => {
  scene.add(item);
});

// Buff Items
var buffItems = getBuffItems();
buffItems.forEach((item) => {
  scene.add(item);
});

// Magnets
var magnetsItems = getMagnets();
magnetsItems.forEach((item) => {
  scene.add(item);
});

// Game pause
var isPaused = true;
export const setIsPaused = (value) => {
  isPaused = value;
};
export const getIsPaused = () => {
  return isPaused;
};

var dead = false;

var username = null;
export const setUsername = (value) => {
  username = value;
};
export const getUsername = () => {
  return username;
};

$("#login-modal").modal("show");

export const restart = (additionalFunction) => {
  gamePlay();
  panSpeed = 0.399;
  player.userData.magnet = false;
  dist_magnet = 0;
  player.userData.collect_coin = false;

  function timelinePromise(timeline) {
    return new Promise((resolve) => {
      timeline.eventCallback("onComplete", () => {
        resolve();
        additionalFunction && additionalFunction();
      });
    });
  }

  async function runAllTimelines(timelines) {
    // bonus_coin = 0;
    const promises = timelines.map(timelinePromise);
    await Promise.all(promises);
    // console.log("All timelines have completed!");
  }

  let timelines = [];

  player.userData.hit = true;
  setTimeout(() => {
    player.userData.hit = false;
  }, 1000);
  for (var i = 0; i < cones.length; i++) {
    let coneTl = gsap.timeline();
    coneTl.to(cones[i].position, 1, { z: cones[i].originalZ });
    timelines.push(coneTl);
  }
  for (var i = 0; i < coins.length; i++) {
    let coinT1 = gsap.timeline();
    coinT1.to(coins[i].position, 1, { z: coins[i].originalZ });
    timelines.push(coinT1);
  }
  for (var i = 0; i < jumpItems.length; i++) {
    let itemT1 = gsap.timeline();
    itemT1.to(jumpItems[i].position, 1, { z: jumpItems[i].originalZ });
    timelines.push(itemT1);
  }
  for (var i = 0; i < buffItems.length; i++) {
    let itemT1 = gsap.timeline();
    itemT1.to(buffItems[i].position, 1, { z: buffItems[i].originalZ });
    timelines.push(itemT1);
  }
  for (var i = 0; i < magnetsItems.length; i++) {
    let itemT1 = gsap.timeline();
    itemT1.to(magnetsItems[i].position, 1, { z: magnetsItems[i].originalZ });
    timelines.push(itemT1);
  }
  runAllTimelines(timelines).then(() => {
    // Remove and Reset Coins and Cones
    cones.forEach((cone) => {
      scene.remove(cone);
      // cone.geometry.dispose();
      // cone.material.dispose();
    });

    getCones().then((loadedCones) => {
      loadedCones.forEach((cone) => {
        scene.add(cone);
      });
      cones = loadedCones;
    });

    coins.forEach((coin) => {
      scene.remove(coin);
      coin.geometry.dispose();
      coin.material.dispose();
    });

    coins = [];
    coins = getCoins();
    coins.forEach((coin) => {
      scene.add(coin);
    });

    jumpItems.forEach((item) => {
      scene.remove(item);
      item.geometry.dispose();
      item.material.dispose();
    });

    jumpItems = [];
    jumpItems = getJumpItems();
    jumpItems.forEach((item) => {
      scene.add(item);
    });

    buffItems.forEach((item) => {
      scene.remove(item);
      item.geometry.dispose();
      item.material.dispose();
    });

    buffItems = [];
    buffItems = getBuffItems();
    buffItems.forEach((item) => {
      scene.add(item);
    });

    magnetsItems.forEach((item) => {
      scene.remove(item);
      item.geometry.dispose();
      item.material.dispose();
    });

    magnetsItems = [];
    magnetsItems = getMagnets();
    magnetsItems.forEach((item) => {
      scene.add(item);
    });

    bonus_coin = 0;
    player.userData.check_jumpItem = false;
    player.userData.immortal = false;
    player.userData.jump_count = 0;
    player.userData.magnet = false;
    player.userData.collect_coin = true;
    dist_magnet = 0;
  });
  dead = false;
};

var render = () => {
  cones[0].visible = false;
  requestAnimationFrame(render);
  if (isPaused) return;
  // controls.update(); // Camera control
  if (checkGameSound() != true) {
    playGameSound();
  }

  function updateCoinPosition(player, coin) {
    let distance = coin.position.distanceTo(player.userData.pos);

    if (distance < 30) {
      let movement = player.userData.pos
        .add(new THREE.Vector3(0, 0, -2))
        .clone()
        .sub(coins[i].position)
        .normalize()
        .multiplyScalar(1.7);
      coin.position.add(movement);
    }
  }
  // Obstacles
  for (var i = 0; i < cones.length; i++) {
    cones[i].position.z += panSpeed;

    var x = new THREE.Vector3(cones[i].position.x, cones[i].position.y, cones[i].position.z + 8);
    let dist = player.userData.pos.distanceTo(x);
    let size = 3;
    if (cones[i].h > 5) size = 5;
    if (player.userData.immortal_check[i] && Math.floor(dist) >= size) {
      player.userData.immortal_check[i] = false;
      player.userData.immortal = false;
    }
    if (Math.floor(dist) < size && !player.userData.hit && i != 0) {
      if (player.userData.immortal) {
        player.userData.immortal_check[i] = true;
      } else {
        dead = true;
        stopGameSound();
        panSpeed = 0.399;
        player.userData.collect_coin = false;

        const score = document
          .querySelector(".score")
          .textContent.split(" ")[1];
        const maxScore = document
          .querySelector(".maxScore")
          .textContent.split(" ")[2];
        if (Number(score) > Number(maxScore)) {
          document.querySelector(".maxScore").innerHTML =
            "Max score: " + Math.floor(cones[0].position.z + 210);
        }
        document.querySelector(".lose").classList.add("show");
        setTimeout(() => {
          document.querySelector(".lose").classList.remove("show");
        }, 1000);
      }
    }
    if (cones[i].position.z > player.userData.pos.z + 15 && i != 0) {
      scene.remove(cones[i]);
      cones.splice(i, 1);
      i -= 1;
    }
  }

  // Coins
  for (var i = 0; i < coins.length; i++) {
    coins[i].position.z += panSpeed;

    let dist = player.userData.pos.distanceTo(coins[i].position);
    let size = 3;
    if (player.userData.magnet) {
      updateCoinPosition(player, coins[i]);
    }

    if (Math.floor(dist) < size && player.userData.collect_coin) {
      bonus_coin = bonus_coin + 1;
      scene.remove(coins[i]);
      coins[i].geometry.dispose();
      coins[i].material.dispose();
      coins.splice(i, 1);
      itemSound();
      i -= 1;
    }
  }
  coins.forEach((coin) => {
    coin.rotation.x += 0.01;
    coin.rotation.y += 0.01;
    coin.rotation.z += 0.01;
  });

  // Jump Items
  for (var i = 0; i < jumpItems.length; i++) {
    jumpItems[i].position.z += panSpeed;

    let dist = player.userData.pos.distanceTo(jumpItems[i].position);
    let size = 3;
    if (Math.floor(dist) < size) {
      player.userData.check_jumpItem = true;
      player.userData.jump_count = 0;
      scene.remove(jumpItems[i]);
      jumpItems[i].geometry.dispose();
      jumpItems[i].material.dispose();
      jumpItems.splice(i, 1);
      i -= 1;
      item2Sound();
    }
  }

  jumpItems.forEach((item) => {
    item.rotation.x += 0.01;
    item.rotation.y += 0.01;
    item.rotation.z += 0.01;
  });

  // Buff Items
  for (var i = 0; i < buffItems.length; i++) {
    buffItems[i].position.z += panSpeed;

    let dist = player.userData.pos.distanceTo(buffItems[i].position);
    let size = 3;
    if (Math.floor(dist) < size) {
      player.userData.immortal = true;
      scene.remove(buffItems[i]);
      buffItems[i].geometry.dispose();
      buffItems[i].material.dispose();
      buffItems.splice(i, 1);
      i -= 1;
      item2Sound();
    }
  }

  buffItems.forEach((item) => {
    item.rotation.x += 0.01;
    item.rotation.y += 0.01;
    item.rotation.z += 0.01;
  });

  // Magnet
  if (player.userData.magnet) {
    dist_magnet += panSpeed;
    if (dist_magnet >= 1000) {
      dist_magnet = 0;
      player.userData.magnet = false;
    }
  } else {
    dist_magnet = 0;
  }
  for (var i = 0; i < magnetsItems.length; i++) {
    magnetsItems[i].position.z += panSpeed;

    let dist = player.userData.pos.distanceTo(magnetsItems[i].position);
    let size = 3;
    if (Math.floor(dist) < size) {
      scene.remove(magnetsItems[i]);
      magnetsItems[i].geometry.dispose();
      magnetsItems[i].material.dispose();
      magnetsItems.splice(i, 1);
      i -= 1;
      itemSound();
      player.userData.magnet = true;
      dist_magnet = 0;
    }
  }

  magnetsItems.forEach((item) => {
    item.rotation.x += 0.01;
    item.rotation.y += 0.01;
    item.rotation.z += 0.01;
  });

  // Roads
  for (let i = 0; i < roads.length; i++) {
    roads[i].position.z += panSpeed;
    if (roads[i].position.z > 20) {
      roads[i].position.z -= 15 * 30;
    }
  }
  for (let i = 0; i < topRoads.length; i++) {
    topRoads[i].position.z += panSpeed;
    if (topRoads[i].position.z > 20) {
      topRoads[i].position.z -= 15 * 30;
    }
  }

  //Houses
  for (let i = 0; i < houses.length; i++) {
    houses[i].position.z += panSpeed;
    if (houses[i].position.z > 20) {
      houses[i].position.z -= poiRight[numberBuildings];
    }
  }


  //Buildings
  for (let i = 0; i < buildings.length; i++) {
    buildings[i].position.z += panSpeed;
    if (buildings[i].position.z > 20) {
      buildings[i].position.z -= poiLeft[numberBuildings];
    }
  }

  panSpeed += 0.001;

  if (dead) {
    crashSound();
    stopGameSound();

    player.userData.collect_coin = false;
    player.userData.magnet = false;
    dist_magnet = 0;

    //animation
    let pieces = [];

    // Traverse the policeCar model and apply the explosion effect to each child mesh
    // console.log("player",player);
    player.traverse(child => {
      // console.log(child);
      if (child instanceof THREE.Mesh) {
        console.log(child);
        // Create a mesh for the piece
        let piece = child.clone();

        // Position the piece at the position of the child
        piece.position.copy(player.position);

        // Add the piece to the scene and the pieces array
        scene.add(piece);
        pieces.push(piece);
      }
    });

    scene.remove(player);

    pieces.forEach(piece => {
      piece.userData.velocity = new THREE.Vector3((Math.random() - 0.5)/10, (Math.random() - 0.5)/10, (Math.random() - 0.5)/10);
    });

    function animate() {
      requestAnimationFrame(animate);
      pieces.forEach(piece => {
        piece.position.add(piece.userData.velocity);
      });
      renderer.render(scene, camera);
    }
  
    animate();

    const deadModalBody = document.getElementById("dead-modal-body");
    const score = document.createElement("h3");
    score.textContent = document.querySelector(".score").textContent;
    score.classList.add("dead-score-report");
    const maxScore = document.createElement("h3");
    maxScore.textContent = document.querySelector(".maxScore").textContent;
    maxScore.classList.add("dead-score-report");
    const coins = document.createElement("h3");
    coins.textContent = document.querySelector(".coin").textContent;
    coins.classList.add("dead-score-report");
    deadModalBody.appendChild(score);
    deadModalBody.appendChild(maxScore);
    deadModalBody.appendChild(coins);

    request
      .post("/user", {
        username,
        score: parseInt(score.textContent.split(" ")[1]),
        coins: bonus_coin,
      })
      .then((data) => {
        const totalCoinsElement = document.createElement("h3");
        totalCoinsElement.textContent =
          "Total coins: " + String(data?.data?.user?.coins);
        totalCoinsElement.classList.add("dead-score-report");
        deadModalBody.appendChild(totalCoinsElement);
      })
      .catch((error) => {
        console.log(error);
      });
    
    restart(() => {
      isPaused = true;
      stopGameSound();
      setTimeout(() => {
        $("#dead-modal").modal("show");
        scene.add(player);
        for (let i = 0; i < pieces.length; i++) {
          scene.remove(pieces[i]);
        }
      },2000);
    });
  }

  player.userData.acc.add(gravity);
  player.userData.vel.add(player.userData.acc);
  player.userData.pos.add(player.userData.vel);
  player.userData.acc.set(0, 0, 0);

  if (player.userData.wantX > player.userData.pos.x) player.userData.pos.x++;
  if (player.userData.wantX < player.userData.pos.x) player.userData.pos.x--;

  if (
    (player.userData.pos.y >= 13 && camera.rotation.z !== 0) ||
    (player.userData.pos.y <= 2 && camera.rotation.z == 0)
  ) {
    player.userData.jumping = false;
    player.userData.vel.y = 0;
  }

  player.userData.pos.clamp(
    new THREE.Vector3(-7.5, 2, 10),
    new THREE.Vector3(7.5, 13, 10)
  );

  pointLight.position.set(10, 7.5, player.userData.pos.z);

  document.querySelector(".score").innerHTML =
    "Score: " + Math.floor(cones[0].position.z + 210);

  var j;
  if (player.userData.check_jumpItem) {
    j = "High jump: " + (2 - player.userData.jump_count);
  } else {
    j = "High jump: " + 0;
  }
  document.querySelector(".highJump").innerHTML = j;

  var im;
  if (player.userData.immortal) {
    im = "Immortal: " + 1;
  } else {
    im = "Immortal: " + 0;
  }
  document.querySelector(".immortal").innerHTML = im;

  document.querySelector(".coin").innerHTML = "Coin: " + bonus_coin;

  player.position.set(
    player.userData.pos.x,
    player.userData.pos.y,
    player.userData.pos.z
  );

  if (!player.userData.jumping) {
    if (gravity.y >= 0) {
      camera.position.set(
        player.userData.pos.x,
        player.userData.pos.y - 3.5,
        player.userData.pos.z + 10
      );
    } else {
      camera.position.set(
        player.userData.pos.x,
        player.userData.pos.y + 4,
        player.userData.pos.z + 10
      );
    }
  }

  renderer.render(scene, camera);
};
render();
