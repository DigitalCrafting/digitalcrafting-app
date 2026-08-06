import '@testing-library/jest-dom/vitest';
import {afterEach, describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import {TextareaInput} from "./TextareaInput";

describe('TextareaInput', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    })

    it('should render', () => {
        // given
        render(<TextareaInput data-testid='qa-test-id' />);

        // when
        const input = screen.getByTestId('qa-test-id');

        // then
        expect(input).toBeTruthy();
    })

    it('should focus', async () => {
        // given
        const user = userEvent.setup();
        render(<TextareaInput data-testid='qa-test-id' />);

        // when
        const input = screen.getByTestId('qa-test-id');
        await user.click(input);

        // then
        expect(input).toHaveFocus();
    })

    it('should emit onChange event', async () => {
        // given
        const user = userEvent.setup();
        const onChangeMock = vi.fn();
        render(<TextareaInput data-testid='qa-test-id' onChange={onChangeMock} />);

        // when
        const input = screen.getByTestId('qa-test-id');
        await user.type(input, 'test text');

        // then
        expect(onChangeMock).toHaveBeenCalledWith('test text');
    })

    it('should render with default value', async () => {
        // given
        render(<TextareaInput data-testid='qa-test-id' defaultValue='test_default_value' />);

        // when
        const input = screen.getByTestId('qa-test-id');

        // then
        expect(input).toHaveValue('test_default_value');
    })

    it('should render with value when controlled', async () => {
        // given
        render(<TextareaInput data-testid='qa-test-id' isControlled value='test_value' defaultValue='test_default_value' />);

        // when
        const input = screen.getByTestId('qa-test-id');

        // then
        expect(input).toHaveValue('test_value');
    })

    it('should render with default value when not controlled', async () => {
        // given
        render(<TextareaInput data-testid='qa-test-id' value='test_value' defaultValue='test_default_value' />);

        // when
        const input = screen.getByTestId('qa-test-id');

        // then
        expect(input).toHaveValue('test_default_value');
    })
})