import type {GLTF} from "three-stdlib";
import MODEL_LOADER from "./ModelLoader.ts";
import {Group, Object3D, Vector3} from "three";
import type {ThreeObj} from "./3dInterfaces.ts";

export class IslandObj implements ThreeObj {
  private gltfObj!: GLTF;
  private _model!: Group;

  private constructor() {
  }

  public get model(): Group {
    return this._model;
  }

  public get position(): Vector3 {
    return this._model.position;
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

  public static async create(): Promise<IslandObj> {
    let obj: IslandObj = new IslandObj();
    const model = new URL(
        '../../../assets/drone-game/models/foxs_islands.glb',
        import.meta.url
    ).href
    obj.gltfObj = await MODEL_LOADER.loadGLTF(model);
    obj._model = obj.gltfObj.scene;

    return obj;
  }
}
