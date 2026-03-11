import './LPArchitectureAnimation.scss';
import {Button} from "@zoria-ui/react";
import {playNode, playPath} from "../utils/LPAnimationUtils.ts";
import {LPAnimationDefs} from "./LPAnimationDefs.tsx";
import {NODE_SIZE} from "../utils/LPAnimationConsts.ts";
import {LANDING_PAGE_ANIMATIONS} from "../utils/LPAnimations.ts";
import type {Animation} from "../diagram/Types.ts";

export const LPArchitectureAnimation = () => {
    const triggerSequence = async (source?: string, playTrigger: boolean = false) => {
        if (!source) {
            // TODO random
            source = 'Smartphone1';
        }
        const animation: Animation = LANDING_PAGE_ANIMATIONS.getAnimation(source);
        // TODO packet pool
        const packet = document.getElementById('packet2') as SVGRectElement | null;
        if (!packet) return;

        for (let idx = playTrigger ? 0 : 1; idx < animation.elements.length; idx++) {
            const element =  animation.elements[idx];
            if (element.type === 'node') {
                const useElement = document.getElementById(element.id) as SVGUseElement | null;
                if (!useElement) continue;
                await playNode(useElement, 400);
            } else {
                const pathElement = document.getElementById(element.id) as SVGPathElement | null;
                if (!pathElement) continue;
                await playPath(pathElement, packet, 1200);
            }
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
                <rect id='packet1' className='packet'/>
                <rect id='packet2' className='packet'/>
                <rect id='packet3' className='packet'/>
                <rect id='packet4' className='packet'/>
                <rect id='packet5' className='packet'/>
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
        </svg>
    </>
}