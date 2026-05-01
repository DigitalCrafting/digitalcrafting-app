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

export type LineType = 'straight' | 'right_angle' | 'polygonal';

export interface Connection {
    from: Node,
    to: Node,
    lineType?: LineType
}

export interface Position {
    x: number,
    y: number
}

export type AnimatedElementType = 'node' | 'path';

export interface AnimatedElement {
    id: string,
    type: AnimatedElementType
}

export interface Animation {
    elements: AnimatedElement[]
}

