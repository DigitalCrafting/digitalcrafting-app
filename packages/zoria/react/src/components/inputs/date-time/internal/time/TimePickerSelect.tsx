import {useRef, useState} from "react";
import type {ZoriaSelectOption} from "../../../select/SelectInputTypes";
import {useTimePickerSelectKeyDownController} from "./useTimePickerSelectKeyDownController";

interface TimePickerSelectProps {
    currentlySelected: any;
    options: ZoriaSelectOption<any, any>[];
    onSelected: (option: ZoriaSelectOption<any, any>) => void;
}

export const TimePickerSelect = ({
    currentlySelected,
    options,
    onSelected
}: TimePickerSelectProps) => {
    const [visiblySelected, setVisiblySelected] = useState(currentlySelected);
    const listRef = useRef<HTMLUListElement>(null);
    const onKeyDown = useTimePickerSelectKeyDownController(listRef);

    const onOptionSelected = (option: ZoriaSelectOption) => {
        setVisiblySelected(option);
        onSelected(option);
    }

    return <ul className='z-options-box'
               aria-autocomplete='list'
               tabIndex={-1}
               ref={listRef}
               onKeyDown={onKeyDown}
    >
        {
            options.map(option => {
                const isSelected = option.value !== undefined && option.value === visiblySelected?.value;
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