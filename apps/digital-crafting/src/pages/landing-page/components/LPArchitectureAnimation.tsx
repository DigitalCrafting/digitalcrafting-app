import './LPArchitectureAnimation.scss';
import {playNode, playPath} from "../utils/LPAnimationUtils.ts";
import {LPAnimationDefs} from "./LPAnimationDefs.tsx";
import {NODE_SIZE} from "../utils/LPAnimationConsts.ts";
import {LANDING_PAGE_ANIMATIONS} from "../animations/LPAnimations.ts";
import type {Animation} from "../diagram/Types.ts";
import {DEFAULT_PACKET_POOL} from "../diagram/PacketPool.ts";
import {useEffect, useRef} from "react";

export const LPArchitectureAnimation = () => {
    const nodesMap = useRef<Map<string, SVGUseElement>>(new Map());
    const pathsMap = useRef<Map<string, SVGPathElement>>(new Map());
    const packetsMap = useRef<Map<string, SVGRectElement>>(new Map());

    useEffect(() => {
        LANDING_PAGE_ANIMATIONS.nodes.forEach(node => {
            const nodeElement = document.getElementById(node.id) as SVGUseElement | null;
            if (nodeElement) {
                nodesMap.current.set(node.id, nodeElement);
            }
        })
        LANDING_PAGE_ANIMATIONS.paths.forEach(path => {
            const pathElement = document.getElementById(path.id) as SVGPathElement | null;
            if (pathElement) {
                pathsMap.current.set(path.id, pathElement);
            }
        })
        DEFAULT_PACKET_POOL.getPacketIds().forEach(packetId => {
            const packetElement = document.getElementById(packetId) as SVGRectElement | null;
            if (packetElement) {
                packetsMap.current.set(packetId, packetElement);
            }
        })

        return () => {
            nodesMap.current.clear();
            pathsMap.current.clear();
            packetsMap.current.clear();
        }
    }, []);

    const triggerSequence = async (source?: string, playTrigger: boolean = false) => {
        let animation: Animation;
        if (!source) {
            animation = LANDING_PAGE_ANIMATIONS.getRandomAnimation();
            playTrigger = true;
        } else {
            animation = LANDING_PAGE_ANIMATIONS.getAnimation(source);
        }

        const packetId = DEFAULT_PACKET_POOL.acquire();
        if (!packetId) {
            return;
        }

        const packet = packetsMap.current.get(packetId);
        if (!packet) {
            DEFAULT_PACKET_POOL.release(packetId);
            return;
        }

        for (let idx = playTrigger ? 0 : 1; idx < animation.elements.length; idx++) {
            const element = animation.elements[idx];
            if (element.type === 'node') {
                const nodeElement = nodesMap.current.get(element.id);
                if (!nodeElement) continue;
                await playNode(nodeElement, 400);
            } else {
                const pathElement = pathsMap.current.get(element.id);
                if (!pathElement) continue;
                await playPath(pathElement, packet, 1200);
            }
        }

        DEFAULT_PACKET_POOL.release(packetId);
    }

    return <>
        <svg
            className='landing-page-animation'
            id='architectureAnimation'
            viewBox='0 0 1000 720'
            height={720}
            width={1000}
        >
            <LPAnimationDefs/>
            <g id='connections' className='connections'>
                {
                    LANDING_PAGE_ANIMATIONS.paths.map(path => {
                        return <path
                            key={path.id}
                            {...path}
                            stroke='currentColor' strokeWidth={2} fill='none'/>
                    })
                }

            </g>
            <g id='particles' fill="none">
                {
                    DEFAULT_PACKET_POOL.getPacketIds().map(id => {
                        return <rect id={id} key={id} className='packet'/>
                    })
                }
            </g>
            <g id='nodes'>
                {
                    LANDING_PAGE_ANIMATIONS.nodes.map((node) => {
                        return <use
                            key={node.id}
                            id={node.id}
                            href={node.iconHref}
                            x={node.x}
                            y={node.y}
                            width={NODE_SIZE}
                            height={NODE_SIZE}
                            className={`node-icon ${node.isTrigger ? 'node-icon-trigger' : ''}`}
                            onClick={node.isTrigger ? () => triggerSequence(node.id) : undefined}
                        />
                    })
                }
            </g>

            <use href='#send'
                 x={500 - NODE_SIZE / 2}
                 y={250}
                 width={NODE_SIZE}
                 height={NODE_SIZE}
                 className={`node-icon node-icon-trigger`}
                 onClick={() => triggerSequence()}
            />
        </svg>
    </>
}