import {type FormInputProps, useFormControl} from "@zoria-ui/forms-react";
import {TextInput, type TextInputProps} from "@zoria-ui/react";

interface TextFormInputProps extends FormInputProps, TextInputProps {

}

const TextFormInput = ({path, children, ...rest}: TextFormInputProps) => {
    const controlProps = useFormControl(path);

    return <TextInput {...rest} {...controlProps} >{children}</TextInput>
}

export {TextFormInput};