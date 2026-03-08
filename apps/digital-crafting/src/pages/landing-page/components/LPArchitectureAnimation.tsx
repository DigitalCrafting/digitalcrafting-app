import './LPArchitectureAnimation.scss';
import {Button} from "@zoria-ui/react";
import {playNode, playPath} from "../utils/LPAnimationUtils.ts";
import {LPAnimationDefs} from "./LPAnimationDefs.tsx";

const nodeSize = 36;

interface Node {
    id: string,
    icon: string,
    x: number,
    y: number
}

const Smartphone1: Node = {
    id: "smartphone_1",
    icon: '#smartphone',
    x: 0,
    y: 100
}

const Laptop1: Node = {
    id: "laptop_1",
    icon: '#laptop',
    x: 100,
    y: 100
}

const Pc1: Node = {
    id: "pc_1",
    icon: '#monitor',
    x: 200,
    y: 100
}

const Gateway1: Node = {
    id: "gateway_1",
    icon: '#network',
    x: 100,
    y: 250
}

const Server1: Node = {
    id: "server_1",
    icon: '#server',
    x: 100,
    y: 400
}

const Database1: Node = {
    id: "database_1",
    icon: '#database',
    x: 100,
    y: 550
}

export const LPArchitectureAnimation = () => {
    const triggerSequence = async (source?: string, playTrigger?: boolean = false) => {
        const server = document.getElementById(Server1.id) as SVGUseElement | null;
        const database = document.getElementById(Database1.id) as SVGUseElement | null;
        const gatewayToServerPath = document.getElementById('gt1_to_srv1_conn') as SVGPathElement | null;
        const serverToDatabasePath = document.getElementById('srv1_to_db1_conn') as SVGPathElement | null;

        if (!server || !database || !gatewayToServerPath || !serverToDatabasePath) return;

        if (source && playTrigger) {
            const trigger = document.getElementById(source) as SVGUseElement | null;
            if (trigger) {
                await playNode(trigger, 400);
            }
        }

        if (source === Smartphone1.id) {
            const path = document.getElementById('sm1_to_gt1_conn') as SVGPathElement | null;
            const gateway = document.getElementById(Gateway1.id) as SVGUseElement | null;
            const packet = document.getElementById('packet2') as SVGRectElement | null;

            if (!path || !gateway || !packet) return;

            await playPath(path, packet, 1200);
            await playNode(gateway, 400);
            await playPath(gatewayToServerPath, packet, 1200);
            await playNode(server, 400);
            await playPath(serverToDatabasePath, packet, 1200);
            await playNode(database, 400);
        } else if (source === Laptop1.id) {
            const path = document.getElementById('lptp1_to_gt1_conn') as SVGPathElement | null;
            const gateway = document.getElementById(Gateway1.id) as SVGUseElement | null;
            const packet = document.getElementById('packet3') as SVGRectElement | null;

            if (!path || !gateway || !packet) return;

            await playPath(path, packet, 600);
            await playNode(gateway, 400);
            await playPath(gatewayToServerPath, packet, 1200);
            await playNode(server, 400);
            await playPath(serverToDatabasePath, packet, 1200);
            await playNode(database, 400);
        } else if (source === Pc1.id) {
            const path = document.getElementById('pc1_to_gt1_conn') as SVGPathElement | null;
            const gateway = document.getElementById(Gateway1.id) as SVGUseElement | null;
            const packet = document.getElementById('packet4') as SVGRectElement | null;

            if (!path || !gateway || !packet) return;

            await playPath(path, packet, 1200);
            await playNode(gateway, 400);
            await playPath(gatewayToServerPath, packet, 1200);
            await playNode(server, 400);
            await playPath(serverToDatabasePath, packet, 1200);
            await playNode(database, 400);
        } else {
            const rand = Math.floor(Math.random() * 3);
            const play = [Smartphone1.id, Laptop1.id, Pc1.id][rand];
            await triggerSequence(play, true);
        }
    }

    const onClick = async () => {
        await triggerSequence();
    }

    return <><Button onClick={onClick}>Spawn particle</Button>
        <svg
            className='landing-page-animation'
            id='architectureAnimation'
            viewBox='0 0 1000 720'
            height={720}
            width={1000}
        >
            <LPAnimationDefs/>
            <g id='connections' className='connections'>
                <path id='sm1_to_gt1_conn'
                      d={`M${nodeSize / 2} ${Smartphone1.y + nodeSize} L${nodeSize / 2} ${Smartphone1.y + ((Gateway1.y - Smartphone1.y) / 2) + nodeSize / 2} L${Gateway1.x + nodeSize / 2} ${Smartphone1.y + ((Gateway1.y - Smartphone1.y) / 2) + nodeSize / 2} L${Gateway1.x + nodeSize / 2} ${Gateway1.y}`}
                      stroke='currentColor' strokeWidth={2} fill='none'/>
                <path id='lptp1_to_gt1_conn'
                      d={`M${Laptop1.x + nodeSize / 2} ${Laptop1.y + nodeSize} L${Laptop1.y + nodeSize / 2} ${Gateway1.y}`} stroke='currentColor'
                      strokeWidth={2} fill='none'/>
                <path id='pc1_to_gt1_conn'
                      d={`M${Pc1.x + nodeSize / 2} ${Pc1.y + nodeSize} L${Pc1.x + nodeSize / 2} ${Pc1.y + ((Gateway1.y - Pc1.y) / 2) + nodeSize / 2} L${Gateway1.x + nodeSize / 2} ${Pc1.y + ((Gateway1.y - Pc1.y) / 2) + nodeSize / 2} L${Gateway1.x + nodeSize / 2} ${Gateway1.y}`}
                      stroke='currentColor' strokeWidth={2} fill='none'/>

                <path id='gt1_to_srv1_conn'
                      d={`M${Gateway1.x + nodeSize / 2} ${Gateway1.y + nodeSize} L${Server1.x + nodeSize / 2} ${Server1.y}`}
                      stroke='currentColor' strokeWidth={2} fill='none'/>
                <path id='srv1_to_db1_conn'
                      d={`M${Server1.x + nodeSize / 2} ${Server1.y + nodeSize} L${Server1.x + nodeSize / 2} ${Database1.y}`}
                      stroke='currentColor' strokeWidth={2} fill='none'/>
            </g>
            <g id='particles' fill="none">
                <rect id='packet1' className='packet'/>
                <rect id='packet2' className='packet'/>
                <rect id='packet3' className='packet'/>
                <rect id='packet4' className='packet'/>
                <rect id='packet5' className='packet'/>
            </g>

            <g id='nodes'>
                <use id={Smartphone1.id} href={Smartphone1.icon} x={Smartphone1.x} y={Smartphone1.y} width={nodeSize}
                     height={nodeSize}
                     className="node-icon node-icon-trigger" onClick={() => triggerSequence(Smartphone1.id)}/>
                <use id={Laptop1.id} href={Laptop1.icon} x={Laptop1.x} y={Laptop1.y} width={nodeSize} height={nodeSize}
                     className="node-icon node-icon-trigger" onClick={() => triggerSequence(Laptop1.id)}/>
                <use id={Pc1.id} href={Pc1.icon} x={Pc1.x} y={Pc1.y} width={nodeSize} height={nodeSize}
                     className="node-icon node-icon-trigger" onClick={() => triggerSequence(Pc1.id)}/>

                <use id={Gateway1.id} href={Gateway1.icon} x={Gateway1.x} y={Gateway1.y} width={nodeSize}
                     height={nodeSize}
                     className="node-icon"/>
                <use id={Server1.id} href={Server1.icon} x={Server1.x} y={Server1.y} width={nodeSize}
                     height={nodeSize}
                     className="node-icon"/>
                <use id={Database1.id} href={Database1.icon} x={Database1.x} y={Database1.y} width={nodeSize}
                     height={nodeSize}
                     className="node-icon"/>
            </g>
        </svg>
        <svg
            className='landing-page-animation'
            id='architectureAnimation'
            viewBox='0 0 1000 100'
            height={100}
            width={1000}
        >
            <use id="server" href='#server' x={20} y={20} width={36} height={36} className="node-icon"/>
            <use id="database" href='#database' x={60} y={20} width={36} height={36} className="node-icon"/>
            <use id="hardDrive" href='#hardDrive' x={100} y={20} width={36} height={36} className="node-icon"/>
            <use id="monitor" href='#monitor' x={140} y={20} width={36} height={36} className="node-icon"/>
            <use id="laptop" href='#laptop' x={180} y={20} width={36} height={36} className="node-icon"/>
            <use id="smartphone" href='#smartphone' x={220} y={20} width={36} height={36} className="node-icon"/>
            <use id="wifi" href='#wifi' x={260} y={20} width={36} height={36} className="node-icon"/>
            <use id="router" href='#router' x={300} y={20} width={36} height={36} className="node-icon"/>
            <use id="satellite" href='#satellite' x={340} y={20} width={36} height={36} className="node-icon"/>
            <use id="network" href='#network' x={380} y={20} width={36} height={36} className="node-icon"/>
            <use id="messageBroker" href='#messageBroker' x={420} y={20} width={36} height={36} className="node-icon"/>
        </svg>
    </>
}