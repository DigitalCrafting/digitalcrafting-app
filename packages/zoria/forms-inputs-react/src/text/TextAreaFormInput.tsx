import {type FormInputProps, useFormControl} from "@zoria-ui/forms-react";
import {TextareaInput, type TextareaInputProps} from "@zoria-ui/react";

interface TextareaFormInputProps extends FormInputProps, TextareaInputProps {

}

const TextareaFormInput = ({path, children, ...rest}: TextareaFormInputProps) => {
    const controlProps = useFormControl(path);

    return <TextareaInput {...rest} {...controlProps} >{children}</TextareaInput>
}

export {TextareaFormInput};