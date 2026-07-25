import {useRef} from "react";
import type {ZoriaSelectOption} from "../../../select/SelectInputTypes";
import {useTimePickerSelectKeyDownController} from "./useTimePickerSelectKeyDownController";
import {useInputValue} from "../../../internal/useInputValue";

interface TimePickerSelectProps {
    value?: string;
    defaultValue?: string;
    options: ZoriaSelectOption<any, any>[];
    onSelected: (value?: string) => void;
    isControlled?: boolean;
}

export const TimePickerSelect = ({
    value: externalValue,
    defaultValue: externalDefaultValue,
    options,
    onSelected: externalOnSelected,
    isControlled = false
}: TimePickerSelectProps) => {
    const listRef = useRef<HTMLUListElement>(null);
    const onKeyDown = useTimePickerSelectKeyDownController(listRef);

    const [selected, onSelected] = useInputValue<string>(externalValue, externalOnSelected, externalDefaultValue, isControlled);

    const onOptionSelected = (option: ZoriaSelectOption) => {
        onSelected(option.value);
    }

    return <ul className='z-options-box'
               aria-autocomplete='list'
               tabIndex={-1}
               ref={listRef}
               onKeyDown={onKeyDown}
    >
        {
            options.map(option => {
                const isSelected = option.value !== undefined && option.value === selected;
                return <li
                    tabIndex={0}
                    className={isSelected ? 'is-selected' : ''}
                    aria-selected={isSelected}
                    key={option.value}
                    onClick={() => onOptionSelected(option)}
                    data-searchvalue={option.searchValue}
                    data-value={option.value}
                >
                    {option.display}
                </li>}
            )
        }
    </ul>
}