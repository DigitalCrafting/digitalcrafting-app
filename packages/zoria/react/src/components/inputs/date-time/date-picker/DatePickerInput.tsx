import {Input, type InputProps} from "../../Input";
import {Popover, type PopoverHandle} from "../../../popover/Popover";
import {IconButton} from "../../../buttons/IconButton";
import {CalendarIcon} from "../../../icons/Icons";
import {Calendar} from "../calendar/Calendar";
import * as React from "react";
import {type ChangeEvent, type KeyboardEventHandler, useRef, useState} from "react";
import {DateUtils} from "../../../../utils/DateUtils";
import {StringUtils} from "../../../../utils/StringUtils";
import {Card} from "../../../card/Card";
import {FUNCTIONAL_KEYS} from "../internal/Utils";

/* TODO leave minimal input props only */
interface DatePickerInputProps extends Omit<InputProps, 'type' | 'value' | 'onChange' | 'onBlur' | 'defaultValue'> {
    value?: string
    onChange?: (value: string) => void
    min?: string
    max?: string

    // Calendar props
    startingDay?: string
    yearRangeStart?: number
    yearRangeEnd?: number
    weekdays?: string[]
    months?: string[]
}

const DatePickerInput = ({error: externalError, label, min, max, value, onChange, ...calendarProps}: DatePickerInputProps) => {
    const [error, setError] = useState<string | undefined>(externalError);
    const [selectedDate, setSelectedDate] = useState<string | undefined>(value);

    const inputRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<PopoverHandle>(null);

    const onCalendarChange = (value: string) => {
        if (inputRef.current) {
            inputRef.current.value = value;
            setSelectedDate(value);
            popoverRef.current?.close();
            onChange?.(value);
            setError(undefined); // we assume Calendar will ALWAYS return correct date
        } else {
            console.error(`[DatePickerInput]: inputRef is not defined`)
        }
    }

    const onBlur = () => {
        if (inputRef.current) {
            const value = inputRef.current.value;
            if (StringUtils.isEmpty(value)) {
                setError(undefined);
                onInputChange(value);
                return;
            }

            if (!DateUtils.validateDate(value)) {
                setError("Incorrect date");
            } else if (!!min && DateUtils.isBefore(value, min)) {
                setError(`Date must be no earlier than ${min}`);
            } else if (!!max && DateUtils.isAfter(value, max)) {
                setError(`Date must be no later than ${max}`);
            } else {
                setError(undefined);
                onInputChange(value);
            }
        }
    }

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event: React.KeyboardEvent | KeyboardEvent) => {
        if (FUNCTIONAL_KEYS.includes(event.key)) return;

        if (event.ctrlKey || event.shiftKey) return;

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
        onChange?.(value);
    }

    return <Input
        label={label}
        value={value}
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
            <Popover.Body trapFocus>
                <Card padding='md' shadow='lg'>
                    <Calendar isControlled value={selectedDate} onChange={onCalendarChange} minDate={min} maxDate={max} {...calendarProps}/>
                </Card>
            </Popover.Body>
        </Popover>
    </Input>
}

export {DatePickerInput};
export type {DatePickerInputProps};
