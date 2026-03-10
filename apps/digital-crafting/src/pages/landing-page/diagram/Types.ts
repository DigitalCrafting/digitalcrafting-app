export interface Node {
    id: string,
    iconHref: string,
    x: number,
    y: number,
    isTrigger?: boolean
}

export interface Path {
    id: string,
    d: string
}

export interface Connection {
    from: string,
    to: string
}

export interface AnimatingDiagram {
    nodes: Map<string, Node>;
    paths: Path[];
    connections: Connection[];
}

export interface Position {
    x: number,
    y: number
}

export type NodeDefs = Record<string, Node>


