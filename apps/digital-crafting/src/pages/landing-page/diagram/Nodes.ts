import type {Node} from "./Types.ts";

export const Smartphone1: Node = {
    id: "smartphone_1",
    iconHref: '#smartphone',
    x: 0,
    y: 100,
    isTrigger: true
}

export const Laptop1: Node = {
    id: "laptop_1",
    iconHref: '#laptop',
    x: 100,
    y: 100,
    isTrigger: true
}

export const Pc1: Node = {
    id: "pc_1",
    iconHref: '#monitor',
    x: 200,
    y: 100,
    isTrigger: true
}

export const Gateway1: Node = {
    id: "gateway_1",
    iconHref: '#network',
    x: 100,
    y: 250
}

export const Server1: Node = {
    id: "server_1",
    iconHref: '#server',
    x: 100,
    y: 400
}

export const Database1: Node = {
    id: "database_1",
    iconHref: '#database',
    x: 100,
    y: 550
}

export const DIAGRAM_NODES: Node[] = [
    Smartphone1,
    Laptop1,
    Pc1,
    Gateway1,
    Server1,
    Database1
]
