import type {Animation, Connection, LineType, Node, Path} from "./Types.ts";
import {NODE_SIZE} from "../utils/LPAnimationConsts.ts";
import {calculatePath} from "./PathCalculator.ts";

export class AnimationBuilder {
    private _connections: Connection[] = [];
    // @ts-ignore
    private currentNode: Node;

    private constructor(node: Node) {
        this.currentNode = node;
    }

    public static withTrigger(node: Node): AnimationBuilder {
        return new AnimationBuilder(node);
    }

    public then(to: Node, lineType: LineType | undefined = undefined): AnimationBuilder {
        this._connections.push({
            from: this.currentNode,
            to,
            lineType
        })
        this.currentNode = to;
        return this;
    }

    get connections() {
        return this._connections;
    }
}

export class AnimatedDiagramBuilder {
    private _nodes: Map<string, Node> = new Map();
    private _paths: Map<string, Path> = new Map();
    private _animations: Map<string, Animation> = new Map();

    private constructor(private nodeSize: number) {
    }

    public static start(nodeSize = NODE_SIZE) {
        return new AnimatedDiagramBuilder(nodeSize);
    }

    public withAnimation(animationBuilder: AnimationBuilder): AnimatedDiagramBuilder {
        const connections = animationBuilder.connections;
        const animation: Animation = {
            elements: []
        }
        connections.forEach(conn => {
            const path = calculatePath(conn, this.nodeSize);
            if (!path) {
                console.log(`Path couldn't be created for connection from ${conn.from.id} to ${conn.to.id}`);
                return;
            }
            this._nodes.set(conn.from.id, conn.from);
            this._nodes.set(conn.to.id, conn.to);
            this._paths.set(path.id, path);
            if (animation.elements.length === 0) {
                animation.elements.push({
                    id: conn.from.id,
                    type: 'node'
                });
            }
            animation.elements.push({
                id: path.id,
                type: 'path'
            });
            animation.elements.push({
                id: conn.to.id,
                type: 'node'
            });
        })
        this._animations.set(animation.elements[0].id, animation);
        return this;
    }

    get nodes(): Node[] {
        return Array.from(this._nodes.values());
    }

    get paths(): Path[] {
        return Array.from(this._paths.values());
    }

    getAnimation(id: string): Animation {
        const animation = this._animations.get(id);
        if (!animation) {
            throw Error(`No such animation: ${id}`);
        }
        return animation;
    }

}