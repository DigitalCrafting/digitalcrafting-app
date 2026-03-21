import {IslandObj} from "../3d-definitions/IslandObj.ts";
import {DroneMoveDirection, DroneObj} from "../3d-definitions/DroneObj.ts";
import * as THREE from "three";
import type {RefObject} from "react";
import {OrbitControls} from "three-stdlib";
import type {ViewportConfig} from "../3d-definitions/3dInterfaces.ts";
import {DRONE_VIEW, MAIN_VIEW} from "./ViewPortsConfig.ts";

export class DroneGameController {
    private canvasRef: HTMLCanvasElement
    private renderer!: THREE.WebGLRenderer;
    private scene!: THREE.Scene;
    private ambientLight!: THREE.AmbientLight;
    private light!: THREE.HemisphereLight;
    private pointLight!: THREE.PointLight;
    private canvasSizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    private mainCamera!: THREE.PerspectiveCamera;
    private droneCamera!: THREE.PerspectiveCamera;
    private islandObj!: IslandObj;
    private droneObj!: DroneObj;
    private controls!: OrbitControls;

    constructor(_canvasRef: RefObject<HTMLCanvasElement>) {
        this.canvasRef = _canvasRef.current;
        this.canvasSizes = {
            width: this.canvasRef.clientWidth,
            height: this.canvasRef.clientHeight
        }
        this.initThreeJsObjects();
    }

    public async init() {
        this.droneObj = await DroneObj.create();
        this.islandObj = await IslandObj.create()
        this.setEventHandlers()
        this.createThreeJsView();
    }

    public start() {
        const clock = new THREE.Clock();
        /* ==== Main loop ==== */
        const animateGeometry = () => {
            this.controls.update();

            this.moveDrone();
            this.renderViewPorts();

            // Call animateGeometry again on the next frame
            this.droneObj.animationMixer.update(clock.getDelta());
            window.requestAnimationFrame(animateGeometry);
        };

        animateGeometry();
    }

    private initThreeJsObjects() {
        this.scene = new THREE.Scene();
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);

        this.pointLight = new THREE.PointLight(0xffffff, 0.5);
        this.pointLight.position.x = 2;
        this.pointLight.position.y = 2;
        this.pointLight.position.z = 2;

        this.scene.add(this.ambientLight);
        this.scene.add(this.light);
        this.scene.add(this.pointLight);

        this.scene.background = new THREE.Color();

        this.mainCamera = new THREE.PerspectiveCamera(
            75,
            this.canvasSizes.width / this.canvasSizes.height,
            0.001,
            1000
        );
        this.droneCamera = new THREE.PerspectiveCamera(
            75,
            this.canvasSizes.width / this.canvasSizes.height,
            0.001,
            1000
        );

        this.mainCamera.position.z = 50;
        this.mainCamera.position.y = 30;
    }

    private createThreeJsView() {
        const canvasBox = this.canvasRef;

        if (!canvasBox) {
            return;
        }

        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasBox,
        });
        this.controls = new OrbitControls(this.mainCamera, this.renderer.domElement);
        this.controls.update();

        this.renderer.setClearColor('white', 1);
        this.renderer.setSize(this.canvasSizes.width, this.canvasSizes.height);

        this.scene.add(this.islandObj.model, this.droneObj.model);
        this.scene.add(this.mainCamera);

        this.mainCamera.lookAt(this.islandObj.position);

        this.droneObj.activeAction.reset().play();
        this.droneObj.lookAt(this.islandObj.position);
        this.droneObj.add(this.droneCamera);

        this.droneCamera.position.set(0, 0, 5);
        this.droneCamera.lookAt(this.islandObj.position);
    }

    private setEventHandlers(): void {
        window.addEventListener('resize', () => {
            this.canvasSizes.width = this.canvasRef.clientWidth;
            this.canvasSizes.height = this.canvasRef.clientHeight;

            this.mainCamera.aspect = this.canvasSizes.width / this.canvasSizes.height;
            this.mainCamera.updateProjectionMatrix();
            this.droneCamera.aspect = this.mainCamera.aspect;
            this.droneCamera.updateProjectionMatrix();

            this.renderer.setSize(this.canvasSizes.width, this.canvasSizes.height);
            this.renderViewPorts();
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'a') {
                this.droneObj.moveDirection = DroneMoveDirection.LEFT;
            } else if (event.key === 'd') {
                this.droneObj.moveDirection = DroneMoveDirection.RIGHT;
            } else {
                this.droneObj.moveDirection = DroneMoveDirection.NONE;
            }
        });
        window.addEventListener('keyup', () => {
            this.droneObj.moveDirection = DroneMoveDirection.NONE;
        });
    }

    private setViewport(view: ViewportConfig) {
        const left = Math.floor( this.canvasSizes.width * view.left );
        const bottom = Math.floor( this.canvasSizes.height * view.bottom );
        const width = Math.floor( this.canvasSizes.width * view.width );
        const height = Math.floor( this.canvasSizes.height * view.height );

        this.renderer.setViewport( left, bottom, width, height );
        this.renderer.setScissor( left, bottom, width, height);
        this.renderer.setScissorTest( true );
        this.renderer.setClearColor( view.background );

        // Render viewport
        this.scene.background = view.background;
    }

    private moveDrone(): void {
        if (this.droneObj) {
            this.droneObj.move()
            this.droneObj.lookAt(this.islandObj.position);

            this.droneCamera.updateProjectionMatrix();
            this.droneCamera.position.set(0, 0, 5);
            this.droneCamera.lookAt(this.islandObj.position);
        }
    }

    private renderViewPorts(): void {
        // Main
        this.setViewport(MAIN_VIEW);
        this.renderer.render(this.scene, this.mainCamera);

        // Drone
        this.setViewport(DRONE_VIEW);
        this.renderer.render(this.scene, this.droneCamera);
    }
}