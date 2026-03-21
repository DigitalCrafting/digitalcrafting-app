import * as THREE from "three";
import type {ViewportConfig} from "../3d-definitions/3dInterfaces.ts";

const MAIN_VIEW: ViewportConfig = {
  left: 0,
  bottom: 0,
  width: 1.0,
  height: 1.0,
  background: new THREE.Color()
};

const DRONE_VIEW: ViewportConfig = {
  left: 0.75,
  bottom: 0,
  width: 0.25,
  height: 0.25,
  background: new THREE.Color().setRGB(0.5, 0.5, 0.7, THREE.SRGBColorSpace)
};

export {MAIN_VIEW, DRONE_VIEW};
