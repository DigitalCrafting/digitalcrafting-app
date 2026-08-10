import '@testing-library/jest-dom/vitest';
import {afterEach, describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import {EmailInput} from "./EmailInput";
import {TooltipProvider} from "../../tooltip/Tooltip";

describe('EmailInput', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    })

    it('should render', () => {
        // given
        render(<TooltipProvider>
                <EmailInput data-testid='qa-test-id'/>
            </TooltipProvider>
        );

        // when
        const input = screen.getByTestId('qa-test-id');

        // then
        expect(input).toBeTruthy();
    })

    it('should focus', async () => {
        // given
        const user = userEvent.setup();
        render(<TooltipProvider>
                <EmailInput data-testid='qa-test-id'/>
            </TooltipProvider>
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
        render(<TooltipProvider>
                <EmailInput data-testid='qa-test-id' onChange={onChangeMock}/>
            </TooltipProvider>
        );

        // when
        const input = screen.getByTestId('qa-test-id-input');
        await user.type(input, 'test@test.com');

        // then
        expect(onChangeMock).toHaveBeenCalledWith('test@test.com');
    })

    it('should render with default value', async () => {
        // given
        render(<TooltipProvider>
                <EmailInput data-testid='qa-test-id' defaultValue='test@test.com'/>
            </TooltipProvider>
        );

        // when
        const input = screen.getByTestId('qa-test-id-input');

        // then
        expect(input).toHaveValue('test@test.com');
    })

    it('should render with value when controlled', async () => {
        // given
        render(<TooltipProvider>
                <EmailInput data-testid='qa-test-id' isControlled value='test@test.com' defaultValue='test_default@test.com'/>
            </TooltipProvider>
        );

        // when
        const input = screen.getByTestId('qa-test-id-input');

        // then
        expect(input).toHaveValue('test@test.com');
    })

    it('should render with default value when not controlled', async () => {
        // given
        render(<TooltipProvider>
                <EmailInput data-testid='qa-test-id' value='test@test.com' defaultValue='test_default@test.com'/>
            </TooltipProvider>
        );

        // when
        const input = screen.getByTestId('qa-test-id-input');

        // then
        expect(input).toHaveValue('test_default@test.com');
    })
})