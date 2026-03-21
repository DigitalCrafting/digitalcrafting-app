import type {GLTF} from "three-stdlib";
import MODEL_LOADER from "./ModelLoader.ts";
import * as THREE from "three";
import {Group, Object3D, Vector3} from "three";
import type {ThreeObj} from "./3dInterfaces.ts";

export class DroneObj implements ThreeObj {
  private gltfObj!: GLTF;
  private _model!: Group;
  private _animationMixer!: THREE.AnimationMixer;
  private _animationActions: THREE.AnimationAction[] = [];
  private _activeAction!: THREE.AnimationAction;
  private _lastAction!: THREE.AnimationAction;
  /**
   * Drone is circling around the center of the screen,
   * where island is. The angle is used to calculate
   * current position on the circle around the island.
   * */
  private _angle!: number;
  private _moveDirection: DroneMoveDirection = DroneMoveDirection.NONE;

  private constructor() {
  }

  public get model(): Group {
    return this._model;
  }

  public get position(): Vector3 {
    return this._model.position;
  }

  get animationMixer(): THREE.AnimationMixer {
    return this._animationMixer;
  }

  get animationActions(): THREE.AnimationAction[] {
    return this._animationActions;
  }

  get activeAction(): THREE.AnimationAction {
    return this._activeAction;
  }

  get lastAction(): THREE.AnimationAction {
    return this._lastAction;
  }

  public set moveDirection(value: DroneMoveDirection) {
    this._moveDirection = value;
  }

  public setPosition(x: number, y: number, z: number) {
    this._model.position.set(x, y, z);
  }

  public setScale(x: number, y: number, z: number): void {
    this._model.scale.set(x, y, z);
  }

  public add(...object: Object3D[]): void {
    this._model.add(...object);
  }

  public lookAt(vector: Vector3): void {
    this._model.lookAt(vector);
  }

  public move(): void {
    if (this._moveDirection === DroneMoveDirection.NONE) {
      return;
    }

    if (this._moveDirection === DroneMoveDirection.LEFT) {
      this._angle += 0.05;
    } else if (this._moveDirection === DroneMoveDirection.RIGHT) {
      this._angle -= 0.05;
    }

    this._model.position.x = Math.cos(this._angle) * 30;
    this._model.position.z = Math.sin(this._angle) * 30;
  }

  public static async create(): Promise<DroneObj> {
    let drone: DroneObj = new DroneObj();

    // Load model
    const model = new URL(
        '../../../assets/drone-game/models/drone.glb',
        import.meta.url
    ).href

    drone.gltfObj = await MODEL_LOADER.loadGLTF(model);
    console.dir(drone.gltfObj);
    drone._model = drone.gltfObj.scene;
    drone._animationMixer = new THREE.AnimationMixer(drone._model);

    const animationAction = drone._animationMixer.clipAction(drone.gltfObj.animations[0]);

    drone._animationActions.push(animationAction);
    drone._activeAction = drone._animationActions[0];

    // Set default values
    drone._angle = Math.PI * 0.2;
    drone.setPosition(
      Math.cos(drone._angle) * 30,
      20,
      Math.sin(drone._angle) * 30
    )
    drone.setScale(0.5, 0.5, 0.5)

    return drone;
  }
}

export enum DroneMoveDirection {
  LEFT,
  RIGHT,
  NONE
}
