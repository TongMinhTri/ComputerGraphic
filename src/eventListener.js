import gsap from "gsap";
import { gravity, player, camera, renderer, scene } from "./declaring";
import request from "./request";
import {
  setIsPaused,
  restart,
  getUsername,
  setUsername,
  getIsPaused,
  setTotalCoins,
} from "../main";
import {
  getRedCarModel,
  getWhiteCarModel,
  getYellowCarModel,
} from "./getModels";

import { gamePlay, playGameSound, stopGameSound } from "./getSounds";

export default function eventListener() {
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  const rankModalBody = document.getElementById("rank-modal-body");
  const rankButtons = document.querySelectorAll(".rank-btn");
  rankButtons.forEach((rankButton) => {
    rankButton.addEventListener("click", async () => {
      const loading = document.createElement("div");
      loading.innerHTML = "Loading...";
      rankModalBody.appendChild(loading);
      const response = await request.get("/user");
      if (response) {
        rankModalBody.innerHTML = "";
        // response.data.forEach((element, index) => {
        //   const rank = document.createElement("div");
        //   rank.classList.add("rank-list");
        //   rank.innerHTML = `<span>${index + 1}</span> ${element.username} ${
        //     element.score
        //   }`;
        //   rankModalBody.appendChild(rank);
        // });
        const table = document.createElement("table");
        table.classList.add("rank-list", "table-striped");

        const headerRow = document.createElement("tr");

        const rankHeader = document.createElement("th");
        rankHeader.textContent = "Rank";

        const usernameHeader = document.createElement("th");
        usernameHeader.textContent = "Username";

        const scoreHeader = document.createElement("th");
        scoreHeader.textContent = "Score";

        headerRow.appendChild(rankHeader);
        headerRow.appendChild(usernameHeader);
        headerRow.appendChild(scoreHeader);

        table.appendChild(headerRow);

        response.data.forEach((element, index) => {
          const row = document.createElement("tr");

          const rankCell = document.createElement("td");
          rankCell.textContent = index + 1;

          const usernameCell = document.createElement("td");
          usernameCell.textContent = element.username;

          const scoreCell = document.createElement("td");
          scoreCell.textContent = element.score;

          row.appendChild(rankCell);
          row.appendChild(usernameCell);
          row.appendChild(scoreCell);

          table.appendChild(row);
        });
        rankModalBody.appendChild(table);
      }
    });
  });

  const skinButtons = document.querySelectorAll(".skin-btn");
  const coins = document.getElementById("car-total-coin");
  skinButtons.forEach((skinButton) => {
    skinButton.addEventListener("click", async () => {
      const response = await request.get("/user/" + getUsername());
      const data = response?.data;
      coins.innerHTML = data?.coins;
      const carButton = document.getElementsByClassName("car-button");
      data?.skins.forEach((skin, index) => {
        if (
          skin &&
          index !== 0 &&
          !carButton[index].classList.contains("yellow-button")
        ) {
          carButton[index].classList.add("green-button");
          carButton[index].innerHTML = "Choose";
        }
      });
    });
  });

  const carButton = document.querySelectorAll(".car-button");
  carButton.forEach((button, index) => {
    button.addEventListener("click", async () => {
      if (button.classList.contains("green-button")) {
        player.remove(player.children[0]);
        switch (index) {
          case 0:
            break;

          case 1:
            player.add(getRedCarModel());
            break;

          case 2:
            player.add(getWhiteCarModel());
            break;

          default:
            player.add(getYellowCarModel());
            break;
        }
        scene.add(player);

        // Nut hien tai
        button.innerHTML = "Chosen";
        button.classList.remove("green-button");
        button.classList.add("yellow-button");

        // Nut khac
        carButton.forEach((carButton, i) => {
          if (i !== index && carButton.classList.contains("yellow-button")) {
            carButton.innerHTML = "Choose";
            carButton.classList.remove("yellow-button");
            carButton.classList.add("green-button");
          }
        });
        restart();
        setIsPaused(false);
        $("#car-modal").modal("hide");

        var elements = document.querySelectorAll(".dead-score-report");

        elements.forEach(function (element) {
          element.remove();
        });
      } else {
        try {
          await request.post("/buy", {
            username: getUsername(),
            skinId: index,
          });

          player.remove(player.children[0]);
          switch (index) {
            case 0:
              break;

            case 1:
              player.add(getRedCarModel());
              break;

            case 2:
              player.add(getWhiteCarModel());
              break;

            default:
              player.add(getYellowCarModel());
              break;
          }
          scene.add(player);

          button.innerHTML = "Chosen";
          button.classList.add("yellow-button");
          carButton.forEach((carButton, i) => {
            if (i !== index && carButton.classList.contains("yellow-button")) {
              carButton.innerHTML = "Choose";
              carButton.classList.remove("yellow-button");
              carButton.classList.add("green-button");
            }
          });
          restart();
          setIsPaused(false);
          $("#car-modal").modal("hide");

          var elements = document.querySelectorAll(".dead-score-report");

          elements.forEach(function (element) {
            element.remove();
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  });

  const rankOkayButton = document.getElementById("rank-okay-btn");
  rankOkayButton.addEventListener("click", () => {
    rankModalBody.innerHTML = "";
  });

  const resumeButtons = document.getElementsByClassName("resume-btn");
  for (let i = 0; i < resumeButtons.length; i++) {
    resumeButtons[i].addEventListener("click", () => {
      gamePlay();
      playGameSound();
      setIsPaused(false);

      var elements = document.querySelectorAll(".dead-score-report");

      elements.forEach(function (element) {
        element.remove();
      });
    });
  }

  async function handleLogin(event) {
    event.preventDefault();
    const inputValue = document.getElementById("username-input").value;
    if (inputValue.trim() === "") {
      return;
    }
    const loginMessage = document.getElementById("login-message");
    setUsername(inputValue.trim());
    loginMessage.innerHTML = "Loading...";
    try {
      const response = await request.get(`/user/${getUsername()}`);
      if (response.data) {
        document.querySelector(".maxScore").innerHTML =
          "Max score: " + response.data.score;
        $("#login-modal").modal("hide");
        setIsPaused(false);
        response.data.coins && setTotalCoins(response.data.coins);
      }
    } catch (error) {
      // isPaused = false;
      setIsPaused(false);
      $("#login-modal").modal("hide");
      await request.post("/user", { username: getUsername(), score: 0 });
    } finally {
      loginMessage.innerHTML = "";
      document.getElementById("username-input").value = "";
      restart();
      setIsPaused(false);
    }
  }

  const handlePause = () => {
    if (!getIsPaused()) {
      stopGameSound();
      setIsPaused(true);
      $("#pause-modal").modal("show");
    }
  };

  document.getElementById("login-form").addEventListener("submit", handleLogin);

  const pauseButton = document.getElementById("pause-btn");
  pauseButton.addEventListener("click", handlePause);

  const restartButton = document.getElementById("restart-btn");
  restartButton.addEventListener("click", () => {
    restart();
    setIsPaused(false);
  });

  const logoutButtons = document.querySelectorAll(".logout-btn");
  logoutButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setUsername(null);
      document.querySelector(".maxScore").innerHTML = "Max score: 0";

      var elements = document.querySelectorAll(".dead-score-report");

      elements.forEach(function (element) {
        element.remove();
      });
    });
  });

  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  let lastTap;
  let move = false;
  let swipe = false;

  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    let now = new Date().getTime();
    // console.log(now-lastTap);
    console.log("move", move);
    if (lastTap && now - lastTap < 500 && !swipe) {
      console.log("double tap");
      lastTap = now;
      gravity.y *= -1;
      player.userData.vel.y = 0;
      let cameraTl = gsap.timeline();
      if (camera.rotation.z == 0) {
        cameraTl.to(camera.rotation, 0.2, { z: Math.PI });
        player.rotation.x = Math.PI;
        player.rotation.y = Math.PI;
      } else {
        cameraTl.to(camera.rotation, 0.2, { z: Math.PI * 2 });
        cameraTl.to(camera.rotation, 0, { z: 0 });
        player.rotation.x = 0;
        player.rotation.y = 0;
      }
      lastTap = now;
    } else {
      lastTap = now;
    }
  }

  function handleTouchMove(e) {
    move = true;
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;
    swipe = true;
  }

  function handleTouchEnd() {
    if (move) {
      let dx = touchEndX - touchStartX;
      let dy = touchEndY - touchStartY;

      if (Math.abs(dx) >= Math.abs(dy)) {
        //left and right
        if (dx > 0) {
          if (camera.rotation.z == 0) {
            if (player.userData.wantX <= 0) player.userData.wantX += 7.5;
            move = false;
          } else {
            if (player.userData.wantX >= 0) player.userData.wantX -= 7.5;
            move = false;
          }
        } else {
          if (camera.rotation.z == 0) {
            console.log("rẽ trái");
            if (player.userData.wantX >= 0) player.userData.wantX -= 7.5;
            move = false;
          } else {
            if (player.userData.wantX <= 0) player.userData.wantX += 7.5;
            move = false;
          }
        }
      } else {
        //jumping
        if (dy <= 0) {
          if (camera.rotation.z == 0) {
            if (!player.userData.jumping) {
              if (player.userData.check_jumpItem) {
                if (player.userData.jump_count < 2) {
                  player.userData.jumping = true;
                  player.userData.jump_count += 1;
                  player.userData.acc.y += 0.6;
                } else {
                  player.userData.jumping = true;
                  player.userData.acc.y += 0.5;
                  player.userData.jump_count = 0;
                  player.userData.check_jumpItem = false;
                }
              } else {
                player.userData.jumping = true;
                player.userData.acc.y += 0.5;
              }
            }
            move = false;
          } else {
            if (!player.userData.jumping) {
              if (player.userData.check_jumpItem) {
                if (player.userData.jump_count < 2) {
                  player.userData.jumping = true;
                  player.userData.jump_count += 1;
                  player.userData.acc.y -= 0.6;
                } else {
                  player.userData.jumping = true;
                  player.userData.acc.y -= 0.5;
                  player.userData.jump_count = 0;
                  player.userData.check_jumpItem = false;
                }
              } else {
                player.userData.jumping = true;
                player.userData.acc.y -= 0.5;
              }
            }
            move = false;
          }
        } else {
          if (camera.rotation.z == 0) {
            player.userData.acc.y -= 0.5;
            if (player.userData.pos.y == 0) {
              player.userData.jumping = false;
            }
          } else {
            player.userData.acc.y += 0.5;
            if (player.userData.pos.y == 0) {
              player.userData.jumping = false;
            }
          }
        }
      }
    } else {
      swipe = false;
    }
  }

  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);
  document.addEventListener("touchend", handleTouchEnd, false);

  document.addEventListener("keyup", (e) => {
    if (e.code === "ShiftLeft") {
      gravity.y *= -1;
      player.userData.vel.y = 0;
      let cameraTl = gsap.timeline();
      if (camera.rotation.z == 0) {
        cameraTl.to(camera.rotation, 0.2, { z: Math.PI });
        player.rotation.x = Math.PI;
        player.rotation.y = Math.PI;
      } else {
        cameraTl.to(camera.rotation, 0.2, { z: Math.PI * 2 });
        cameraTl.to(camera.rotation, 0, { z: 0 });
        player.rotation.x = 0;
        player.rotation.y = 0;
      }
    }
    if (e.code === "KeyP") {
      handlePause();
    }
    if (camera.rotation.z == 0) {
      if (e.code === "ArrowUp" && !player.userData.jumping) {
        if (player.userData.check_jumpItem) {
          if (player.userData.jump_count < 2) {
            player.userData.jumping = true;
            player.userData.jump_count += 1;
            player.userData.acc.y += 0.6;
          } else {
            player.userData.jumping = true;
            player.userData.acc.y += 0.5;
            player.userData.jump_count = 0;
            player.userData.check_jumpItem = false;
          }
        } else {
          player.userData.jumping = true;
          player.userData.acc.y += 0.5;
        }
      }
      if (e.code === "ArrowLeft") {
        if (player.userData.wantX >= 0) player.userData.wantX -= 7.5;
      }
      if (e.code === "ArrowRight") {
        if (player.userData.wantX <= 0) player.userData.wantX += 7.5;
      }
      if (e.code === "ArrowDown") {
        player.userData.acc.y -= 0.5;
        if (player.userData.pos.y == 0) {
          player.userData.jumping = false;
        }
      }
    } else {
      if (e.code === "ArrowUp" && !player.userData.jumping) {
        if (player.userData.check_jumpItem) {
          if (player.userData.jump_count < 2) {
            player.userData.jumping = true;
            player.userData.jump_count += 1;
            player.userData.acc.y -= 0.6;
          } else {
            player.userData.jumping = true;
            player.userData.acc.y -= 0.5;
            player.userData.jump_count = 0;
            player.userData.check_jumpItem = false;
          }
        } else {
          player.userData.jumping = true;
          player.userData.acc.y -= 0.5;
        }
      }
      if (e.code === "ArrowRight") {
        if (player.userData.wantX >= 0) player.userData.wantX -= 7.5;
      }
      if (e.code === "ArrowLeft") {
        if (player.userData.wantX <= 0) player.userData.wantX += 7.5;
      }
      if (e.code === "ArrowDown") {
        player.userData.acc.y += 0.5;
        if (player.userData.pos.y == 0) {
          player.userData.jumping = false;
        }
      }
    }
  });
}
