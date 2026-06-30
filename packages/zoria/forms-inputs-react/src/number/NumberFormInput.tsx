import {FormInputProps, useFormControl} from "@zoria-ui/forms-react";
import {NumberInput, TextInputProps} from "@zoria-ui/react";

interface NumberFormInputProps extends FormInputProps, TextInputProps {

}

const NumberFormInput = ({path, children, ...rest}: NumberFormInputProps) => {
    const controlProps = useFormControl(path);

    return <NumberInput {...rest} {...controlProps} >{children}</NumberInput>
}

export {NumberFormInput};