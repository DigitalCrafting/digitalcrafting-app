import {type FormInputProps, useFormControl} from "@zoria-ui/forms-react";
import {SelectInput, type SelectInputProps} from "@zoria-ui/react";

type SelectFormInputProps = FormInputProps & SelectInputProps;

const SelectFormInput = ({path, ...rest}: SelectFormInputProps) => {
    const controlProps = useFormControl(path);

    return <SelectInput {...rest} {...controlProps} />
}

export {SelectFormInput};