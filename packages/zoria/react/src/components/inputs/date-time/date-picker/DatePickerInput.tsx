import {Input} from "../../Input";
import {Popover, type PopoverHandle} from "../../../popover/Popover";
import {IconButton} from "../../../buttons/IconButton";
import {CalendarIcon} from "../../../icons/Icons";
import {Calendar} from "../calendar/Calendar";
import * as React from "react";
import {type ChangeEvent, type KeyboardEventHandler, useEffect, useRef, useState} from "react";
import {DateUtils} from "../internal/date/DateUtils";
import {StringUtils} from "../../../../utils/StringUtils";
import {Card} from "../../../card/Card";
import {FUNCTIONAL_KEYS} from "../internal/Utils";
import {type ZoriaInputProps} from "../../ZoriaInputProps";
import {useInputValue} from "../../internal/useInputValue";
import {useInputError} from "../../internal/useInputError";

interface DatePickerInputProps extends ZoriaInputProps<string> {
    min?: string
    max?: string

    // Calendar props
    startingDay?: string
    yearRangeStart?: number
    yearRangeEnd?: number
    weekdays?: string[]
    months?: string[]
}

const DatePickerInput = ({
    error: externalError,
    label,
    min,
    max,
    value,
    defaultValue,
    isControlled = false,
    onChange,
    disabled,
    "data-testid": dataTestId = 'qa-date-picker',
    ...calendarProps
}: DatePickerInputProps) => {
    const [internalValue, setInternalValue] = useInputValue<string>(value, onChange, defaultValue, isControlled);
    const [error, setError] = useInputError(externalError);

    const [displayValue, setDisplayValue] = useState(internalValue);
    const [displayDefaultValue] = useState(internalValue)

    useEffect(() => {
        setDisplayValue(internalValue);
    }, [internalValue]);

    const popoverRef = useRef<PopoverHandle>(null);

    const onCalendarChange = (value?: string) => {
        setInternalValue(value);
        setError(undefined); // we assume Calendar will ALWAYS return correct date
        popoverRef.current?.close();
    }

    const onBlur = () => {
        if (!displayValue || StringUtils.isEmpty(displayValue)) {
            setError(undefined);
            setInternalValue(displayValue);
            return;
        }

        if (!DateUtils.validateDate(displayValue)) {
            setError("Incorrect date");
        } else if (!!min && DateUtils.isBefore(displayValue, min)) {
            setError(`Date must be no earlier than ${min}`);
        } else if (!!max && DateUtils.isAfter(displayValue, max)) {
            setError(`Date must be no later than ${max}`);
        } else {
            setError(undefined);
            setInternalValue(displayValue);
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
        setDisplayValue(value);
    };

    return <Input
        label={label}
        value={displayValue}
        defaultValue={displayDefaultValue}
        onBlur={onBlur}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        error={error}
        type='text'
        placeholder='yyyy-MM-dd'
        data-testid={`${dataTestId}-input`}
        disabled={disabled}
    >
        <Popover ref={popoverRef}>
            <Popover.Trigger>
                <IconButton disabled={disabled} data-testid={`${dataTestId}-dropdown-trigger`}><CalendarIcon/></IconButton>
            </Popover.Trigger>
            <Popover.Body trapFocus>
                <Card padding='md' shadow='lg'>
                    <Calendar data-testid={`${dataTestId}-date`} isControlled value={displayValue} onChange={onCalendarChange} minDate={min}
                              maxDate={max} {...calendarProps}/>
                </Card>
            </Popover.Body>
        </Popover>
    </Input>
}

export {DatePickerInput};
export type {DatePickerInputProps};
