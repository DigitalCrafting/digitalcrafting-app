import {DatePickerInput} from "./DatePickerInput";
import {TimePickerInput} from "./TimePickerInput";
import {useState} from "react";
import {DateTimeUtils} from "../../../utils/DateTimeUtils";

interface DateTimePickerInputProps {
    value?: string;
    onChange?: (value: string) => void;
    minutesInterval?: number;
    className?: string
    label?: string
    error?: string
    /* TODO Calendar props */
}

const DateTimePickerInput = ({
    value,
    onChange,
    minutesInterval,
    className: externalClassName = '',
    label,
    error
}: DateTimePickerInputProps) => {
    const [internalValue, setInternalValue] = useState(value || new Date().toISOString());
    const [dateValue, timeValue] = DateTimeUtils.split(internalValue);

    const onDateValueChange = (value: string) => {
        setInternalValue(() => {
            const newValue = DateTimeUtils.join(value, timeValue);
            onChange?.(newValue);
            return newValue;
        });
    }

    const onTimeValueChange = (value: string) => {
        setInternalValue(() => {
            const newValue = DateTimeUtils.join(dateValue, value);
            onChange?.(newValue);
            return newValue;
        });
    }

    /* TODO fix 'value' in all inputs - controlled vs uncontrolled */
    /* TODO extract date and time picker logic so that Components are not used here - they only clutter DOM  */
    return <div className={`z-input-wrapper z-date-time-input-wrapper ${externalClassName}`.trim()}>
        <label className='z-input-label'>{label}</label>
        <div className='z-date-time-input-container'>
            <DatePickerInput value={dateValue} onChange={onDateValueChange}/>
            <TimePickerInput value={timeValue} onChange={onTimeValueChange} minutesInterval={minutesInterval}/>
        </div>
        {
            error ? <span className='z-input-error'>{error}</span> : null
        }
    </div>
}

export {DateTimePickerInput};