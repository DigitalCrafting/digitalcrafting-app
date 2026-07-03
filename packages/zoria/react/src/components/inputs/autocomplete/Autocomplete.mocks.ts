import type {AutocompleteDropdownOption} from "./AutocompleteTypes";
import {StringUtils} from "../../../utils/StringUtils";

export const MOCK_TEST_OPTIONS = [
    {
        value: 'test1',
        display: 'test 1',
        searchValue: 'test 1'
    },
    {
        value: 'test2',
        display: 'testing 2',
        searchValue: 'testing 2'
    },
    {
        value: 'test3',
        display: 'testiiiiing 3',
        searchValue: 'testiiiiing 3'
    }
]

export const MOCK_VALUE_OPTIONS = [
    {
        value: 'val1',
        display: 'val 1',
        searchValue: 'val 1'
    },
    {
        value: 'val2',
        display: 'value 2',
        searchValue: 'value 2'
    },
    {
        value: 'val3',
        display: 'valuable 3',
        searchValue: 'valuable 3'
    }
]

export const MOCK_ALL_OPTIONS = [
    ...MOCK_TEST_OPTIONS,
    ...MOCK_VALUE_OPTIONS
]

export const MOCK_QUERY_OPTIONS_FN = (value: string): Promise<AutocompleteDropdownOption[]> => {
    return new Promise((res) => {
        setTimeout(() => {
            if (StringUtils.isEmpty(value)) {
                res(MOCK_ALL_OPTIONS);
            }
            const filtered = MOCK_ALL_OPTIONS.filter(option => option.searchValue.indexOf(value) > -1)
            res(filtered);
        }, 1000)
    })
}