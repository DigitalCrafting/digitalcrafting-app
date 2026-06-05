import {FormArray, FormControl, FormGroup, isFormArray, isFormControl, isFormGroup} from "@zoria-ui/forms";
import {useFormContext} from "./FormContext";
import {useCallback, useEffect, useMemo, useState} from "react";

const useFormGroup = (path: string): FormGroup => {
    const {formGroup} = useFormContext();
    const element = formGroup.getElementFromPath(path);

    if (!isFormGroup(element)) {
        throw new Error(`useFormGroup: element at ${path} is not a FormGroup`)
    }

    return element;
}

const useFormArray = (path: string): FormArray => {
    const {formGroup} = useFormContext();
    const element = formGroup.getElementFromPath(path);

    if (!isFormArray(element)) {
        throw new Error(`useFormArray: element at ${path} is not a FormArray`)
    }

    return element;
}

type UseFormControlReturn<T = any> = {
    value: T,
    error?: string,
    onChange: (value: T) => void
}

const useFormControl = <T = any>(path: string): UseFormControlReturn<T> => {
    const {formGroup} = useFormContext();
    const control: FormControl = useMemo(() => {
        const element = formGroup.getElementFromPath(path);

        if (!isFormControl(element)) {
            throw new Error(`useFormControl: element at ${path} is not a FormControl`)
        }

        return element;
    }, [path]);

    const [value, setValue] = useState<T>(control.getValue());
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        const sub = control.onValidityChanges((error) => {
            setError(error);
        });

        return () => {
            sub.unsubscribe();
        }
    }, [])

    const onChange = useCallback((value: T) => {
        setValue(value);
        control.setValue(value);
    }, [])

    return {
        value,
        error,
        onChange
    };
}

export {useFormGroup, useFormArray, useFormControl};

