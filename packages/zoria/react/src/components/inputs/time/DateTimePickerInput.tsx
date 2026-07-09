import {DatePickerInput} from "./DatePickerInput";
import {TimePickerInput} from "./TimePickerInput";
import {useState} from "react";
import {DateTimeUtils} from "../../../utils/DateTimeUtils";

interface DateTimePickerInputProps {
    value?: string;
    onChange?: (value?: string) => void;
    min?: string;
    max?: string;

    minutesInterval?: number;
    minHour?: number;
    maxHour?: number;
    minMin?: number;
    maxMin?: number;

    className?: string
    label?: string
    error?: string

    // Calendar props
    startingDay?: string
    yearRangeStart?: number
    yearRangeEnd?: number
    weekdays?: string[]
    months?: string[]
}

const DateTimePickerInput = ({
    value,
    onChange,
    min,
    max,
    minutesInterval,
    className: externalClassName = '',
    label,
    error,
    minHour,
    maxHour,
    minMin,
    maxMin,
    ...calendarProps
}: DateTimePickerInputProps) => {
    const [internalValue, setInternalValue] = useState(value);
    const [splitDateValue, splitTimeValue] = internalValue ? DateTimeUtils.split(internalValue) : ['', ''];
    const [dateValue, setDateValue] = useState(splitDateValue);
    const [timeValue, setTimeValue] = useState(splitTimeValue);

    const onDateValueChange = (value: string) => {
        setInternalValue(() => {
            setDateValue(value || '');
            if (!value || !timeValue) {
                onChange?.(undefined)
                return undefined;
            }

            const newValue = DateTimeUtils.join(value, timeValue!);
            onChange?.(newValue);
            return newValue;
        });
    }

    const onTimeValueChange = (value: string) => {
        setTimeValue(value || '');
        if (!value || !dateValue) {
            onChange?.(undefined)
            return undefined;
        }

        setInternalValue(() => {
            const newValue = DateTimeUtils.join(dateValue!, value);
            onChange?.(newValue);
            return newValue;
        });
    }

    /* TODO fix 'value' in all inputs - controlled vs uncontrolled */
    /* TODO extract date and time picker logic so that Components are not used here - they only clutter DOM  */
    return <div className={`z-input-wrapper z-date-time-input-wrapper ${externalClassName}`.trim()}>
        <label className='z-input-label'>{label}</label>
        <div className='z-date-time-input-container'>
            <DatePickerInput value={dateValue} onChange={onDateValueChange} min={min} max={max} {...calendarProps}/>
            <TimePickerInput value={timeValue} onChange={onTimeValueChange} minutesInterval={minutesInterval}
                             minHour={minHour} maxHour={maxHour} minMin={minMin} maxMin={maxMin}/>
        </div>
        {
            error ? <span className='z-input-error'>{error}</span> : null
        }
    </div>
}

export {DateTimePickerInput};
export type {DateTimePickerInputProps};