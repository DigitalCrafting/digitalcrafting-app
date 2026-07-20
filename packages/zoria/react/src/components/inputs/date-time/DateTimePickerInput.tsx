import {Input, type InputProps} from "../Input";
import {Popover, type PopoverHandle} from "../../popover/Popover";
import {IconButton} from "../../buttons/IconButton";
import {CalendarClockIcon} from "../../icons/Icons";
import {Calendar} from "../../date/Calendar";
import * as React from "react";
import {type ChangeEvent, type KeyboardEventHandler, useRef, useState} from "react";
import {DateUtils} from "../../../utils/DateUtils";
import {StringUtils} from "../../../utils/StringUtils";
import {Card} from "../../card/Card";
import type {ZoriaSelectOption} from "../select/SelectInputTypes";
import {DateTimeUtils} from "../../../utils/DateTimeUtils";
import {TimePickerSelect} from "./internal/time/TimePickerSelect";
import {Button} from "../../buttons/Button";
import {useTimePickerSelectOptions} from "./internal/time/useTimePickerSelectOptions";
import {DateTimeInputUtils} from "./internal/DateTimeInputUtils";

const FUNCTIONAL_KEYS = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Ctrl"];

/* TODO leave minimal input props only */
interface NewDateTimePickerInputProps extends Omit<InputProps, 'type' | 'value' | 'onChange' | 'onBlur'> {
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
    min?: string
    max?: string

    className?: string
    label?: string
    error?: string

    minutesInterval?: number;
    minHour?: number;
    maxHour?: number;
    minMin?: number;
    maxMin?: number;

    // Calendar props
    startingDay?: string
    yearRangeStart?: number
    yearRangeEnd?: number
    weekdays?: string[]
    months?: string[]
}

const DateTimePickerInput = ({error: externalError, label, min, max, value, defaultValue, onChange, minutesInterval = 30, minHour = 0, maxHour = 24, minMin = 0, maxMin = 60, ...calendarProps}: NewDateTimePickerInputProps) => {
    const [error, setError] = useState<string | undefined>(externalError);
    const [defaultDate, defaultTime] = DateTimeUtils.split(defaultValue || '');
    const [selectedDate, setSelectedDate] = useState<string | undefined>(defaultDate);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(defaultTime);

    const pendingSelectedDate = useRef<string | null>(null);
    const pendingSelectedTime = useRef<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<PopoverHandle>(null);

    const onCalendarChange = (value: string) => {
        pendingSelectedDate.current = value;
    }

    const onBlur = () => {
        if (inputRef.current) {
            const value = inputRef.current.value;
            if (StringUtils.isEmpty(value)) {
                setError(undefined);
                onChange?.(value);
                return;
            }

            const isoString = DateTimeInputUtils.displayToIsoString(value);

            if (!DateUtils.validateDate(isoString)) {
                setError("Incorrect date");
            } else if (!!min && DateUtils.isBefore(isoString, min)) {
                setError(`Date must be no earlier than ${min}`);
            } else if (!!max && DateUtils.isAfter(isoString, max)) {
                setError(`Date must be no later than ${max}`);
            } else {
                const [date, time] = DateTimeUtils.split(isoString);
                setSelectedDate(date);
                setSelectedTime(time);
                setError(undefined);
                onChange?.(isoString);
            }
        }
    }

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event: React.KeyboardEvent | KeyboardEvent) => {
        if (FUNCTIONAL_KEYS.includes(event.key)) return;

        if (event.ctrlKey || event.shiftKey) return;

        const isNumber = /^[0-9]$/.test(event.key);

        const isDash = event.key === '-';
        const isColon = event.key === ':';
        const isSpace = event.key === ' ';

        if (!isNumber && !isDash && !isColon && !isSpace) {
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
        if (value.length === 10 && !value.includes(':') && !value.includes(' ')) {
            value = value + ' ';
        }
        if (value.length === 13 && !value.includes(':')) {
            value = value + ':';
        }

        targetElement.value = value.slice(0, 17);
    };

    const onTimepickerChange = (selectedOption: ZoriaSelectOption) => {
        const value = selectedOption.value;
        pendingSelectedTime.current = value!;
    }

    const timePickerOptions = useTimePickerSelectOptions(
        minutesInterval,
        minHour,
        maxHour,
        minMin,
        maxMin
    )

    const currentlySelectedTime = timePickerOptions.find(option => option.value === selectedTime);

    const onOkClicked = () => {
        const pendingDate = pendingSelectedDate.current || selectedDate;
        pendingSelectedDate.current = null;

        const pendingTime = pendingSelectedTime.current || selectedTime;
        pendingSelectedTime.current = null;

        setSelectedDate(pendingDate);
        setSelectedTime(pendingTime);

        const inputValue = `${pendingDate} ${pendingTime}`;
        if (inputRef.current) {
            inputRef.current.value = inputValue;
            onChange?.(DateTimeUtils.join(pendingDate!, pendingTime!));
        }

        popoverRef.current?.close();
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
        placeholder='yyyy-MM-dd HH:mm'
    >
        <Popover ref={popoverRef}>
            <Popover.Trigger>
                <IconButton><CalendarClockIcon/></IconButton>
            </Popover.Trigger>
            <Popover.Body trapFocus>
                <Card padding='none' shadow='lg'>
                    <div className='z-date-time-input-dropdown'>
                        <div className='z-date-time-input-dropdown-wrapper'>
                            <div className='z-date-time-input-dropdown-calendar-column'>
                                <Calendar value={selectedDate} onChange={onCalendarChange} min={min} max={max} {...calendarProps}/>
                            </div>
                            <div className='z-date-time-input-dropdown-time-column'>
                                <TimePickerSelect currentlySelected={currentlySelectedTime} onSelected={onTimepickerChange} options={timePickerOptions} />
                            </div>
                        </div>
                        <div className='z-date-time-input-dropdown-actions'>
                            <Button onClick={onOkClicked}>OK</Button>
                        </div>
                    </div>
                </Card>
            </Popover.Body>
        </Popover>
    </Input>
}

export {DateTimePickerInput};
export type {NewDateTimePickerInputProps};
