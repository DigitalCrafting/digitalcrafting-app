import {type FormInputProps, useFormControl} from "@zoria-ui/forms-react";
import {RadioGroup, type RadioGroupProps} from "@zoria-ui/react";

interface RadioGroupFormInputProps extends FormInputProps, RadioGroupProps {

}

const RadioGroupFormInput = ({path, children, ...rest}: RadioGroupFormInputProps) => {
    const controlProps = useFormControl(path);

    return <RadioGroup {...rest} {...controlProps} >{children}</RadioGroup>
}

export {RadioGroupFormInput};