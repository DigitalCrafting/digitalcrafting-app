import {Input, type InputProps} from "./Input";
import {Popover, type PopoverHandle} from "../popover/Popover";
import {IconButton} from "../buttons/IconButton";
import {CalendarIcon} from "../icons/Icons";
import {Calendar} from "../date/Calendar";
import {type ChangeEvent, useRef, useState} from "react";

interface DatePickerInputProps extends Omit<InputProps, 'type' | 'value' | 'onChange'> {
    value?: string
    onChange?: (value: string) => void
}

const DatePickerInput = (inputProps: DatePickerInputProps) => {
    const [selectedDate, setSelectedDate] = useState<string | undefined>(inputProps.value);

    const inputRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<PopoverHandle>(null);

    const onCalendarChange = (value: string) => {
        if (inputRef.current) {
            inputRef.current.value = value;
            setSelectedDate(value);
            popoverRef.current?.close();
            inputProps?.onChange?.(value);
        } else {
            console.error(`[DatePickerInput]: inputRef is not defined`)
        }
    }

    /* TODO Validate the date, add keyDown handler */
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedDate(value);
        inputProps?.onChange?.(value);
    }

    return <Input {...inputProps}  ref={inputRef} onChange={onInputChange} type='text'>
        <Popover ref={popoverRef}>
            <Popover.Trigger>
                <IconButton><CalendarIcon/></IconButton>
            </Popover.Trigger>
            <Popover.Body padding='lg'>
                <Calendar value={selectedDate} onChange={onCalendarChange} />
            </Popover.Body>
        </Popover>
    </Input>
}

export {DatePickerInput};