import {type FormInputProps, useFormControl} from "@zoria-ui/forms-react";
import {AutocompleteInput, AutocompleteInputProps} from "@zoria-ui/react";

interface AutocompleteFormInputProps extends FormInputProps, AutocompleteInputProps {

}

const AutocompleteFormInput = ({path, ...rest}: AutocompleteFormInputProps) => {
    const controlProps = useFormControl(path);

    return <AutocompleteInput {...rest} {...controlProps} />
}

export {AutocompleteFormInput};