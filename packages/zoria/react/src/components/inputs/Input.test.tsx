import {describe, expect, test} from "vitest";
import {render, screen} from "@testing-library/react";
import {Input} from "./Input";

describe('Input', () => {
    test('should render', () => {
        // given
        render(<Input data-testid='qa-test-id' />);

        // when
        const input = screen.getByTestId('qa-test-id');

        // then
        expect(input).toBeTruthy();
    })

})