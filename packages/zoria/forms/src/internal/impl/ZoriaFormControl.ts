import {AbstractZoriaFormElement} from "./AbstractZoriaFormElement.ts";
import {type EventConfig, FormElementTypeEnum} from "../types/ZoriaFormTypes.ts";
import type {ValidatorFunc} from "../types/ZoriaFormElement.ts";

export class FormControl extends AbstractZoriaFormElement<typeof FormElementTypeEnum.FORM_CONTROL> {
    private _value: any | null;

    constructor(value: any | null = null, validators?: ValidatorFunc[]) {
        super(FormElementTypeEnum.FORM_CONTROL, validators);
        this._value = value
        this._updateValidity()
    }

    getValue(): any | null {
        return this._value;
    }

    setValue(newValue: any, eventConfig: EventConfig = {
        emit: true,
        bubbleUp: true
    }): void {
        this._value = newValue;
        this._emitValueChanges(eventConfig)
        this._updateValidityAndEmitEvent()
    }

    getElement(path?: string): AbstractZoriaFormElement<typeof FormElementTypeEnum.FORM_CONTROL> {
        if (path?.length) {
            throw new Error(`ZoriaFormControl::getElement::'path' ${path} does not match actual form structure`)
        }
        return this;
    }

    _updateValidity(): void {
        let newValid = true;
        if (this._validators) {
            const newError = this._validators.validate(this._value)
            if (this._error !== newError) {
                this._error = newError;
                newValid = newError === null;
            }
        }

        if (this._isValid !== newValid) {
            this._isValid = newValid;
            this._validityChangeEventPending = true;
        }

        if (this._parent && this._validityChangeEventPending) {
            this._parent._updateValidity();
        }
    }
}