import {afterEach, describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import {AutocompleteInput} from "./AutocompleteInput";
import {MOCK_QUERY_OPTIONS_FN, MOCK_VALUE_OPTIONS} from "./Autocomplete.mocks";
import {act} from "react";

describe('AutocompleteInput', () => {

    afterEach(() => {
        vi.restoreAllMocks();
    })

    it('should render input', () => {
        // given
        render(<AutocompleteInput data-testid='qa-autocomplete'/>)

        // when
        const element = screen.getByTestId('qa-autocomplete');

        // then
        expect(element).toBeTruthy();
    });

    it('should open and close dropdown', async () => {
        // given
        const user = userEvent.setup();
        render(<AutocompleteInput data-testid='qa-autocomplete' queryOptions={MOCK_QUERY_OPTIONS_FN}/>)

        // when
        const element = screen.getByTestId('qa-autocomplete-input');
        await user.click(element);

        // then
        expect(element).toHaveFocus();
        const dropdown = await screen.findByTestId('qa-autocomplete-dropdown-no-results');

        expect(element).toBeTruthy();
        expect(dropdown).toBeInTheDocument();

        // when
        await user.keyboard('{ArrowUp}');
        // then
        const dropdown2 = screen.queryByTestId('qa-autocomplete-dropdown-no-results');
        expect(dropdown2).toBeNull();
    });

    it('should open dropdown and display and hide spinner', async () => {
        // given
        vi.useFakeTimers({toFake: ['setTimeout', 'clearTimeout']});
        vi.setTimerTickMode('nextTimerAsync')
        const user = userEvent.setup({advanceTimers: vi.advanceTimersByTime});
        render(<AutocompleteInput data-testid='qa-autocomplete' queryOptions={MOCK_QUERY_OPTIONS_FN}/>)
        const input = screen.getByTestId('qa-autocomplete-input');

        // when
        act(() => {
            user.click(input);
            user.type(input, 'va');
        })

        vi.setTimerTickMode('manual');
        vi.advanceTimersByTime(300);

        // then
        vi.setTimerTickMode('nextTimerAsync');
        const loader = await screen.findByTestId('qa-autocomplete-dropdown-spinner');
        expect(loader).toBeInTheDocument();

        // when
        vi.setTimerTickMode('manual');
        vi.advanceTimersByTime(1000);

        // then
        await waitFor(() => {
            vi.setTimerTickMode('nextTimerAsync');
            const loaderAfterCallFinished = screen.queryByTestId('qa-autocomplete-dropdown-spinner');
            expect(loaderAfterCallFinished).toBeNull();
        })

        vi.useRealTimers();
    })

    it('should open dropdown and display option using dynamic query method', async () => {
        // given
        const mockQueryOptions = vi.fn().mockResolvedValue(MOCK_VALUE_OPTIONS);

        const user = userEvent.setup();
        render(<AutocompleteInput data-testid='qa-autocomplete' debounceMS={10} queryOptions={mockQueryOptions}/>)
        const input = screen.getByTestId('qa-autocomplete-input');

        await user.click(input);
        await user.type(input, 'va');

        // then
        const liElements = await screen.findAllByTestId('qa-autocomplete-dropdown-li', {}, {
            timeout: 2000
        });
        expect(mockQueryOptions).toHaveBeenCalledOnce();
        expect(mockQueryOptions).toHaveBeenCalledWith('va');
        expect(liElements.length).toBe(3);
    });

    
})