import {ZoriaFormGroup} from "../internal/impl/ZoriaFormGroup.ts";
import type {AbstractZoriaFormElement} from "../internal/impl/AbstractZoriaFormElement.ts";
import type {ZoriaFormArray} from "../internal/impl/ZoriaFormArray.ts";
import type {ZoriaFormControl} from "../internal/impl/ZoriaFormControl.ts";
import {FormElementTypeEnum} from "../internal/types/ZoriaFormElement.ts";

export function isFormGroup(element: AbstractZoriaFormElement): element is ZoriaFormGroup {
    return element.getType() === FormElementTypeEnum.FORM_GROUP;
}

export function isFormArray(element: AbstractZoriaFormElement): element is ZoriaFormArray {
    return element.getType() === FormElementTypeEnum.FORM_ARRAY;
}

export function isFormControl(element: AbstractZoriaFormElement): element is ZoriaFormControl {
    return element.getType() === FormElementTypeEnum.FORM_CONTROL;
}

