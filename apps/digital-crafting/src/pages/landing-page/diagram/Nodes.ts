import type {Node} from "./Types.ts";
import {NODE_SIZE} from "../utils/LPAnimationConsts.ts";

/* ================
 * Left side
 * ================ */
export const Smartphone1: Node = {
    id: "smartphone1",
    iconHref: '#smartphone',
    x: 0,
    y: 100,
    isTrigger: true
}

export const Laptop1: Node = {
    id: "laptop1",
    iconHref: '#laptop',
    x: 100,
    y: 100,
    isTrigger: true
}

export const Pc1: Node = {
    id: "pc1",
    iconHref: '#monitor',
    x: 200,
    y: 100,
    isTrigger: true
}

export const Gateway1: Node = {
    id: "gateway1",
    iconHref: '#network',
    x: 100,
    y: 250
}

export const Server1: Node = {
    id: "server1",
    iconHref: '#server',
    x: 50,
    y: 400
}
export const Server2: Node = {
    id: "server2",
    iconHref: '#server',
    x: 150,
    y: 400
}

export const Database1: Node = {
    id: "database1",
    iconHref: '#database',
    x: 50,
    y: 550
}
export const Database2: Node = {
    id: "database2",
    iconHref: '#database',
    x: 150,
    y: 550
}

/* ================
 * Right side
 * ================ */
export const Smartphone2: Node = {
    id: "smartphone2",
    iconHref: '#smartphone',
    x: 1000 - NODE_SIZE,
    y: 100,
    isTrigger: true
}

export const Laptop2: Node = {
    id: "laptop2",
    iconHref: '#laptop',
    x: 900 - NODE_SIZE,
    y: 100,
    isTrigger: true
}

export const Pc2: Node = {
    id: "pc2",
    iconHref: '#monitor',
    x: 800 - NODE_SIZE,
    y: 100,
    isTrigger: true
}

export const Gateway2: Node = {
    id: "gateway2",
    iconHref: '#network',
    x: 900 - NODE_SIZE,
    y: 250
}


export const Server3: Node = {
    id: "server3",
    iconHref: '#server',
    x: 850 - NODE_SIZE,
    y: 400
}
export const Server4: Node = {
    id: "server4",
    iconHref: '#server',
    x: 950 - NODE_SIZE,
    y: 400
}

export const Database3: Node = {
    id: "database3",
    iconHref: '#database',
    x: 850 - NODE_SIZE,
    y: 550
}
export const Database4: Node = {
    id: "database4",
    iconHref: '#database',
    x: 950 - NODE_SIZE,
    y: 550
}

/* ================
 * Middle
 * ================ */
export const Scheduler1: Node = {
    id: "Scheduler1",
    iconHref: '#scheduler',
    x: 300,
    y: 550,
    isTrigger: true
}
export const Scheduler2: Node = {
    id: "Scheduler2",
    iconHref: '#scheduler',
    x: 700 - NODE_SIZE,
    y: 550,
    isTrigger: true
}

export const MessageBroker: Node = {
    id: "MessageBroker",
    iconHref: '#messageBroker',
    x: 500 - NODE_SIZE / 2,
    y: 475
}


export const DIAGRAM_NODES: Node[] = [
    Smartphone1,
    Laptop1,
    Pc1,
    Gateway1,
    Server1,
    Database1,
    Server2,
    Database2,

    Smartphone2,
    Laptop2,
    Pc2,
    Gateway2,
    Server3,
    Database3,
    Server4,
    Database4,

    Scheduler1,
    Scheduler2,
    MessageBroker
]
