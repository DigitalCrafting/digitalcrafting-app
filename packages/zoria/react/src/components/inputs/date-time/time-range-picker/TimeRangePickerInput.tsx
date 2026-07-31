import {type TimeRangeValue} from "../types/DateTimeTypes";
import {Input} from "../../Input";
import {EN_DASH, HYPHEN} from "../../../../types/CommonTypes";
import {Popover, type PopoverHandle} from "../../../popover/Popover";
import {IconButton} from "../../../buttons/IconButton";
import {CalendarIcon} from "../../../icons/Icons";
import {Card} from "../../../card/Card";
import {H4} from "../../../typography/Typography";
import {Button} from "../../../buttons/Button";
import * as React from "react";
import {type ChangeEvent, type KeyboardEventHandler, useEffect, useRef, useState} from "react";
import {TimePickerSelect} from "../internal/time/TimePickerSelect";
import {TimeRangeUtils} from "../internal/time/TimeRangeUtils";
import {useTimePickerSelectOptions} from "../internal/time/useTimePickerSelectOptions";
import {TimeUtils} from "../internal/time/TimeUtils";
import {FUNCTIONAL_KEYS} from "../internal/Utils";
import {StringUtils} from "../../../../utils/StringUtils";
import type {ZoriaInputProps} from "../../ZoriaInputProps";
import {useInputValue} from "../../internal/useInputValue";

interface TimeRangePickerInputProps extends ZoriaInputProps<TimeRangeValue> {
    startTimeLabel?: string;
    endTimeLabel?: string;

    minutesInterval?: number;
    minHour?: number;
    maxHour?: number;
    minMin?: number;
    maxMin?: number;
}

const TimeRangePickerInput = ({
    value,
    defaultValue,
    onChange,
    label,
    error: externalError,
    minutesInterval = 30,
    minHour = 0,
    maxHour = 24,
    minMin = 0,
    maxMin = 60,
    startTimeLabel = 'Start',
    endTimeLabel = 'End',
    isControlled = false,
}: TimeRangePickerInputProps) => {
    const [rangeValue, setRangeValue] = useInputValue<TimeRangeValue>(value, onChange, defaultValue, isControlled);
    const [error, setError] = useState<string | undefined>(externalError);
    const [startTime, setStartTime] = useState(defaultValue?.start);
    const [endTime, setEndTime] = useState(defaultValue?.end);
    const [displayValue, setDisplayValue] = useState(TimeRangeUtils.toDisplay(value));
    const [displayDefaultValue] = useState(TimeRangeUtils.toDisplay(defaultValue))


    useEffect(() => {
        if (!rangeValue) {
            setStartTime(undefined);
            setEndTime(undefined);
        } else {
            setStartTime(rangeValue.start);
            setEndTime(rangeValue.end);
        }
        setDisplayValue(TimeRangeUtils.toDisplay(rangeValue));
    }, [rangeValue]);

    const inputRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<PopoverHandle>(null);

    const displayLabels = false; // TODO visible on smaller screens, 1 calendar at a time

    const startTimePickerOptions = useTimePickerSelectOptions(
        minutesInterval,
        minHour,
        maxHour,
        minMin,
        maxMin
    )

    const [minEndHour, minEndMin] = TimeUtils.splitToNumbers(startTime);
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
        const normalizedValue = displayValue.replace(
            /(\d{1,2}:\d{2}(?::\d{2})?)\s*[–—\-]\s*(\d{1,2}:\d{2}(?::\d{2})?)/,
            `$1 ${HYPHEN} $2`
        );
        setDisplayValue(normalizedValue);
    }

    const onBlur = () => {
        if (!displayValue || StringUtils.isEmpty(displayValue)) {
            setError(undefined);
            return;
        }

        const range = TimeRangeUtils.parseTimeRange(displayValue);
        if (range) {
            const startTimeIsoString = range.startTime.formatted;
            const endTimeIsoString = range.endTime.formatted;
            const formattedValue = `${startTimeIsoString} ${EN_DASH} ${endTimeIsoString}`;
            setStartTime(startTimeIsoString);
            setEndTime(endTimeIsoString);
            setDisplayValue(formattedValue)
            setRangeValue({
                start: startTimeIsoString,
                end: endTimeIsoString
            })
        } else {
            setError(`Incorrect date range ${displayValue}`);
            setDisplayValue('');
        }
    }

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event: React.KeyboardEvent | KeyboardEvent) => {
        if (FUNCTIONAL_KEYS.includes(event.key)) return;

        if (event.ctrlKey || event.shiftKey) return;

        const isNumber = /^[0-9\s]$/.test(event.key);

        const isColon = event.key === ':';

        if (!isNumber && !isColon) {
            event.preventDefault();
        }
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const targetElement = event.target;
        let value = targetElement.value;
        setDisplayValue(value)
    };

    const onDropdownClose = () => {
        if (!displayValue) {
            setStartTime(undefined);
            setEndTime(undefined);
        } else {
            const valueFromDisplay = TimeRangeUtils.parseTimeRange(displayValue);
            setStartTime(valueFromDisplay?.startTime.formatted);
            setEndTime(valueFromDisplay?.endTime.formatted);
        }
    }

    const onLeftTimeChange = (leftTime: string = '') => {
        if (endTime && leftTime > endTime) {
            setEndTime(undefined);
        }
        setStartTime(leftTime)
    }

    const onRightTimeChange = (rightTime: string = '') => {
        setEndTime(rightTime);
    }

    const onOkClicked = () => {
        if (startTime && endTime) {
            const newValue = {
                start: startTime,
                end: endTime
            };
            setDisplayValue(TimeRangeUtils.toDisplay(newValue));
            setRangeValue(newValue);
            popoverRef.current?.close();
        }
    }

    return <Input
        label={label}
        value={displayValue}
        defaultValue={displayDefaultValue}
        ref={inputRef}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        error={error}
        type='text'
        placeholder={`HH:mm ${EN_DASH} HH:mm`}
    >
        <Popover ref={popoverRef} onClose={onDropdownClose}>
            <Popover.Trigger>
                <IconButton><CalendarIcon/></IconButton>
            </Popover.Trigger>
            <Popover.Body>
                <Card padding='none' shadow='lg'>
                    <div className='z-time-range-input-dropdown'>
                        <div className='z-time-range-input-dropdown-wrapper'>
                            <div className='z-time-range-input-dropdown-time-column'>
                                {
                                    displayLabels ?
                                        <div className='z-time-range-input-time-label'>
                                            <H4>{startTimeLabel}</H4>
                                        </div> : null
                                }
                                <TimePickerSelect
                                    isControlled
                                    value={startTime}
                                    onSelected={onLeftTimeChange}
                                    options={startTimePickerOptions}
                                />
                            </div>
                            <div className='z-time-range-input-dropdown-time-column'>
                                {
                                    displayLabels ?
                                        <div className='z-time-range-input-time-label'>
                                            <H4>{endTimeLabel}</H4>
                                        </div> : null
                                }
                                <TimePickerSelect
                                    isControlled
                                    value={endTime}
                                    onSelected={onRightTimeChange}
                                    options={endTimePickerOptions}
                                />
                            </div>
                        </div>
                        <div className='z-time-range-input-dropdown-actions'>
                            <Button onClick={onOkClicked}>OK</Button>
                        </div>
                    </div>
                </Card>
            </Popover.Body>
        </Popover>
    </Input>
}

export {TimeRangePickerInput};
export type {TimeRangePickerInputProps};