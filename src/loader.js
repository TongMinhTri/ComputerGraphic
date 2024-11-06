import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { renderer } from "./declaring";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();
const rgbeLoader = new RGBELoader();
const gltfLoader = new GLTFLoader();

const loadMTL = async (modelName) => {
  return new Promise((resolve, reject) => {
    mtlLoader.load(
      `models/${modelName}/material.mtl`,
      function (materials) {
        materials.preload();
        resolve(materials);
      },
      undefined,
      function (error) {
        console.error(error);
        reject(error);
      }
    );
  });
};

const loadOBJ = async (modelName, material) => {
  return new Promise((resolve, reject) => {
    material && objLoader.setMaterials(material);

    objLoader.load(
      `models/${modelName}/model.obj`,
      function (object) {
        resolve(object);
      },
      undefined,
      function (error) {
        console.error(error);
        reject(error);
      }
    );
  });
};

const loadRGBE = async (filename) => {
  return new Promise((resolve, reject) => {
    rgbeLoader.load("environments/envmap.hdr", function (texture) {
      const envMap = texture;
      const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
        envMap.image.height
      );
      cubeRenderTarget.fromEquirectangularTexture(renderer, envMap);
      resolve(cubeRenderTarget.texture);
    });
  });
};

const loadGLTF = async (filepath) => {
    return new Promise((resolve, reject) => {
    gltfLoader.load(
      filepath,
      function (gltf) {
        resolve(gltf.scene);
      },
      (xhr) => {
        console.log(`${filepath}: ${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.log(error);
      }
    );
  });
};

export { loadOBJ, loadMTL, loadRGBE, loadGLTF };
