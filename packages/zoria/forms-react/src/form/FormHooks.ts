import {
    ZoriaFormArray,
    ZoriaFormControl,
    ZoriaFormGroup,
    isFormArray,
    isFormControl,
    isFormGroup,
    type ValidationError, AbstractZoriaFormElement
} from "@zoria-ui/forms";
import {useFormContext} from "./FormContext";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useFormPath} from "./internal/FormPathContext";
import type {ObjectPaths} from "@zoria-ui/utils";

declare const process: { env: { NODE_ENV: string } };

/**
 * @param path - optional, period separated absolute path down the Form structure
 *
 * @return {@link AbstractZoriaFormElement}
 *
 * If {@link path} is provided, returns the element down the path from the root form element.
 * If {@link path} is not provided, takes the nearest path from {@link FormPathContext} using {@link useFormPath} hook,
 * and returns that element. Which basically means it returns the form element of current context.
 * If there is no path or context, it returns the root element.
 * */
const useFormElement = <T = any>(path?: ObjectPaths<T>): AbstractZoriaFormElement => {
    const {formGroup} = useFormContext();
    const contextPath = useFormPath();

    return useMemo(() => {
        const currentPath = !path ? contextPath : path;

        if (!currentPath) {
            return formGroup;
        }

        return formGroup.getElement(currentPath);
    }, [path, formGroup, contextPath])
}

const useFormGroup = <T = any>(path?: ObjectPaths<T>): ZoriaFormGroup => {
    const element = useFormElement(path);

    if (process.env.NODE_ENV !== 'production') {
        if (!isFormGroup(element)) {
            throw new Error(`useFormGroup::element at ${path} is not a FormGroup`)
        }
    }

    return element as ZoriaFormGroup;
}

type UseFormArrayReturn<T = any> = {
    value: T[],
    error?: ValidationError,
    arrayControl: ZoriaFormArray
}

const useFormArray = <T = any>(path?: ObjectPaths<T>): UseFormArrayReturn<T> => {
    const element = useFormElement(path) as ZoriaFormArray;

    if (process.env.NODE_ENV !== 'production') {
        if (!isFormArray(element)) {
            throw new Error(`useFormArray::element at ${path} is not a FormArray`)
        }
    }

    const [value, setValue] = useState<T[]>(element.getValue());
    const [error, setError] = useState<ValidationError>(element.getError());

    useEffect(() => {
        const valueSub = element.onValueChanges((newValue) => {
            setValue(newValue);
        })

        const errorSub = element.onErrorChanges((newError) => {
            setError(newError);
        })

        return () => {
            valueSub.unsubscribe();
            errorSub.unsubscribe();
        }
    }, [element]);

    return {
        value,
        error,
        arrayControl: element
    };
}

type UseFormControlReturn<T = any> = {
    value: T,
    error?: ValidationError,
    onChange: (value: T) => void,
    control: ZoriaFormControl
}

const useFormControl = <T = any>(path?: ObjectPaths<T>): UseFormControlReturn<T> => {
    const currentPath = useFormPath(path);
    const element = useFormElement(currentPath) as ZoriaFormControl;

    if (process.env.NODE_ENV !== 'production') {
        if (!isFormControl(element)) {
            throw new Error(`useFormControl::element at ${path} is not a FormControl`)
        }
    }

    const [value, setValue] = useState<T>(element.getValue());
    const [error, setError] = useState<ValidationError>();

    useEffect(() => {
        const sub = element.onErrorChanges((error) => {
            setError(error);
        });

        return () => {
            sub.unsubscribe();
        }
    }, [])

    const onChange = useCallback((value: T) => {
        setValue(value);
        element.setValue(value);
    }, [])

    return {
        value,
        error,
        onChange,
        control: element
    };
}

export {useFormElement, useFormGroup, useFormArray, useFormControl};

