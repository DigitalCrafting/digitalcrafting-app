import {Input} from "../../Input";
import {Popover, type PopoverHandle} from "../../../popover/Popover";
import {IconButton} from "../../../buttons/IconButton";
import {CalendarIcon} from "../../../icons/Icons";
import {Calendar} from "../calendar/Calendar";
import * as React from "react";
import {type ChangeEvent, type KeyboardEventHandler, useEffect, useRef, useState} from "react";
import {StringUtils} from "../../../../utils/StringUtils";
import {Card} from "../../../card/Card";
import {FUNCTIONAL_KEYS} from "../internal/Utils";
import {DatePickingStageEnum, type DatePickingStageEnumType, type DateRangeValue} from "../types/DateTimeTypes";
import {DateRangeUtils} from "../internal/date/DateRangeUtils";
import {EN_DASH, HYPHEN} from "../../../../types/CommonTypes";
import {Button} from "../../../buttons/Button";
import {H4} from "../../../typography/Typography";
import {useVisibleDateRange} from "../internal/date/useVisibleDateRange";
import {DateUtils} from "../internal/date/DateUtils";
import {ZDateTimeRegex} from "../internal/type-wrapper/ZDateTimeRegex";
import {type ZoriaInputProps} from "../../ZoriaInputProps";
import {useInputValue} from "../../internal/useInputValue";
import {useInputError} from "../../internal/useInputError";

interface DateRangePickerInputProps extends ZoriaInputProps<DateRangeValue> {
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
    "data-testid": dataTestId = 'qa-date-range-picker',
    ...calendarProps
}: DateRangePickerInputProps) => {
    const [rangeValue, setRangeValue] = useInputValue<DateRangeValue>(value, onChange, defaultValue, isControlled);
    const [error, setError] = useInputError(externalError);

    const [startDate, setStartDate] = useState(rangeValue?.start);
    const [endDate, setEndDate] = useState(rangeValue?.end);
    const [displayValue, setDisplayValue] = useState(DateRangeUtils.toDisplay(rangeValue));
    const [displayDefaultValue] = useState(DateRangeUtils.toDisplay(rangeValue));

    useEffect(() => {
        if (!rangeValue) {
            setStartDate(undefined);
            setEndDate(undefined);
        } else {
            setStartDate(rangeValue.start);
            setEndDate(rangeValue.end);
        }
        setDisplayValue(DateRangeUtils.toDisplay(rangeValue));
    }, [rangeValue]);

    const [datePickingStage, setDatePickingStage] = useState<DatePickingStageEnumType>(DatePickingStageEnum.START);
    const popoverRef = useRef<PopoverHandle>(null);
    const displayLabels = false; // TODO visible on smaller screens, 1 calendar at a time

    const {
        visibleStartDate,
        setVisibleStartDate,
        onVisibleStartDateChange,
        minStartDate,
        maxStartDate,
        visibleEndDate,
        setVisibleEndDate,
        onVisibleEndDateChange,
        minEndDate,
        maxEndDate
    } = useVisibleDateRange(startDate, endDate, minDate, maxDate);

    const onFocus = () => {
        if (!displayValue || StringUtils.isEmpty(displayValue)) {
            return;
        }
        const normalizedValue = displayValue.replace(
            ZDateTimeRegex.DISPLAY_DATE_RANGE_REGEX,
            `$1 ${HYPHEN} $2`
        );
        setDisplayValue(normalizedValue);
    }

    const onBlur = () => {
        // TS does not understand what isEmpty does
        if (!displayValue || StringUtils.isEmpty(displayValue)) {
            setError(undefined);
            setRangeValue(undefined);
            return;
        }

        const range = DateRangeUtils.parseDateRange(displayValue);
        if (range) {
            const formattedValue = displayValue.replace(
                ZDateTimeRegex.DISPLAY_DATE_RANGE_REGEX,
                `$1 ${EN_DASH} $2`
            );
            const startDateIsoString = DateUtils.dateToIsoString(range.startDate);
            const endDateIsoString = DateUtils.dateToIsoString(range.endDate);
            setStartDate(startDateIsoString);
            setVisibleStartDate(startDateIsoString);
            setEndDate(endDateIsoString);
            setVisibleEndDate(endDateIsoString);
            setDisplayValue(formattedValue);
            setRangeValue({
                start: startDateIsoString,
                end: endDateIsoString
            });
        } else {
            setError(`Incorrect date range ${displayValue}`);
            setDisplayValue('');
        }
    }

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event: React.KeyboardEvent | KeyboardEvent) => {
        if (FUNCTIONAL_KEYS.includes(event.key)) return;

        if (event.ctrlKey || event.shiftKey) return;

        const isValidKey = /^[0-9\s\-]$/.test(event.key);

        if (!isValidKey) {
            event.preventDefault();
        }
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const targetElement = event.target;
        let value = targetElement.value;
        setDisplayValue(value)
    };

    const onOkClicked = () => {
        if (startDate && endDate) {
            const newValue = {
                start: startDate,
                end: endDate
            };
            setDisplayValue(DateRangeUtils.toDisplay(newValue));
            setRangeValue(newValue);
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
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        error={error}
        type='text'
        placeholder={`yyyy-MM-dd ${EN_DASH} yyyy-MM-dd`}
        data-testid={`${dataTestId}-input`}
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
                                    data-testid={`${dataTestId}-date-start`}
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
                                    data-testid={`${dataTestId}-date-end`}
                                    {...calendarProps}
                                />
                            </div>
                        </div>
                        <div className='z-date-range-input-dropdown-actions'>
                            {/* TODO button label */}
                            <Button data-testid={`${dataTestId}-ok-btn`} onClick={onOkClicked}>OK</Button>
                        </div>
                    </div>
                </Card>
            </Popover.Body>
        </Popover>
    </Input>
}

export {DateRangePickerInput};
export type {DateRangePickerInputProps};
