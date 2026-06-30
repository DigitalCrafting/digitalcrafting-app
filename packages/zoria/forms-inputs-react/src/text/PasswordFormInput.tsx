import {type FormInputProps, useFormControl} from "@zoria-ui/forms-react";
import {PasswordInput, PasswordInputProps} from "@zoria-ui/react";

interface PasswordFormInputProps extends FormInputProps, PasswordInputProps {

}

const PasswordFormInput = ({path, children, ...rest}: PasswordFormInputProps) => {
    const controlProps = useFormControl(path);

    return <PasswordInput {...rest} {...controlProps} >{children}</PasswordInput>
}

export {PasswordFormInput};