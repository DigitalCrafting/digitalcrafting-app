import {Input, type InputProps} from "../../Input";
import {Popover, type PopoverHandle} from "../../../popover/Popover";
import {IconButton} from "../../../buttons/IconButton";
import {CalendarIcon} from "../../../icons/Icons";
import {Calendar} from "../calendar/Calendar";
import * as React from "react";
import {type ChangeEvent, type KeyboardEventHandler, useRef, useState} from "react";
import {StringUtils} from "../../../../utils/StringUtils";
import {Card} from "../../../card/Card";
import {FUNCTIONAL_KEYS} from "../internal/Utils";
import {type DateRangeValue} from "../types/DateTimeTypes";
import {DateRangeUtils} from "../internal/date/DateTimeUtils";
import {EN_DASH} from "../../../../types/CommonTypes";
import {Button} from "../../../buttons/Button";
import {H4} from "../../../typography/Typography";
import {useVisibleDateRange} from "../internal/date/useVisibleDateRange";

const DatePickingStageEnum = {
    START: 'START',
    END: 'END'
} as const;
type DatePickingStageEnumType = (typeof DatePickingStageEnum)[keyof typeof DatePickingStageEnum];

/* TODO leave minimal input props only */
interface DateRangePickerInputProps extends Omit<InputProps, 'type' | 'value' | 'defaultValue' | 'onChange' | 'onBlur'> {
    value?: DateRangeValue;
    defaultValue?: DateRangeValue;
    onChange?: (value: DateRangeValue) => void;
    startDateLabel?: string;
    endDateLabel?: string;
    minDate?: string;
    maxDate?: string;

    // Calendar props
    startingDay?: string;
    yearRangeStart?: number;
    yearRangeEnd?: number;
    weekdays?: string[];
    months?: string[];

    isControlled?: boolean;
}

