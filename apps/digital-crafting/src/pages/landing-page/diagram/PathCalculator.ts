import type {Connection, Node, Path, Position} from "./Types.ts";

/**
 * Assumptions:
 * - Nodes are sufficiently apart to create Paths,
 * - view space is 0,0 at top left corner, grows right and bottom
 * */
export function calculatePaths(nodes: Map<string, Node>, connections: Connection[], nodeSize: number): Path[] {
    if (connections && connections.length && nodes.size) {
        return connections.map(conn => calculatePath(nodes, conn, nodeSize)).filter(path => !!path);
    }

    return [];
}

function calculatePath(nodes: Map<string, Node>, conn: Connection, nodeSize: number): Path | null {
    const {from, to} = conn;
    const fromNode = nodes.get(from);
    const toNode = nodes.get(to);

    if (!fromNode || !toNode) {
        return null;
    }

    if (isStraightLine(fromNode, toNode)) {
        return calculateStraightLine(fromNode, toNode, nodeSize);
    }

}

function isStraightLine(first: Node, second: Node): boolean {
    const {x: firstX, y: firstY} = first;
    const {x: secondX, y: secondY} = second;

    return firstX === secondX || firstY === secondY;
}

export function calculateStraightLine(first: Node, second: Node, nodeSize: number): Path {
    const {id: firstId, x: firstX, y: firstY} = first;
    const {id: secondId, x: secondX, y: secondY} = second;
    const halfNodeSize = nodeSize / 2;

    const pathId = `${firstId}To${secondId}Path`;
    let startPoint: Position = {} as Position;
    let endPoint: Position = {} as Position;

    if (firstX === secondX) {
        // top/bottom
        startPoint.x = firstX + halfNodeSize;
        endPoint.x = startPoint.x;

        if (firstY > secondY) {
            // bottom -> top
            startPoint.y = firstY;
            endPoint.y = secondY + nodeSize;
        } else {
            // top -> bottom
            startPoint.y = firstY + nodeSize;
            endPoint.y = secondY;
        }

    } else {
        // isStraightLine should guarantee correct else
        // left/right
        startPoint.y = firstY + halfNodeSize;
        endPoint.y = startPoint.y;

        if (firstX > secondX) {
            // right -> left
            startPoint.x = firstX;
            endPoint.x = secondX + nodeSize;
        } else {
            // left -> right
            startPoint.x = firstX + nodeSize;
            endPoint.x = secondX;
        }
    }

    return {
        id: pathId,
        d: `M${startPoint.x} ${startPoint.y} L${endPoint.x} ${endPoint.y}`
    }
}

/**
 * For simplified diagrams I assume:
 * - startPoint, 2x 90deg angle, endPoint,
 * - horizontal vs vertical connection,
 * - nodeSize is even
 * */
export function calculatePolygonalLine(first: Node, second: Node, nodeSize: number): Path {
    const {id: firstId, x: firstX, y: firstY} = first;
    const {id: secondId, x: secondX, y: secondY} = second;
    const halfNodeSize = nodeSize / 2;

    const pathId = `${firstId}To${secondId}Path`;
    let startPoint: Position = {} as Position;
    let firstAnglePoint: Position = {} as Position;
    let secondAnglePoint: Position = {} as Position;
    let endPoint: Position = {} as Position;

    // TODO specify horizontal or vertical ?
    if (Math.abs(firstX - secondX) >= Math.abs(firstY - secondY)) {
        // horizontal
        const horizontalHalfPoint = Math.floor((firstX + secondX + nodeSize) / 2);
        if (firstX > secondX) {
            // right -> left
            startPoint.x = firstX;
            endPoint.x = secondX + nodeSize;
        } else {
            // left -> right
            startPoint.x = firstX + nodeSize;
            endPoint.x = secondX;
        }

        startPoint.y = firstY + halfNodeSize;
        endPoint.y = secondY + halfNodeSize;

        firstAnglePoint.x = horizontalHalfPoint;
        firstAnglePoint.y = startPoint.y;

        secondAnglePoint.x = horizontalHalfPoint;
        secondAnglePoint.y = endPoint.y;
    } else {
        // vertical
        const verticalHalfPoint = Math.floor((firstY + secondY + nodeSize) / 2);

        startPoint.x = firstX + halfNodeSize;
        endPoint.x = secondX + halfNodeSize;

        firstAnglePoint.x = startPoint.x;
        firstAnglePoint.y = verticalHalfPoint;

        secondAnglePoint.x = endPoint.x;
        secondAnglePoint.y = verticalHalfPoint;

        if (firstY > secondY) {
            // bottom -> top
            startPoint.y = firstY;
            endPoint.y = secondY + nodeSize;
        } else {
            // top -> bottom
            startPoint.y = firstY + nodeSize;
            endPoint.y = secondY;
        }
    }

    return {
        id: pathId,
        d: `M${startPoint.x} ${startPoint.y} L${firstAnglePoint.x} ${firstAnglePoint.y} L${secondAnglePoint.x} ${secondAnglePoint.y} L${endPoint.x} ${endPoint.y}`
    }
}





