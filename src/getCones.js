import { getAmbulanceModel, getCarModel } from "./getModels";

export default async function getCones() {
  var cones = [];
  for (var i = 0; i < 1000; i++) {
    let cone = null;
    if (Math.random() <= 0.33) {
      cone = getCarModel();
      cone.h = 3;
    } else {
      cone = getAmbulanceModel();
      cone.h = 6;
    }
    cones.push(cone);
    cone.position.z = -i * 30 - 210;
    cone.originalZ = -i * 30 - 210;
    if (Math.random() <= 0.5) {
      cone.position.y = 15;
      cone.rotation.z = Math.PI;
    }
    let dirR = Math.random();
    if (dirR <= 0.33) cone.position.x = -7.5;
    if (dirR >= 0.66) cone.position.x = 7.5;
  }
  return cones;
}
