import {FormArray, FormGroup, FormControl} from "@zoria-ui/forms";
import {useFormContext} from "./FormContext";
import {isFormArray, isFormControl, isFormGroup} from "./FormGuards";

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

const useFormControl = (path: string): FormControl => {
    const {formGroup} = useFormContext();
     const element = formGroup.getElementFromPath(path);

    if (!isFormControl(element)) {
        throw new Error(`useFormControl: element at ${path} is not a FormControl`)
    }

    return element;
}

