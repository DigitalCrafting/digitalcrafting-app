import {FormArray, FormControl, type FormElement, FormElementTypeEnum, FormGroup} from "../forms/ZoriaForms.ts";

export function isFormGroup(element: FormElement): element is FormGroup {
    return element.getType() === FormElementTypeEnum.FORM_GROUP;
}

export function isFormArray(element: FormElement): element is FormArray {
    return element.getType() === FormElementTypeEnum.FORM_ARRAY;
}

export function isFormControl(element: FormElement): element is FormControl {
    return element.getType() === FormElementTypeEnum.FORM_CONTROL;
}

