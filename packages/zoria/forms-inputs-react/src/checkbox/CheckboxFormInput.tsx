import {type FormInputProps, useFormControl} from "@zoria-ui/forms-react";
import {Checkbox, CheckboxProps} from "@zoria-ui/react";

interface CheckboxFormInputProps extends FormInputProps, CheckboxProps {

}

const CheckboxFormInput = ({path, children, ...rest}: CheckboxFormInputProps) => {
    const controlProps = useFormControl(path);

    return <Checkbox {...rest} {...controlProps} >{children}</Checkbox>
}

export {CheckboxFormInput};