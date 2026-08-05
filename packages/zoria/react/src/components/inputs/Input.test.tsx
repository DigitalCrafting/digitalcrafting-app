import '@testing-library/jest-dom/vitest';
import {afterEach, describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import {Input} from "./Input";

describe('Input', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    })

    it('should render', () => {
        // given
        render(<Input data-testid='qa-test-id' />);

        // when
        const input = screen.getByTestId('qa-test-id');

        // then
        expect(input).toBeTruthy();
    })

    it('should focus', async () => {
        // given
        const user = userEvent.setup();
        render(<Input data-testid='qa-test-id' />);

        // when
        const input = screen.getByTestId('qa-test-id-input');
        await user.click(input);

        // then
        expect(input).toHaveFocus();
    })

})