import {type FormInputProps, useFormControl} from "@zoria-ui/forms-react";
import {DatePickerInput, type DatePickerInputProps} from "@zoria-ui/react";

interface DatePickerFormInputProps extends FormInputProps, DatePickerInputProps {

}

const DatePickerFormInput = ({path, ...rest}: DatePickerFormInputProps) => {
    const controlProps = useFormControl(path);

    return <DatePickerInput {...rest} {...controlProps} />
}

export {DatePickerFormInput};