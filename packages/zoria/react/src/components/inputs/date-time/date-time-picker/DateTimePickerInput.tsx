import {Input, type InputProps} from "../../Input";
import {Popover, type PopoverHandle} from "../../../popover/Popover";
import {IconButton} from "../../../buttons/IconButton";
import {CalendarClockIcon} from "../../../icons/Icons";
import {Calendar} from "../calendar/Calendar";
import * as React from "react";
import {type ChangeEvent, type KeyboardEventHandler, useRef, useState} from "react";
import {DateUtils} from "../internal/date/DateUtils";
import {StringUtils} from "../../../../utils/StringUtils";
import {Card} from "../../../card/Card";
import {DateTimeUtils} from "../internal/DateTimeUtils";
import {TimePickerSelect} from "../internal/time/TimePickerSelect";
import {Button} from "../../../buttons/Button";
import {useTimePickerSelectOptions} from "../internal/time/useTimePickerSelectOptions";
import {DateTimeInputUtils} from "../internal/DateTimeInputUtils";
import {FUNCTIONAL_KEYS} from "../internal/Utils";

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
    const [displayValue, setDisplayValue] = useState<string | undefined>(DateTimeUtils.join(defaultDate, defaultTime));
    const [selectedDate, setSelectedDate] = useState<string | undefined>(defaultDate);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(defaultTime);

    const inputRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<PopoverHandle>(null);

    const onCalendarChange = (value: string) => {
        setSelectedDate(value);
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
        /* TODO validate */
        setDisplayValue(value);
    };

    const onTimepickerChange = (value: string = '') => {
        setSelectedTime(value);
    }

    const timePickerOptions = useTimePickerSelectOptions(
        minutesInterval,
        minHour,
        maxHour,
        minMin,
        maxMin
    )

    const onOkClicked = () => {
        if (selectedDate && selectedTime) {
            setDisplayValue(`${selectedDate} ${selectedTime}`);
            onChange?.(DateTimeUtils.join(selectedDate, selectedTime));
            popoverRef.current?.close();
        }
    }

    return <Input
        label={label}
        value={displayValue}
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
                                <Calendar isControlled value={selectedDate} onChange={onCalendarChange} minDate={min} maxDate={max} {...calendarProps}/>
                            </div>
                            <div className='z-date-time-input-dropdown-time-column'>
                                <TimePickerSelect value={selectedTime} isControlled onSelected={onTimepickerChange} options={timePickerOptions} />
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
