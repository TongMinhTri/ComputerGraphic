import * as THREE from "three";

var scene = new THREE.Scene();
// Màu nền hai bên
const spaceTexture = new THREE.TextureLoader().load("images/background.jpeg");
scene.background = spaceTexture;
// Sương mù
scene.fog = new THREE.Fog("#001d45", 10, 300);

var camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.z = 15;
camera.position.y = 2;

var player = new THREE.Object3D();
player.userData = {
  pos: new THREE.Vector3(0, 2, 10),
  vel: new THREE.Vector3(0, 0, 0),
  acc: new THREE.Vector3(0, 0, 0),
  hit: false,
  wantX: 0,
  jumping: false,
  check_jumpItem: false,
  jump_count: 0,
  immortal: false,
  immortal_check: new Array(1000).fill(false),
  magnet: false,
  collect_coin: true,
};

var gravity = new THREE.Vector3(0, -0.04, 0);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Nền
var floorgeo = new THREE.BoxGeometry(30, 0.5, 500);
const roadTexture = new THREE.TextureLoader().load(
  "textures/road.png",
  (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0, 0);
    texture.repeat.set(1, 10);
  }
);
var floormat = new THREE.MeshLambertMaterial({ map: roadTexture });
var floormesh = new THREE.Mesh(floorgeo, floormat);

// Trần
var ceilinggeo = new THREE.BoxGeometry(30, 0.5, 500);
var ceilingmat = new THREE.MeshLambertMaterial({ color: 0x0000aa });
var ceilingmesh = new THREE.Mesh(ceilinggeo, ceilingmat);
ceilingmesh.position.y = 15;

// Ánh sáng
var hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0xaaaa88, 1);

var pointLight = new THREE.PointLight(0xff0000, 1, 100);
pointLight.position.set(10, 7.5, player.userData.pos.z);

scene.add(hemisphereLight);
scene.add(pointLight);

export {
  scene,
  camera,
  player,
  gravity,
  renderer,
  floormesh,
  ceilingmesh,
  hemisphereLight,
  pointLight,
};
