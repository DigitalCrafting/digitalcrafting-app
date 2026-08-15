import '@testing-library/jest-dom/vitest';
import {afterEach, describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import {NumberInput} from "./NumberInput";

describe('NumberInput', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    })

    it('should render', () => {
        // given
        render(
            <NumberInput data-testid='qa-test-id'/>
        );

        // when
        const input = screen.getByTestId('qa-test-id');

        // then
        expect(input).toBeTruthy();
    })

    it('should focus', async () => {
        // given
        const user = userEvent.setup();
        render(
            <NumberInput data-testid='qa-test-id'/>
        );

        // when
        const input = screen.getByTestId('qa-test-id-input');
        await user.click(input);

        // then
        expect(input).toHaveFocus();
    })

    it('should emit onChange event', async () => {
        // given
        const user = userEvent.setup();
        const onChangeMock = vi.fn();
        render(
            <NumberInput data-testid='qa-test-id' onChange={onChangeMock}/>
        );

        // when
        const input = screen.getByTestId('qa-test-id-input');
        await user.type(input, "42");

        // then
        expect(onChangeMock).toHaveBeenCalledWith(42);
    })

    it('should render with default value', async () => {
        // given
        render(
            <NumberInput data-testid='qa-test-id' defaultValue={69}/>
        );

        // when
        const input = screen.getByTestId('qa-test-id-input');

        // then
        expect(input).toHaveValue("69");
    })

    it('should render with value when controlled', async () => {
        // given
        render(
            <NumberInput data-testid='qa-test-id' isControlled value={42} defaultValue={69}/>
        );

        // when
        const input = screen.getByTestId('qa-test-id-input');

        // then
        expect(input).toHaveValue("42");
    })

    it('should render with default value when not controlled', async () => {
        // given
        render(
            <NumberInput data-testid='qa-test-id' value={42} defaultValue={69}/>
        );

        // when
        const input = screen.getByTestId('qa-test-id-input');

        // then
        expect(input).toHaveValue("69");
    })
})