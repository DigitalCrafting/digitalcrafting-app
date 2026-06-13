import {FormGroup} from "../internal/impl/ZoriaFormGroup.ts";
import type {AbstractZoriaFormElement} from "../internal/impl/AbstractZoriaFormElement.ts";
import {FormElementTypeEnum} from "../internal/types/ZoriaFormTypes.ts";
import type {FormArray} from "../internal/impl/ZoriaFormArray.ts";
import type {FormControl} from "../internal/impl/ZoriaFormControl.ts";

export function isFormGroup(element: AbstractZoriaFormElement): element is FormGroup {
    return element.getType() === FormElementTypeEnum.FORM_GROUP;
}

export function isFormArray(element: AbstractZoriaFormElement): element is FormArray {
    return element.getType() === FormElementTypeEnum.FORM_ARRAY;
}

export function isFormControl(element: AbstractZoriaFormElement): element is FormControl {
    return element.getType() === FormElementTypeEnum.FORM_CONTROL;
}

