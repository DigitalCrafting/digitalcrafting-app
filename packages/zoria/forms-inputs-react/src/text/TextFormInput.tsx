import {FormInputProps, useFormControl} from "@zoria-ui/forms-react";
import {TextInput, TextInputProps} from "@zoria-ui/react";

interface TextFormInputProps extends FormInputProps, TextInputProps {

}

const TextFormInput = ({path, children, ...rest}: TextFormInputProps) => {
    const controlProps = useFormControl(path);

    return <TextInput {...rest} {...controlProps} >{children}</TextInput>
}

export {TextFormInput};