const DateRangePickerInput = ({
    error: externalError,
    label,
    minDate,
    maxDate,
    value,
    defaultValue,
    onChange,
    startDateLabel = 'Start',
    endDateLabel = 'End',
    isControlled = false,
    ...calendarProps
}: DateRangePickerInputProps) => {
    const [error, setError] = useState<string | undefined>(externalError);
    const [startDate, setStartDate] = useState(defaultValue?.start);
    const [endDate, setEndDate] = useState(defaultValue?.end);
    const [displayValue, setDisplayValue] = useState(DateRangeUtils.toDisplay(value));
    const [displayDefaultValue] = useState(DateRangeUtils.toDisplay(defaultValue))
    const [datePickingStage, setDatePickingStage] = useState<DatePickingStageEnumType>(DatePickingStageEnum.START)

    const inputRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<PopoverHandle>(null);

    const displayLabels = false; // TODO visible on smaller screens, 1 calendar at a time

    const {
        visibleStartDate,
        onVisibleStartDateChange,
        minStartDate,
        maxStartDate,
        visibleEndDate,
        onVisibleEndDateChange,
        minEndDate,
        maxEndDate
    } = useVisibleDateRange(startDate, endDate, minDate, maxDate);

    // const onCalendarChange = (value: string) => {
    //     if (inputRef.current) {
    //         inputRef.current.value = value;
    //         setSelectedDate(value);
    //         popoverRef.current?.close();
    //         onChange?.(value);
    //         setError(undefined); // we assume Calendar will ALWAYS return correct date
    //     } else {
    //         console.error(`[DateRangePickerInput]: inputRef is not defined`)
    //     }
    // }

    const onBlur = () => {
        if (inputRef.current) {
            const value = inputRef.current.value;
            if (StringUtils.isEmpty(value)) {
                setError(undefined);
                // onInputChange(value);
                return;
            }
            const formattedValue = value.replace(
                /(\d{4}-\d{2}-\d{2})\s+-\s+(\d{4}-\d{2}-\d{2})/,
                `$1 ${EN_DASH} $2`
            );
            setDisplayValue(formattedValue);
            //
            // if (!DateUtils.validateDate(value)) {
            //     setError("Incorrect date");
            // } else if (!!min && DateUtils.isBefore(value, min)) {
            //     setError(`Date must be no earlier than ${min}`);
            // } else if (!!max && DateUtils.isAfter(value, max)) {
            //     setError(`Date must be no later than ${max}`);
            // } else {
            //     setError(undefined);
            //     onInputChange(value);
            // }
        }
    }

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event: React.KeyboardEvent | KeyboardEvent) => {
        console.log(event.key)
        if (FUNCTIONAL_KEYS.includes(event.key)) return;

        if (event.ctrlKey || event.shiftKey) return;

        const isNumber = /^[0-9\s]$/.test(event.key);

        const isDash = event.key === '-';

        if (!isNumber && !isDash) {
            event.preventDefault();
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const targetElement = event.target;
        let value = targetElement.value;
        //
        // const isDeleting = (event.nativeEvent as InputEvent).inputType?.includes('delete');
        // if (isDeleting) {
        //     targetElement.value = value;
        //     return;
        // }
        //
        // if (value.length === 4 && !value.includes('-')) {
        //     value = value + '-';
        // }
        // if (value.length === 7 && value.split('-').length === 2) {
        //     value = value + '-';
        // }
        //
        setDisplayValue(value)
    };
    //
    // const onInputChange = (value: string) => {
    //     setSelectedDate(value);
    //     onChange?.(value);
    // }

    const onOkClicked = () => {
        if (startDate && endDate) {
            setDisplayValue(DateRangeUtils.toDisplay({
                start: startDate,
                end: endDate
            }))
            popoverRef.current?.close();
        }
    }

    const onLeftCalendarChange = (leftDate: string = '') => {
        if (datePickingStage === DatePickingStageEnum.START) {
            setStartDate(leftDate);
            if (endDate && leftDate > endDate) {
                setEndDate(undefined)
            }
            setDatePickingStage(DatePickingStageEnum.END);
        } else {
            if (startDate && leftDate < startDate) {
                setStartDate(leftDate);
                return;
            }
            setEndDate(leftDate);
            setDatePickingStage(DatePickingStageEnum.START);
        }
    }

    const onRightCalendarChange = (rightDate: string = '') => {
        setEndDate(rightDate);
        setDatePickingStage(DatePickingStageEnum.START);
    }

    const onDropdownClose = () => {
        if (!displayValue) {
            setStartDate(undefined);
            setEndDate(undefined);
        } else {
            const valueFromDisplay = DateRangeUtils.toValue(displayValue!);
            setStartDate(valueFromDisplay.start);
            setEndDate(valueFromDisplay.end);
        }
    }

    return <Input
        label={label}
        value={displayValue}
        defaultValue={displayDefaultValue}
        ref={inputRef}
        onBlur={onBlur}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        error={error}
        type='text'
        placeholder={`yyyy-MM-dd ${EN_DASH} yyyy-MM-dd`}
    >
        <Popover ref={popoverRef} onClose={onDropdownClose}>
            <Popover.Trigger>
                <IconButton><CalendarIcon/></IconButton>
            </Popover.Trigger>
            <Popover.Body trapFocus>
                <Card padding='none' shadow='lg'>
                    <div className='z-date-range-input-dropdown'>
                        <div className='z-date-range-input-dropdown-wrapper'>
                            <div className='z-date-range-input-dropdown-calendar-column'>
                                {
                                    displayLabels ?
                                        <div className='z-date-range-input-calendar-label'>
                                            <H4>{startDateLabel}</H4>
                                        </div> : null
                                }
                                <Calendar
                                    isControlled
                                    value={startDate}
                                    rangeStart={startDate}
                                    rangeEnd={endDate}
                                    onChange={onLeftCalendarChange}
                                    minDate={minStartDate}
                                    maxDate={maxStartDate}
                                    visibleDate={visibleStartDate}
                                    onVisibleDateChange={onVisibleStartDateChange}
                                    {...calendarProps}
                                />
                            </div>
                            <div className='z-date-range-input-dropdown-calendar-column'>
                                {
                                    displayLabels ?
                                        <div className='z-date-range-input-calendar-label'>
                                            <H4>{endDateLabel}</H4>
                                        </div> : null
                                }
                                <Calendar
                                    isControlled
                                    value={endDate}
                                    rangeStart={startDate}
                                    rangeEnd={endDate}
                                    onChange={onRightCalendarChange}
                                    minDate={minEndDate}
                                    maxDate={maxEndDate}
                                    visibleDate={visibleEndDate}
                                    onVisibleDateChange={onVisibleEndDateChange}
                                    {...calendarProps}
                                />
                            </div>
                        </div>
                        <div className='z-date-range-input-dropdown-actions'>
                            <Button onClick={onOkClicked}>OK</Button>
                        </div>
                    </div>
                </Card>
            </Popover.Body>
        </Popover>
    </Input>
}

export {DateRangePickerInput};
export type {DateRangePickerInputProps};
