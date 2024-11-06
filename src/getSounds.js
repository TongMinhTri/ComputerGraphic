import * as THREE from "three";

const crash = new Audio("sounds/crash.mp3");
const item = new Audio("sounds/Item.wav");
const item2 = new Audio("sounds/item2.mp3")
const gameSound2 = new Audio("sounds/gameSounds.mp3")
var gamePause = false;
var checkAdjustvolume = false;
let gameSound2Position = 0;

export function playGameSound() {
  if (!gamePause) {
    if(!checkAdjustvolume) {
      gameSound2.volume = 0.5;
    } 
    gameSound2.currentTime = gameSound2Position;
    gameSound2.play();
  }
}

export function stopGameSound() {
  if (gameSound2) {
    gameSound2Position = gameSound2.currentTime;
    gameSound2.pause();
    gameSound2.currentTime = 0;
    gamePause = true;
  }
}

export function gamePlay() {
  gamePause = false;
}

export function checkGameSound() {
  return !gameSound2.paused;
}


export function crashSound() {
  crash.play();
}

export function itemSound() {
  item.play();
}


export function item2Sound() {
  item2.play();
}


const volumeSlider = document.getElementById("volume-slider");

volumeSlider.addEventListener("input", function(event) {
  const volume = event.target.value; 
  adjustVolume(volume); 
});

function adjustVolume(volume) {
  gameSound2.volume = volume;
  crash.volume = volume;
  item.volume = volume;
  item2.volume = volume;
  checkAdjustvolume = true;
  console.log("Hello");
}