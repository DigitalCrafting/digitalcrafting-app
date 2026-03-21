import {Color, Group, Object3D, Vector3} from "three";

interface ViewportConfig {
  left: number,
  bottom: number,
  width: number,
  height: number,
  background: Color
}

interface ThreeObj {
  get model(): Group;
  get position(): Vector3;
  setPosition(x: number, y: number, z: number): void;
  setScale(x: number, y: number, z: number): void;
  add(...object: Object3D[]): void;
  lookAt(vector: Vector3): void;
}

export type { ViewportConfig, ThreeObj }
