import {Input} from "../../Input";
import {EN_DASH, HYPHEN} from "../../../../types/CommonTypes";
import {Popover, type PopoverHandle} from "../../../popover/Popover";
import {IconButton} from "../../../buttons/IconButton";
import {CalendarIcon} from "../../../icons/Icons";
import {Card} from "../../../card/Card";
import {H4} from "../../../typography/Typography";
import {Calendar} from "../calendar/Calendar";
import {Button} from "../../../buttons/Button";
import * as React from "react";
import {type ChangeEvent, type KeyboardEventHandler, useEffect, useMemo, useRef, useState} from "react";
import {TimePickerSelect} from "../internal/time/TimePickerSelect";
import {
    DatePickingStageEnum,
    type DatePickingStageEnumType,
    type DateTimeRangeValue,
    type InternalDateTimeRangeValue
} from "../types/DateTimeTypes";
import {DateTimeRangeUtils} from "../internal/DateTimeRangeUtils";
import {useVisibleDateRange} from "../internal/date/useVisibleDateRange";
import {useTimePickerSelectOptions} from "../internal/time/useTimePickerSelectOptions";
import {TimeUtils} from "../internal/time/TimeUtils";
import {FUNCTIONAL_KEYS} from "../internal/Utils";
import {StringUtils} from "../../../../utils/StringUtils";
import {type ZoriaInputProps} from "../../ZoriaInputProps";
import {useInputValue} from "../../internal/useInputValue";
import {useInputError} from "../../internal/useInputError";

interface DateTimeRangePickerInputProps extends ZoriaInputProps<DateTimeRangeValue> {
    startLabel?: string;
    endLabel?: string;
    minDate?: string;
    maxDate?: string;

    // Calendar props
    startingDay?: string;
    yearRangeStart?: number;
    yearRangeEnd?: number;
    weekdays?: string[];
    months?: string[];

    // Time props
    minutesInterval?: number;
    minHour?: number;
    maxHour?: number;
    minMin?: number;
    maxMin?: number;
}

