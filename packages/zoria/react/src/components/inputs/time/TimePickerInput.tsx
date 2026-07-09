import {Input, type InputProps} from "../Input";
import {Popover, type PopoverHandle} from "../../popover/Popover";
import {IconButton} from "../../buttons/IconButton";
import {ClockIcon} from "../../icons/Icons";
import * as React from "react";
import {type ChangeEvent, type KeyboardEventHandler, useMemo, useRef, useState} from "react";
import {StringUtils} from "../../../utils/StringUtils";
import {ZoriaSelectDropdown} from "../select/SelectInput";
import {TimeUtils} from "../../../utils/TimeUtils";
import {leftPad} from "../../../utils/Utils";
import {Card} from "../../card/Card";
import {type ZoriaSelectOption} from "../select/SelectInputTypes";

const FUNCTIONAL_KEYS = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

interface TimePickerInputProps extends Omit<InputProps, 'type' | 'value' | 'onChange' | 'onBlur'> {
    value?: string;
    onChange?: (value: string) => void;
    minutesInterval?: number;
    minHour?: number;
    maxHour?: number;
    minMin?: number;
    maxMin?: number;
}

/* TODO all ISO time parts, for now it's only HH:mm */
const TimePickerInput = ({error: externalError, minutesInterval = 30, minHour = 0, maxHour = 24, minMin = 0, maxMin = 60, ...inputProps}: TimePickerInputProps) => {
    const [error, setError] = useState<string | undefined>(externalError);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(inputProps.value);

    const inputRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<PopoverHandle>(null);

    const timePickerOptions: ZoriaSelectOption[] = useMemo(() => {
        const options: ZoriaSelectOption[] = [];

        for (let i = minHour; i < maxHour; i++) {
            for (let j = 0; j < 60; j += minutesInterval) {
                if (i === minHour && j < minMin) {
                    continue;
                }

                if (i === maxHour - 1 && j > maxMin) {
                    continue;
                }

                const hours = leftPad('0', 2, String(i));
                const minutes = leftPad('0', 2, String(j));
                const time = hours + ':' + minutes;
                options.push({
                    value: time,
                    searchValue: time,
                    display: time
                })
            }
        }


        return options;
    }, [minutesInterval, minHour, maxHour, minMin, maxMin])

    const onTimepickerChange = (selectedOption: ZoriaSelectOption) => {
        const value = selectedOption.value;

        if (inputRef.current) {
            inputRef.current.value = value!;
            setSelectedTime(value);
            inputProps?.onChange?.(value!);
            popoverRef.current?.close();
            setError(undefined);
        } else {
            console.error(`[TimePickerInput]: inputRef is not defined`)
        }
    }

    const onBlur = () => {
        if (inputRef.current) {
            const value = inputRef.current.value;
            if (!StringUtils.isEmpty(value) && !TimeUtils.validateTime(value)) {
                setError("Incorrect time");
            } else {
                setError(undefined);
                onInputChange(value);
            }
        }
    }

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event: React.KeyboardEvent | KeyboardEvent) => {
        if (FUNCTIONAL_KEYS.includes(event.key)) return;

        const isNumber = /^[0-9]$/.test(event.key);

        const isColon = event.key === ':';

        if (!isNumber && !isColon) {
            event.preventDefault();
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const targetElement = event.target;
        let value = targetElement.value;

        const isDeleting = (event.nativeEvent as InputEvent).inputType?.includes('delete');
        if (isDeleting) {
            targetElement.value = value;
            return;
        }

        if (value.length === 2 && !value.includes(':')) {
            value = value + ':';
        }

        targetElement.value = value.slice(0, 5);
    };

    /* TODO min/max validation */
    const onInputChange = (value: string) => {
        setSelectedTime(value);
        inputProps?.onChange?.(value);
    }

    const currentlySelected = timePickerOptions.find(option => option.value === selectedTime);

    return <Input {...inputProps}
                  ref={inputRef}
                  onBlur={onBlur}
                  onChange={handleInputChange}
                  onKeyDown={onKeyDown}
                  error={error}
                  type='text'
                  placeholder='--:--'>
        <Popover ref={popoverRef}>
            <Popover.Trigger>
                <IconButton><ClockIcon /></IconButton>
            </Popover.Trigger>
            <Popover.Body>
                <Card padding='none' shadow='lg'>
                    <ZoriaSelectDropdown currentlySelected={currentlySelected}
                                         options={timePickerOptions}
                                         onSelected={onTimepickerChange}
                                         sentinelRef={inputRef}
                                         width={100}
                                         close={() => popoverRef?.current?.close()}/>
                </Card>
            </Popover.Body>
        </Popover>
    </Input>
}

export {TimePickerInput};
export type {TimePickerInputProps};