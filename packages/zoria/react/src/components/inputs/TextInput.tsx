import {Input, type InputProps} from "./Input";

interface TextInputProps extends Omit<InputProps, 'type'> {

}

const TextInput = ({children, ...props}: TextInputProps) => {
    return <Input {...props} type='text'>{children}</Input>
}

export {TextInput};