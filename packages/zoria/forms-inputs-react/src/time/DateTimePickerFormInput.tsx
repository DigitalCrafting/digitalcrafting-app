import {type FormInputProps, useFormControl} from "@zoria-ui/forms-react";
import {DateTimePickerInput, type DateTimePickerInputProps} from "@zoria-ui/react";

interface DateTimePickerFormInputProps extends FormInputProps, DateTimePickerInputProps {

}

const DateTimePickerFormInput = ({path, ...rest}: DateTimePickerFormInputProps) => {
    const controlProps = useFormControl(path);

    return <DateTimePickerInput {...rest} {...controlProps} />
}

export {DateTimePickerFormInput};