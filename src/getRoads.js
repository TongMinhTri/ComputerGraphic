import { getRoadModel } from "./getModels";

export default async function getRoads(y = -0.75, rotation = 0) {
  const roads = [];
  for (let i = 0; i < 15; i++) {
    const roadModel = getRoadModel();
    roadModel.position.z = -30 * i;
    roadModel.position.y = y;
    roadModel.rotation.z = rotation;

    roads.push(roadModel);
  }
  return roads;
}
