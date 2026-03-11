import type {Connection, Path} from "./Types.ts";
import {
    Database1,
    Database2, Database3, Database4,
    Gateway1,
    Gateway2,
    Laptop1, Laptop2, MessageBroker,
    Pc1, Pc2, Scheduler1, Scheduler2,
    Server1,
    Server2, Server3, Server4,
    Smartphone1,
    Smartphone2
} from "./Nodes.ts";
import {calculatePaths} from "./PathCalculator.ts";
import {NODE_SIZE} from "../utils/LPAnimationConsts.ts";

export const CONNECTIONS: Connection[] = [
    {
        from: Smartphone1,
        to: Gateway1
    },
    {
        from: Laptop1,
        to: Gateway1
    },
    {
        from: Pc1,
        to: Gateway1
    },
    {
        from: Gateway1,
        to: Server1
    },
    {
        from: Gateway1,
        to: Server2
    },
    {
        from: Server1,
        to: Database1
    },
    {
        from: Server2,
        to: Database2
    },
    {
        from: Smartphone2,
        to: Gateway2
    },
    {
        from: Laptop2,
        to: Gateway2
    },
    {
        from: Pc2,
        to: Gateway2
    },
    {
        from: Gateway2,
        to: Server3
    },
    {
        from: Gateway2,
        to: Server4
    },
    {
        from: Server3,
        to: Database3
    },
    {
        from: Server4,
        to: Database4
    },
    {
        from: Scheduler1,
        to: Database2,
    },
    {
        from: Database2,
        to: Scheduler1,
    },
    {
        from: Scheduler2,
        to: Database3
    },
    {
        from: Database3,
        to: Scheduler2
    },
    {
        from: Scheduler1,
        to: MessageBroker
    },
    {
        from: Scheduler2,
        to: MessageBroker
    },
    {
        from: MessageBroker,
        to: Server2
    },
    {
        from: MessageBroker,
        to: Server3
    }
]

export const CONNECTIONS_PATHS: Path[] = calculatePaths(CONNECTIONS, NODE_SIZE);