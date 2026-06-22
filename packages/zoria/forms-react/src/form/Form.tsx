import {ZoriaFormGroup} from "@zoria-ui/forms";
import type {PropsWithChildren} from "react";
import {FormContextProvider} from "./FormContext";
import {_FormGroupComponent} from "./internal/group/FormGroup";
import {_FormArrayComponent} from "./internal/array/FormArray";
import { useFormPath } from "./internal/FormPathContext";

interface FormProps {
    formGroup: ZoriaFormGroup;
}

const InternalForm = ({children, formGroup}: PropsWithChildren<FormProps>) => {
    return <FormContextProvider formGroup={formGroup}>
        <form className='z-form'>
            {children}
        </form>
    </FormContextProvider>
}

const Form = Object.assign(InternalForm, {
    Group: _FormGroupComponent,
    Array: _FormArrayComponent
})

export {Form, useFormPath};