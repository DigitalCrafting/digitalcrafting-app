import {describe, expect, it} from "vitest";
import {calculatePolygonalLine, calculateStraightLine} from "./PathCalculator.ts";
import type {Node} from "./Types.ts";

describe("PathCalculator", () => {
    const nodeSize = 36;

    describe ("calculateStraightLine", () => {
        it('should calculate top -> bottom correctly', () => {
            // given
            const first: Node = {
                id: 'first',
                x: 100,
                y: 100
            } as Node;
            const second: Node = {
                id: 'second',
                x: 100,
                y: 200
            } as Node;

            // when
            const actual = calculateStraightLine(first, second, nodeSize);

            // then
            expect(actual.d).toBe("M118 136 L118 200")
        });

        it('should calculate bottom -> top correctly', () => {
            // given
            const first: Node = {
                id: 'first',
                x: 100,
                y: 200
            } as Node;
            const second: Node = {
                id: 'second',
                x: 100,
                y: 100
            } as Node;

            // when
            const actual = calculateStraightLine(first, second, nodeSize);

            // then
            expect(actual.d).toBe("M118 200 L118 136")
        });

        it('should calculate left -> right correctly', () => {
            // given
            const first: Node = {
                id: 'first',
                x: 100,
                y: 100
            } as Node;
            const second: Node = {
                id: 'second',
                x: 200,
                y: 100
            } as Node;

            // when
            const actual = calculateStraightLine(first, second, nodeSize);

            // then
            expect(actual.d).toBe("M136 118 L200 118")
        });

        it('should calculate right -> left correctly', () => {
            // given
            const first: Node = {
                id: 'first',
                x: 200,
                y: 100
            } as Node;
            const second: Node = {
                id: 'second',
                x: 100,
                y: 100
            } as Node;

            // when
            const actual = calculateStraightLine(first, second, nodeSize);

            // then
            expect(actual.d).toBe("M200 118 L136 118")
        });
    })

    describe('calculatePolygonalLine', () => {
        it('should calculate horizontal top right path correctly', () => {
            // given
            const first: Node = {
                id: 'first',
                x: 200,
                y: 200
            } as Node;
            const second: Node = {
                id: 'second',
                x: 300,
                y: 100
            } as Node;

            // when
            const actual = calculatePolygonalLine(first, second, nodeSize);

            // then
            expect(actual.d).toBe("M236 218 L268 218 L268 118 L300 118")
        });

        it('should calculate horizontal bottom right path correctly', () => {
            // given
            const first: Node = {
                id: 'first',
                x: 200,
                y: 200
            } as Node;
            const second: Node = {
                id: 'second',
                x: 300,
                y: 300
            } as Node;

            // when
            const actual = calculatePolygonalLine(first, second, nodeSize);

            // then
            expect(actual.d).toBe("M236 218 L268 218 L268 318 L300 318")
        });

        it('should calculate horizontal top left path correctly', () => {
            // given
            const first: Node = {
                id: 'first',
                x: 200,
                y: 200
            } as Node;
            const second: Node = {
                id: 'second',
                x: 100,
                y: 100
            } as Node;

            // when
            const actual = calculatePolygonalLine(first, second, nodeSize);

            // then
            expect(actual.d).toBe("M200 218 L168 218 L168 118 L136 118")
        });

        it('should calculate horizontal bottom left path correctly', () => {
            // given
            const first: Node = {
                id: 'first',
                x: 200,
                y: 200
            } as Node;
            const second: Node = {
                id: 'second',
                x: 100,
                y: 300
            } as Node;

            // when
            const actual = calculatePolygonalLine(first, second, nodeSize);

            // then
            expect(actual.d).toBe("M200 218 L168 218 L168 318 L136 318")
        });

        it('should calculate vertical top right path correctly', () => {
            // given
            const first: Node = {
                id: 'first',
                x: 200,
                y: 200
            } as Node;
            const second: Node = {
                id: 'second',
                x: 250,
                y: 100
            } as Node;

            // when
            const actual = calculatePolygonalLine(first, second, nodeSize);

            // then
            expect(actual.d).toBe("M218 200 L218 168 L268 168 L268 136")
        });

        it('should calculate vertical bottom right path correctly', () => {
            // given
            const first: Node = {
                id: 'first',
                x: 200,
                y: 200
            } as Node;
            const second: Node = {
                id: 'second',
                x: 250,
                y: 300
            } as Node;

            // when
            const actual = calculatePolygonalLine(first, second, nodeSize);

            // then
            expect(actual.d).toBe("M218 236 L218 268 L268 268 L268 300")
        });

        it('should calculate vertical top left path correctly', () => {
            // given
            const first: Node = {
                id: 'first',
                x: 200,
                y: 200
            } as Node;
            const second: Node = {
                id: 'second',
                x: 150,
                y: 100
            } as Node;

            // when
            const actual = calculatePolygonalLine(first, second, nodeSize);

            // then
            expect(actual.d).toBe("M218 200 L218 168 L168 168 L168 136")
        });

        it('should calculate vertical bottom left path correctly', () => {
            // given
            const first: Node = {
                id: 'first',
                x: 200,
                y: 200
            } as Node;
            const second: Node = {
                id: 'second',
                x: 150,
                y: 300
            } as Node;

            // when
            const actual = calculatePolygonalLine(first, second, nodeSize);

            // then
            expect(actual.d).toBe("M218 236 L218 268 L168 268 L168 300")
        });
    })
})