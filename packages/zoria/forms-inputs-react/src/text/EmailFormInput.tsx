import {type FormInputProps, useFormControl} from "@zoria-ui/forms-react";
import {EmailInput, EmailInputProps} from "@zoria-ui/react";

interface EmailFormInputProps extends FormInputProps, EmailInputProps {

}

const EmailFormInput = ({path, children, ...rest}: EmailFormInputProps) => {
    const controlProps = useFormControl(path);

    return <EmailInput {...rest} {...controlProps} >{children}</EmailInput>
}

export {EmailFormInput};