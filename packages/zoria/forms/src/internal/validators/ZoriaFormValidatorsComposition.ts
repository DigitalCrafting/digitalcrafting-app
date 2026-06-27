import type {FormElement, ValidationError, ValidatorFunc, ValidatorsComposition} from "../types/ZoriaFormElement.ts";

export class ZoriaFormValidatorsComposition<T = any> implements ValidatorsComposition<T> {
    private _validators: ValidatorFunc[]

    constructor(validators: ValidatorFunc[] = []) {
        this._validators = validators;
    }

    validate(value: T, control: FormElement<any, any>): ValidationError {
        for (const validator of this._validators) {
            const validationError = validator(value, control);
            if (validationError) {
                return validationError;
            }
        }

        return null;
    }

    add(validator: ValidatorFunc): void {
        this._validators.push(validator);
    }

    clear(): void {
        this._validators = [];
    }

    remove(validator: ValidatorFunc): void {
        const idx = this._validators.indexOf(validator);
        if (idx < 0) {
            return;
        }

        this._validators.splice(idx, 1);
    }

    set(validators: ValidatorFunc[]): void {
        this._validators = validators;
    }
}