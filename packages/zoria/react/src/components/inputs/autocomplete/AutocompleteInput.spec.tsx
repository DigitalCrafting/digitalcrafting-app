import { afterEach, describe, expect, it, vi } from 'vitest';
import { page, userEvent } from '@vitest/browser/context';
import { render } from 'vitest-browser-react';
import { AutocompleteInput } from './AutocompleteInput';
import { MOCK_QUERY_OPTIONS_FN, MOCK_VALUE_OPTIONS } from './Autocomplete.mocks';

describe('AutocompleteInput', () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should render input', async () => {
        // given
        await render(<AutocompleteInput data-testid="qa-autocomplete" />);

        // when
        const element = page.getByTestId('qa-autocomplete');

        // then
        await expect.element(element).toBeInTheDocument();
    });

    it('should open and close dropdown', async () => {
        // given
        await render(<AutocompleteInput data-testid="qa-autocomplete" queryOptions={MOCK_QUERY_OPTIONS_FN} />);

        const input = page.getByTestId('qa-autocomplete-input');

        // when
        await userEvent.click(input);

        // then
        await expect.element(input).toHaveFocus();

        const dropdown = page.getByTestId('qa-autocomplete-dropdown-no-results');
        await expect.element(dropdown).toBeInTheDocument();

        // when
        await userEvent.keyboard('{ArrowUp}');

        // then
        await expect.element(dropdown).not.toBeInTheDocument();
    });

    it('should open dropdown and display and hide spinner', async () => {
        // given
        await render(<AutocompleteInput data-testid="qa-autocomplete" queryOptions={MOCK_QUERY_OPTIONS_FN} />);
        const input = page.getByTestId('qa-autocomplete-input');

        // when
        await userEvent.click(input);
        await userEvent.type(input, 'va');

        const loader = page.getByTestId('qa-autocomplete-dropdown-spinner');

        // then
        await expect.element(loader).toBeInTheDocument();

        // then
        await expect.element(loader).not.toBeInTheDocument();
    });

    it('should open dropdown and display option using dynamic query method', async () => {
        // given
        const mockQueryOptions = vi.fn().mockResolvedValue(MOCK_VALUE_OPTIONS);

        await render(<AutocompleteInput data-testid="qa-autocomplete" debounceMS={10} queryOptions={mockQueryOptions} />);
        const input = page.getByTestId('qa-autocomplete-input');

        // when
        await userEvent.click(input);
        await userEvent.type(input, 'va');

        // then
        const liElements = page.getByTestId('qa-autocomplete-dropdown-li');

        await expect.element(liElements).toHaveLength(3);
        expect(mockQueryOptions).toHaveBeenCalledOnce();
        expect(mockQueryOptions).toHaveBeenCalledWith('va');
    });

});