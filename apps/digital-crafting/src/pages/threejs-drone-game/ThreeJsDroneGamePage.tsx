import {useEffect, useRef} from "react";
import {DroneGameController} from "./game/DroneGameController.ts";
import styles from './ThreeJsDroneGamePage.module.scss';

const ThreeJsDroneGamePage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef) {
            return;
        }

        // @ts-ignore
        const gameController = new DroneGameController(canvasRef);
        (async () => {
            await gameController.init();
            gameController.start();
        })();
    }, []);

    return <canvas className={styles.DroneGame} ref={canvasRef} />
}

export {ThreeJsDroneGamePage};