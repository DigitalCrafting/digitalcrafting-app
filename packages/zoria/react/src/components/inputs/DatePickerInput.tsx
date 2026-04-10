import {Input, type InputProps} from "./Input";
import {Popover, type PopoverHandle} from "../popover/Popover";
import {IconButton} from "../buttons/IconButton";
import {CalendarIcon} from "../icons/Icons";
import {Calendar} from "../date/Calendar";
import * as React from "react";
import {type ChangeEvent, type KeyboardEventHandler, useRef, useState} from "react";
import {DateUtils} from "../../utils/DateUtils";
import {StringUtils} from "../../utils/StringUtils";

// TODO make it common const //, "Enter"
const FUNCTIONAL_KEYS = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

interface DatePickerInputProps extends Omit<InputProps, 'type' | 'value' | 'onChange' | 'onBlur'> {
    value?: string
    onChange?: (value: string) => void
}

const DatePickerInput = ({error: externalError, ...inputProps}: DatePickerInputProps) => {
    const [error, setError] = useState<string | undefined>(externalError);
    const [selectedDate, setSelectedDate] = useState<string | undefined>(inputProps.value);

    const inputRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<PopoverHandle>(null);

    const onCalendarChange = (value: string) => {
        if (inputRef.current) {
            inputRef.current.value = value;
            setSelectedDate(value);
            popoverRef.current?.close();
            inputProps?.onChange?.(value);
            setError(undefined); // we assume Calendar will ALWAYS return correct date
        } else {
            console.error(`[DatePickerInput]: inputRef is not defined`)
        }
    }

    const onBlur = () => {
        if (inputRef.current) {
            const value = inputRef.current.value;
            if (!StringUtils.isEmpty(value) && !DateUtils.validateDate(value)) {
                setError("Incorrect date");
            } else {
                setError(undefined);
                onInputChange(value);
            }
        }
    }

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event: React.KeyboardEvent | KeyboardEvent) => {
        if (FUNCTIONAL_KEYS.includes(event.key)) return;

        const isNumber = /^[0-9]$/.test(event.key);

        const isDash = event.key === '-';

        if (!isNumber && !isDash) {
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

        if (value.length === 4 && !value.includes('-')) {
            value = value + '-';
        }
        if (value.length === 7 && value.split('-').length === 2) {
            value = value + '-';
        }

        targetElement.value = value.slice(0, 10);
    };

    const onInputChange = (value: string) => {
        setSelectedDate(value);
        inputProps?.onChange?.(value);
    }

    return <Input {...inputProps}
                  ref={inputRef}
                  onBlur={onBlur}
                  onChange={handleInputChange}
                  onKeyDown={onKeyDown}
                  error={error}
                  type='text'
                  placeholder='yyyy-MM-dd'
    >
        <Popover ref={popoverRef}>
            <Popover.Trigger>
                <IconButton><CalendarIcon/></IconButton>
            </Popover.Trigger>
            <Popover.Body padding='none'>
                <Calendar value={selectedDate} onChange={onCalendarChange}/>
            </Popover.Body>
        </Popover>
    </Input>
}

export {DatePickerInput};