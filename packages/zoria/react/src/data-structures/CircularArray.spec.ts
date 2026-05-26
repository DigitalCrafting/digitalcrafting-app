import {describe, it, expect} from "vitest";
import {CircularArray} from "./CircularArray";


describe('CircularArray', () => {
    it('should create with items', () => {
        // given
        const arr: number[] = [1, 2, 3, 4, 5];

        // when
        const circArr = CircularArray.of(arr);

        // then
        expect(circArr.length()).toBe(arr.length);
        expect(circArr.getItems()).toEqual(arr);
    });

    it('should return first element', () => {
        // given
        const circArr = CircularArray.of([1, 2, 3, 4, 5]);

        // when
        const first = circArr.getFirst();

        // then
        expect(first).toBe(1);
    });

    it('should return last element', () => {
        // given
        const circArr = CircularArray.of([1, 2, 3, 4, 5]);

        // when
        const last = circArr.getLast();

        // then
        expect(last).toBe(5);
    });

    it(`should correctly cycle while calling getPrev`, () => {
        // given
        const circArr = CircularArray.of([1, 2, 3, 4, 5]);
        const expectedValuesList = [5, 4, 3, 2, 1, 5, 4, 3, 2, 1]

        for (let i = 0; i < 10; i++) {
            const expectedValue = expectedValuesList[i];

            // when
            const prev = circArr.getPrev();

            // then
            expect(prev).toBe(expectedValue)
        }
    })

    it(`should correctly cycle while calling getNext`, () => {
        // given
        const circArr = CircularArray.of([1, 2, 3, 4, 5]);
        const expectedValuesList = [2, 3, 4, 5, 1, 2, 3, 4, 5, 1]
        for (let i = 0; i < 10; i++) {
            const expectedValue = expectedValuesList[i];
            // when
            const next = circArr.getNext();

            // then
            expect(next).toBe(expectedValue)
        }
    })
})