import {FormArray, FormControl, FormElement, FormElementType, FormGroup} from "@zoria-ui/forms";

export function isFormGroup(element: FormElement): element is FormGroup {
    return element.getType() === FormElementType.FORM_GROUP;
}

export function isFormArray(element: FormElement): element is FormArray {
    return element.getType() === FormElementType.FORM_ARRAY;
}

export function isFormControl(element: FormElement): element is FormControl {
    return element.getType() === FormElementType.FORM_CONTROL;
}

