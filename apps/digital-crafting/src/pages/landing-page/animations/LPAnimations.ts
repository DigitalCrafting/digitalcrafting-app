import {AnimatedDiagramBuilder, AnimationBuilder} from "./AnimationBuilder.ts";
import {
    Database1,
    Database2, Database3, Database4,
    Gateway1, Gateway2,
    Laptop1, Laptop2,
    MessageBroker, Pc1, Pc2,
    Scheduler1, Scheduler2,
    Server1,
    Server2, Server3, Server4,
    Smartphone1, Smartphone2
} from "../diagram/Nodes.ts";

export const LANDING_PAGE_ANIMATIONS: AnimatedDiagramBuilder = AnimatedDiagramBuilder.start()
.withAnimation(
    AnimationBuilder.withTrigger(Smartphone1)
        .then(Gateway1)
        .then(Server1)
        .then(Database1)
)
.withAnimation(
    AnimationBuilder.withTrigger(Laptop1)
        .then(Gateway1)
        .then(Server2)
        .then(Database2)
        .then(Scheduler1)
        .then(MessageBroker)
        .then(Server3)
        .then(Gateway2)
        .then(Smartphone2)
)
.withAnimation(
    AnimationBuilder.withTrigger(Pc1)
        .then(Gateway1)
        .then(Server1)
        .then(Database1)
)
.withAnimation(
    AnimationBuilder.withTrigger(Smartphone2)
        .then(Gateway2)
        .then(Server3)
        .then(Database3)
        .then(Scheduler2)
        .then(MessageBroker)
        .then(Server2)
        .then(Gateway1)
        .then(Smartphone1)
)
.withAnimation(
    AnimationBuilder.withTrigger(Pc2)
        .then(Gateway2)
        .then(Server4)
        .then(Database4)
)
.withAnimation(
    AnimationBuilder.withTrigger(Laptop2)
        .then(Gateway2)
        .then(Server3)
        .then(Database3)
)
.withAnimation(
    AnimationBuilder.withTrigger(Scheduler1)
        .then(Database2)
        .then(Scheduler1)
        .then(MessageBroker)
        .then(Server3)
        .then(Gateway2)
        .then(Laptop2)
)
.withAnimation(
    AnimationBuilder.withTrigger(Scheduler2)
        .then(Database3)
        .then(Scheduler2)
        .then(MessageBroker)
        .then(Server2)
        .then(Gateway1)
        .then(Smartphone1)
).build();