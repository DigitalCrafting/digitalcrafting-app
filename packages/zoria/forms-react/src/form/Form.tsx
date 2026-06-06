import {FormGroup} from "@zoria-ui/forms";
import type {PropsWithChildren} from "react";
import {FormContextProvider} from "./FormContext";
import {_FormGroupComponent} from "./internal/FormGroup";
import {_FormArrayComponent} from "./internal/FormArray";
import { useFormPath } from "./internal/FormPathContext";

interface FormProps {
    formGroup: FormGroup;
}

const InternalForm = ({children, formGroup}: PropsWithChildren<FormProps>) => {
    return <FormContextProvider formGroup={formGroup}>
        <form>
            {children}
        </form>
    </FormContextProvider>
}

const Form = Object.assign(InternalForm, {
    Group: _FormGroupComponent,
    Array: _FormArrayComponent
})

export {Form, useFormPath};