import {Input} from "../../Input";
import {Popover, type PopoverHandle} from "../../../popover/Popover";
import {IconButton} from "../../../buttons/IconButton";
import {ClockIcon} from "../../../icons/Icons";
import * as React from "react";
import {type ChangeEvent, type KeyboardEventHandler, useEffect, useRef, useState} from "react";
import {StringUtils} from "../../../../utils/StringUtils";
import {ZoriaSelectDropdown} from "../../select/SelectInput";
import {TimeUtils} from "../internal/time/TimeUtils";
import {Card} from "../../../card/Card";
import {type ZoriaSelectOption} from "../../select/SelectInputTypes";
import {useTimePickerSelectOptions} from "../internal/time/useTimePickerSelectOptions";
import {FUNCTIONAL_KEYS} from "../internal/Utils";
import type {ZoriaInputProps} from "../../ZoriaInputProps";
import {useInputValue} from "../../internal/useInputValue";

interface TimePickerInputProps extends ZoriaInputProps<string> {
    minutesInterval?: number;
    minHour?: number;
    maxHour?: number;
    minMin?: number;
    maxMin?: number;
}

const TimePickerInput = ({
    value,
    onChange,
    isControlled = false,
    defaultValue,
    "data-testid": dataTestId = 'qa-time-picker-input',
    error: externalError,
    minutesInterval = 30,
    minHour = 0,
    maxHour = 24,
    minMin = 0,
    maxMin = 60,
    ...inputProps
}: TimePickerInputProps) => {
    const [internalValue, setInternalValue] = useInputValue<string>(value, onChange, defaultValue, isControlled);

    const [error, setError] = useState<string | undefined>(externalError);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(value);
    const [displayValue, setDisplayValue] = useState(internalValue);
    const [displayDefaultValue] = useState(internalValue)

    useEffect(() => {
        setDisplayValue(internalValue);
    }, [internalValue]);

    const inputRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<PopoverHandle>(null);

    const timePickerOptions = useTimePickerSelectOptions(
        minutesInterval,
        minHour,
        maxHour,
        minMin,
        maxMin
    )

    const onTimepickerChange = (selectedOption: ZoriaSelectOption) => {
        const value = selectedOption.value;
        setInternalValue(value);
        setSelectedTime(value);
        setError(undefined);
        popoverRef.current?.close();
    }

    const onBlur = () => {
        if (!displayValue || StringUtils.isEmpty(displayValue)) {
            setError(undefined);
            setInternalValue(displayValue);
            return;
        }

        if (!StringUtils.isEmpty(displayValue) && !TimeUtils.validateTime(displayValue)) {
            setError("Incorrect time");
        } else {
            setError(undefined);
            onInputChange(displayValue);
        }
    }

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event: React.KeyboardEvent | KeyboardEvent) => {
        if (FUNCTIONAL_KEYS.includes(event.key)) return;
        if (event.ctrlKey || event.shiftKey) return;

        const isNumber = /^[0-9]$/.test(event.key);

        const isColon = event.key === ':';

        if (!isNumber && !isColon) {
            event.preventDefault();
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const targetElement = event.target;
        let value = targetElement.value;
        setDisplayValue(value);
    };

    /* TODO min/max validation */
    const onInputChange = (value: string) => {
        setSelectedTime(value);
        setInternalValue(value);
    }

    const currentlySelected = timePickerOptions.find(option => option.value === selectedTime);

    return <Input {...inputProps}
                  ref={inputRef}
                  value={displayValue}
                  defaultValue={displayDefaultValue}
                  onBlur={onBlur}
                  onChange={handleInputChange}
                  onKeyDown={onKeyDown}
                  error={error}
                  type='text'
                  placeholder='--:--'>
        <Popover ref={popoverRef}>
            <Popover.Trigger>
                <IconButton><ClockIcon/></IconButton>
            </Popover.Trigger>
            <Popover.Body>
                <Card padding='none' shadow='lg'>
                    <ZoriaSelectDropdown currentlySelected={currentlySelected}
                                         options={timePickerOptions}
                                         onSelected={onTimepickerChange}
                                         sentinelRef={inputRef}
                                         width={75}
                                         close={() => popoverRef?.current?.close()}/>
                </Card>
            </Popover.Body>
        </Popover>
    </Input>
}

export {TimePickerInput};
export type {TimePickerInputProps};