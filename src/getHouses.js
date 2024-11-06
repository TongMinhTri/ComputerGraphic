import { 
  getHouseModel, 
  getBuildingModel,
  getBuilding1Model,
  getBuilding2LeftModel,
  getBuilding2RightModel,
  getBuilding3LeftModel,
  getBuilding3RightModel,
  getBuilding4Model,
  getBuilding5LeftModel,
  getBuilding5RightModel,
  getBuilding6LeftModel,
  getBuilding6RightModel,
  getBuilding7LeftModel,
  getBuilding7RightModel,
  getTownModel,
  getRightApartment,
  getLeftApartment
} from "./getModels";

const poiLeft = [ 
  0, 10, 17, 27, 37, 46, 59, 69, 79, 85, 
  97, 107, 114, 124, 134, 143, 156, 166, 176, 182, 
  194, 204, 211, 221, 231, 240, 253, 263, 273, 279, 
  291, 301, 308, 318, 328, 337, 350, 360, 370, 376
];

const poiRight = [
  0, 12, 22, 34, 44, 54, 63, 76, 86, 96, 
  102, 114, 124, 136, 146, 156, 165, 178, 188, 198, 
  204, 216, 226, 238, 248, 258, 267, 280, 290, 300,
  306, 318, 328, 340, 350, 360, 369, 382, 392, 402
]

const numberBuildings = 20;

export {
  numberBuildings,
  poiLeft,
  poiRight,
};

export default async function getHouses(t = 0) {
  const houses = [];
  if (t == 1) { //left
    for (let i = 0; i < numberBuildings; i++) {
      var model;
      if ( i % 10 == 0 ) {
        model = getLeftApartment();
      }
      else if (i % 10 == 1) {
        model = getBuildingModel();
      }
      else if (i % 10 == 2) {
        model = getBuilding1Model();
      }
      else if (i % 10 == 3) {
        model = getBuilding2LeftModel();
      }
      else if (i % 10 == 4) {
        model = getBuilding3LeftModel();
      }
      else if (i % 10 == 5) {
        model = getBuilding4Model();
      }
      else if (i % 10 == 6) {
        model = getBuilding5LeftModel();
      }
      else if (i % 10 == 7) {
        model = getBuilding6LeftModel();
      }
      else if (i % 10 == 8) {
        model = getBuilding7LeftModel();
      }
      else if (i % 10 == 9) {
        model = getTownModel();
      }
      model.position.z = -1 * poiLeft[i];
      model.position.y = 0;
      model.position.x = -18;
      model.rotation.x = Math.PI / 2;

      houses.push(model);
    }
  } else if (t == 0) { //right 
    for (let i = 0; i < numberBuildings; i++) {
      var model;
      if ( i % 10 == 0 ) {
        model = getHouseModel();
      }
      else if (i % 10 == 1) {
        model = getRightApartment();
      }
      else if (i % 10 == 2) {
        model = getTownModel();
      }
      else if (i % 10 == 3) {
        model = getBuilding1Model();
      }
      else if (i % 10 == 4) {
        model = getBuilding2RightModel();
      }
      else if (i % 10 == 5) {
        model = getBuilding3RightModel();
      }
      else if (i % 10 == 6) {
        model = getBuilding4Model();
      }
      else if (i % 10 == 7) {
        model = getBuilding5RightModel();
      }
      else if (i % 10 == 8) {
        model = getBuilding6RightModel();
      }
      else if (i % 10 == 9) {
        model = getBuilding7RightModel();
      }
      model.position.z = -1 * poiRight[i];
      model.position.y = 0;
      model.position.x = 18;
      model.rotation.x = Math.PI / 2;

      houses.push(model);
    }
  }

  return houses;
}
