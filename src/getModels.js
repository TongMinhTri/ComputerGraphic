import { loadGLTF } from "./loader";
var car;
var ambulance;
var road;
var policeCar;
var redCar;
var whiteCar;
var yellowCar;
var road;
var house;
var building;
var building1;
var building2_left;
var building2_right;
var building3_left;
var building3_right;
var building4;
var building5_left;
var building5_right;
var building6_left;
var building6_right;
var building7_left;
var building7_right;
var town;
var left_apartment;
var right_apartment;
export default async function getModels() {
  car = await loadGLTF("models/car.glb");
  car.scale.set(0.12, 0.12, 0.12);

  ambulance = await loadGLTF("models/ambulance.glb");
  ambulance.scale.set(0.75, 0.75, 0.75);

  policeCar = await loadGLTF("models/police-car.glb");
  policeCar.scale.set(1.2, 1.2, 1.2);
  policeCar.rotation.y = Math.PI;

  road = await loadGLTF("models/road.glb");
  road.scale.set(15, 15, 15);


  redCar = await loadGLTF("models/red-car.glb");
  redCar.scale.set(5, 5, 5);
  redCar.rotation.y = Math.PI;
  redCar.position.z = 0;

  whiteCar = await loadGLTF("models/white-car.glb");
  whiteCar.scale.set(0.3, 0.3, 0.3);

  yellowCar = await loadGLTF("models/yellow-car.glb");
  yellowCar.scale.set(0.9, 0.9, 0.9);
  yellowCar.rotation.y = Math.PI;

  house = await loadGLTF("models/houses.glb");
  house.scale.set(1, 1, 1); // (16, 9, 5.5)

  building = await loadGLTF("models/building.glb");
  building.scale.set(1, 1, 0.5); // (10, 7, 25)

  building1 = await loadGLTF("models/building1.glb");
  building1.scale.set(1, 1, 1); // (10, 6, 8)

  building2_left = await loadGLTF("models/building2_left.glb");
  building2_left.scale.set(1, 1, 1); // (10, 11, 9)

  building2_right = await loadGLTF("models/building2_right.glb");
  building2_right.scale.set(1, 1, 1); // (10, 11, 9)

  building3_left = await loadGLTF("models/building3_left.glb");
  building3_left.scale.set(1, 1, 1); // (9, 11, 8)

  building3_right = await loadGLTF("models/building3_right.glb");
  building3_right.scale.set(1, 1, 0.4); // (9, 11, 8)

  building4 = await loadGLTF("models/building4.glb");
  building4.scale.set(1, 1, 0.4); // (8, 13, 20)

  building5_left = await loadGLTF("models/building5_left.glb");
  building5_left.scale.set(1, 1, 0.6); // (10, 8, 17)

  building5_right = await loadGLTF("models/building5_right.glb");
  building5_right.scale.set(1, 1, 0.6); // (10, 8, 17)

  building6_left = await loadGLTF("models/building6_left.glb");
  building6_left.scale.set(1, 1, 1); // (10, 6, 8)

  building6_right = await loadGLTF("models/building6_right.glb");
  building6_right.scale.set(1, 1, 1); // (10, 6, 8)

  building7_left = await loadGLTF("models/building7_left.glb");
  building7_left.scale.set(1, 1, 1); // (6, 11, 9)

  building7_right = await loadGLTF("models/building7_right.glb");
  building7_right.scale.set(1, 1, 1); // (6, 11, 9)

  town = await loadGLTF("models/town.glb");
  town.scale.set(1, 1, 1); // (12, 12, 5)

  left_apartment = await loadGLTF("models/left_apartment.glb");
  left_apartment.scale.set(1, 1, 1); // (10, 11, 9)

  right_apartment = await loadGLTF("models/right_apartment.glb");
  right_apartment.scale.set(1, 1, 1); // (10, 11, 9)

}

export const getPoliceCarModel = () => {
  return policeCar.clone();
};

export const getRedCarModel = () => {
  return redCar.clone();
};

export const getWhiteCarModel = () => {
  return whiteCar.clone();
};

export const getYellowCarModel = () => {
  return yellowCar.clone();
};

export const getCarModel = () => {
  return car.clone();
};

export const getAmbulanceModel = () => {
  return ambulance.clone();
};

export const getRoad = () => {
  return road.clone();
};

export const getRoadModel = () => {
  return road.clone();
};

export const getHouseModel = () => {
  return house.clone();
};

export const getBuildingModel = () => {
  return building.clone();
};


export const getLeftApartment = () => {
  return left_apartment.clone();
};

export const getRightApartment = () => {
  return right_apartment.clone();
};

export const getBuilding1Model = () => {
  return building1.clone();
};

export const getBuilding2LeftModel = () => {
  return building2_left.clone();
};

export const getBuilding2RightModel = () => {
  return building2_right.clone();
};

export const getBuilding3LeftModel = () => {
  return building3_left.clone();
};

export const getBuilding3RightModel = () => {
  return building3_right.clone();
};

export const getBuilding4Model = () => {
  return building4.clone();
};

export const getBuilding5LeftModel = () => {
  return building5_left.clone();
};

export const getBuilding5RightModel = () => {
  return building5_right.clone();
};

export const getBuilding6LeftModel = () => {
  return building6_left.clone();
};

export const getBuilding6RightModel = () => {
  return building6_right.clone();
};

export const getBuilding7LeftModel = () => {
  return building7_left.clone();
};

export const getBuilding7RightModel = () => {
  return building7_right.clone();
};

export const getTownModel = () => {
  return town.clone();
};