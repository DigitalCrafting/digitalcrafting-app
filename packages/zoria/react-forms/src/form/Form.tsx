import {FormGroup} from "@zoria-ui/forms";
import {PropsWithChildren} from "react";
import {FormContextProvider} from "./FormContext";

interface FormProps {
    formGroup: FormGroup
}

const Form = ({children, formGroup}: PropsWithChildren<FormProps>) => {
    return <FormContextProvider formGroup={formGroup}>
        <form>
            {children}
        </form>
    </FormContextProvider>
}

export {Form};