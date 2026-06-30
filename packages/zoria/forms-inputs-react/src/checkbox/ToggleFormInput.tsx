import {type FormInputProps, useFormControl} from "@zoria-ui/forms-react";
import {Toggle, ToggleProps} from "@zoria-ui/react";

interface ToggleFormInputProps extends FormInputProps, ToggleProps {

}

const ToggleFormInput = ({path, children, ...rest}: ToggleFormInputProps) => {
    const controlProps = useFormControl(path);

    return <Toggle {...rest} {...controlProps} >{children}</Toggle>
}

export {ToggleFormInput};