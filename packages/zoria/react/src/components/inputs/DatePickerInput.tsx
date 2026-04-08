import {Input, type InputProps} from "./Input";
import {Popover} from "../popover/Popover";
import {IconButton} from "../buttons/IconButton";
import {CalendarIcon} from "../icons/Icons";
import {Calendar} from "../date/Calendar";

interface DatePickerInputProps extends Omit<InputProps, 'type'> {}

const DatePickerInput = ({...inputProps}: DatePickerInputProps) => {

    // TODO make ref for Calendar and Input, and control the date value

    return <Input {...inputProps} type='text'>
        <Popover>
            <Popover.Trigger>
                <IconButton><CalendarIcon/></IconButton>
            </Popover.Trigger>
            <Popover.Body padding='none'>
                <Calendar onChange={(value) => console.log(value)} />
            </Popover.Body>
        </Popover>
    </Input>
}

export {DatePickerInput};