const DateTimeRangePickerInput = ({
    label,
    error: externalError,
    disabled,

    value,
    defaultValue,
    onChange,
    isControlled = false,
    startLabel = 'Start',
    endLabel = 'End',
    minDate,
    maxDate,

    startingDay,
    yearRangeStart,
    yearRangeEnd,
    weekdays,
    months,

    minutesInterval,
    minHour,
    maxHour,
    minMin,
    maxMin,

    "data-testid": dataTestId = 'qa-date-time-range-picker'
}: DateTimeRangePickerInputProps) => {
    const [rangeValue, setRangeValue] = useInputValue<DateTimeRangeValue>(value, onChange, defaultValue, isControlled);
    const [error, setError] = useInputError(externalError);

    const internalRangeValue = DateTimeRangeUtils.fromExternalValue(rangeValue);

    const [startDate, setStartDate] = useState(internalRangeValue?.startDate);
    const [endDate, setEndDate] = useState(internalRangeValue?.endDate);
    const [startTime, setStartTime] = useState(internalRangeValue?.startTime);
    const [endTime, setEndTime] = useState(internalRangeValue?.endTime);

    const [displayValue, setDisplayValue] = useState(DateTimeRangeUtils.toDisplay(internalRangeValue));
    const [displayDefaultValue] = useState(DateTimeRangeUtils.toDisplay(internalRangeValue))
    const [datePickingStage, setDatePickingStage] = useState<DatePickingStageEnumType>(DatePickingStageEnum.START)

    useEffect(() => {
        if (!rangeValue) {
            setStartDate(undefined);
            setStartTime(undefined);
            setEndDate(undefined);
            setEndTime(undefined);
            setDisplayValue(undefined);
        } else {
            const internalValue = DateTimeRangeUtils.fromExternalValue(rangeValue);
            setStartDate(internalValue?.startDate);
            setStartTime(internalValue?.startTime);
            setEndDate(internalValue?.endDate);
            setEndTime(internalValue?.endTime);
            setDisplayValue(DateTimeRangeUtils.toDisplay(internalValue));
        }
    }, [rangeValue]);

    const popoverRef = useRef<PopoverHandle>(null);

    const displayLabels = false; // TODO visible on smaller screens, 1 calendar at a time
    const calendarProps = {
        startingDay,
        yearRangeStart,
        yearRangeEnd,
        weekdays,
        months,
    }

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

    const startTimePickerOptions = useTimePickerSelectOptions(
        minutesInterval,
        minHour,
        maxHour,
        minMin,
        maxMin
    )

    const [minEndHour, minEndMin] = useMemo(() => {
        if (startDate === endDate) {
            return TimeUtils.splitToNumbers(startTime);
        }

        return [minHour, minMin];
    }, [startTime, startDate, endDate])

    const endTimePickerOptions = useTimePickerSelectOptions(
        minutesInterval,
        minEndHour,
        maxHour,
        minEndMin,
        maxMin
    )


    const onFocus = () => {
        if (!displayValue || StringUtils.isEmpty(displayValue)) {
            return;
        }

        setDisplayValue(displayValue.replace(EN_DASH, HYPHEN));
    }

    const onBlur = () => {

        if (!displayValue || StringUtils.isEmpty(displayValue)) {
            setError(undefined);
            setRangeValue(undefined);
            return;
        }

        setDisplayValue(displayValue.replace(
            DateTimeRangeUtils.DATE_TIME_RANGE_REGEX,
            `$1 ${EN_DASH} $2`
        ));
        const valueFromDisplay = DateTimeRangeUtils.toInternalValue(displayValue!);
        if (!valueFromDisplay) {
            setError('Incorrect date time range value');
            return;
        } else {
            setError(undefined);
        }

        setStartDate(valueFromDisplay.startDate);
        setEndDate(valueFromDisplay.endDate);
        setStartTime(valueFromDisplay.startTime);
        setEndTime(valueFromDisplay.endTime);
        setRangeValue?.(DateTimeRangeUtils.toExternalValue(valueFromDisplay));
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const targetElement = event.target;
        let value = targetElement.value;
        setDisplayValue(value)
    };

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event: React.KeyboardEvent | KeyboardEvent) => {
        if (FUNCTIONAL_KEYS.includes(event.key)) return;
        if (event.ctrlKey || event.shiftKey) return;

        const isValidKey = /^[0-9\s\-:]$/.test(event.key);

        if (!isValidKey) {
            event.preventDefault();
        }
    }

    const onOkClicked = () => {
        if (startDate && endDate && startTime && endTime) {
            const newValue: InternalDateTimeRangeValue = {
                startDate,
                endDate,
                startTime,
                endTime,
                isSameDay: startDate === endDate
            };
            setDisplayValue(DateTimeRangeUtils.toDisplay(newValue));
            setRangeValue?.(DateTimeRangeUtils.toExternalValue(newValue));
            popoverRef.current?.close();
        }
    }

    const onDropdownClose = () => {
        if (!displayValue) {
            setStartDate(undefined);
            setEndDate(undefined);
            setStartTime(undefined);
            setEndTime(undefined);
        } else {
            const valueFromDisplay = DateTimeRangeUtils.toInternalValue(displayValue!);
            if (!valueFromDisplay) {
                return;
            }

            setStartDate(valueFromDisplay.startDate);
            setEndDate(valueFromDisplay.endDate);
            setStartTime(valueFromDisplay.startTime);
            setEndTime(valueFromDisplay.endTime);
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
    };

    const onLeftTimeChange = (leftTime: string = '') => {
        if (endTime && leftTime > endTime) {
            setEndTime(undefined);
        }
        setStartTime(leftTime)
    }

    const onRightTimeChange = (rightTime: string = '') => {
        setEndTime(rightTime);
    }

    return <Input
        label={label}
        value={displayValue}
        defaultValue={displayDefaultValue}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        error={error}
        type='text'
        placeholder={`yyyy-MM-dd HH:mm ${EN_DASH} yyyy-MM-dd HH:mm`}
        data-testid={`${dataTestId}-input`}
        disabled={disabled}
    >
        <Popover ref={popoverRef} onClose={onDropdownClose}>
            <Popover.Trigger>
                <IconButton disabled={disabled} data-testid={`${dataTestId}-dropdown-trigger`}><CalendarIcon/></IconButton>
            </Popover.Trigger>
            <Popover.Body trapFocus>
                <Card padding='none' shadow='lg'>
                    <div className='z-date-time-range-input-dropdown'>
                        <div className='z-date-time-range-input-dropdown-wrapper'>
                            <div className='z-date-time-range-input-dropdown-calendar-column'>
                                {
                                    displayLabels ?
                                        <div className='z-date-time-range-input-label'>
                                            <H4>{startLabel}</H4>
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
                                    data-testid={`${dataTestId}-date-start`}
                                    {...calendarProps}
                                />
                            </div>
                            <div className='z-date-time-range-input-dropdown-time-column'>
                                <TimePickerSelect
                                    isControlled
                                    value={startTime}
                                    onSelected={onLeftTimeChange}
                                    options={startTimePickerOptions}
                                    data-testid={`${dataTestId}-time-start`}
                                />
                            </div>
                            <div className='z-date-time-range-input-dropdown-calendar-column'>
                                {
                                    displayLabels ?
                                        <div className='z-date-time-range-input-label'>
                                            <H4>{endLabel}</H4>
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
                                    data-testid={`${dataTestId}-date-end`}
                                    {...calendarProps}
                                />
                            </div>
                            <div className='z-date-time-range-input-dropdown-time-column'>
                                <TimePickerSelect
                                    isControlled
                                    value={endTime}
                                    onSelected={onRightTimeChange}
                                    options={endTimePickerOptions}
                                    data-testid={`${dataTestId}-time-end`}
                                />
                            </div>
                        </div>
                        <div className='z-date-time-range-input-dropdown-actions'>
                            <Button data-testid={`${dataTestId}-ok-btn`} onClick={onOkClicked}>OK</Button>
                        </div>
                    </div>
                </Card>
            </Popover.Body>
        </Popover>
    </Input>
}

export {DateTimeRangePickerInput}
export type {DateTimeRangePickerInputProps};