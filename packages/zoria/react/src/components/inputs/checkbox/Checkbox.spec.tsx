import { afterEach, describe, expect, it, vi } from 'vitest';
import { page, userEvent } from '@vitest/browser/context';
import { render } from 'vitest-browser-react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should render checkbox with default testids and label text', async () => {
        // given
        await render(<Checkbox>Accept Terms</Checkbox>);

        // when
        const container = page.getByTestId('qa-checkbox');
        const input = page.getByTestId('qa-checkbox-input');
        const box = page.getByTestId('qa-checkbox-box');
        const label = page.getByText('Accept Terms');

        // then
        await expect.element(container).toBeInTheDocument();
        await expect.element(input).toBeInTheDocument();
        await expect.element(box).toBeInTheDocument();
        await expect.element(label).toBeInTheDocument();
    });

    it('should respect custom data-testid prop', async () => {
        // given
        await render(<Checkbox data-testid="custom-check">Custom Test ID</Checkbox>);

        // when
        const container = page.getByTestId('custom-check');
        const input = page.getByTestId('custom-check-input');
        const box = page.getByTestId('custom-check-box');

        // then
        await expect.element(container).toBeInTheDocument();
        await expect.element(input).toBeInTheDocument();
        await expect.element(box).toBeInTheDocument();
    });

    it('should operate in uncontrolled mode when defaultChecked is passed', async () => {
        // given
        const handleChange = vi.fn();
        await render(
            <Checkbox defaultChecked={false} onChange={handleChange}>
                Uncontrolled Checkbox
            </Checkbox>
        );
        const input = page.getByTestId('qa-checkbox-input');

        // when
        await userEvent.click(input);

        // then
        await expect.element(input).toBeChecked();
        expect(handleChange).toHaveBeenCalledOnce();
        expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should operate in controlled mode when isControlled is true', async () => {
        // given
        const handleChange = vi.fn();
        await render(
            <Checkbox isControlled={true} checked={true} onChange={handleChange}>
                Controlled Checkbox
            </Checkbox>
        );
        const input = page.getByTestId('qa-checkbox-input');

        // when
        await userEvent.click(input);

        // then - input state delegates to parent handler when controlled
        expect(handleChange).toHaveBeenCalledOnce();
        expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('should render as disabled and prevent user interaction', async () => {
        // given
        const handleChange = vi.fn();
        await render(
            <Checkbox disabled={true} onChange={handleChange}>
                Disabled Checkbox
            </Checkbox>
        );
        const container = page.getByTestId('qa-checkbox');
        const input = page.getByTestId('qa-checkbox-input');

        // when
        await userEvent.click(container, {force: true});

        // then
        await expect.element(input).toBeDisabled();
        await expect.element(input).not.toBeChecked();
        expect(handleChange).not.toHaveBeenCalled();
    });

    it('should toggle state and gain focus when activated via Space key', async () => {
        // given
        const handleChange = vi.fn();
        await render(<Checkbox onChange={handleChange}>Keyboard Target</Checkbox>);
        const input = page.getByTestId('qa-checkbox-input');

        // when
        await input.element().focus();
        await userEvent.keyboard(' ');

        // then
        await expect.element(input).toHaveFocus();
        await expect.element(input).toBeChecked();
        expect(handleChange).toHaveBeenCalledWith(true);
    });

});