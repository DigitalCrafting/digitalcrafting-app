import {type FormInputProps, useFormControl} from "@zoria-ui/forms-react";
import {TimePickerInput, type TimePickerInputProps} from "@zoria-ui/react";

interface TimePickerFormInputProps extends FormInputProps, TimePickerInputProps {

}

const TimePickerFormInput = ({path, ...rest}: TimePickerFormInputProps) => {
    const controlProps = useFormControl(path);

    return <TimePickerInput {...rest} {...controlProps} />
}

export {TimePickerFormInput};