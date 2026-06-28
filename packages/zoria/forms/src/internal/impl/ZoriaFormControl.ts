import {AbstractZoriaFormElement} from "./AbstractZoriaFormElement.ts";
import {type FormUpdateOptions, FormElementTypeEnum, type ValidatorFunc} from "../types/ZoriaFormElement.ts";

export class ZoriaFormControl extends AbstractZoriaFormElement<typeof FormElementTypeEnum.FORM_CONTROL> {
    private _value: any | null;

    constructor(value: any | null = null, validators?: ValidatorFunc[]) {
        super(FormElementTypeEnum.FORM_CONTROL, validators);
        this._value = value;
        this._defaultValue = value;
        this._updateValidity()
    }

    getValue(): any | null {
        return this._value;
    }

    setValue(newValue: any, options: FormUpdateOptions = {
        emitEvent: true,
        onlySelf: false
    }): void {
        if (this._value === newValue) {
            return;
        }
        this._value = newValue;

        this._updateValidityAndEmitLocalEvents(options);
    }

    setDefaultValue(newValue: any = null, updateValue = true, options: FormUpdateOptions = {
        emitEvent: true,
        onlySelf: false
    }): void {
        this._defaultValue = newValue;
        if (updateValue) {
            this.setValue(this._defaultValue, options);
        }
    }

    reset(config: FormUpdateOptions | undefined): void {
        this.setValue(this._defaultValue, config);
    }

    getElement(path?: string): AbstractZoriaFormElement<typeof FormElementTypeEnum.FORM_CONTROL> {
        if (path?.length) {
            throw new Error(`ZoriaFormControl::getElement::'path' ${path} does not match actual form structure`)
        }
        return this;
    }

    _handleChildChange(): void {
        throw new Error(`ZoriaFormControl::_handleChildChange::should never be called`);
    }

    _updateValidity(): void {
        let newValid = true;
        if (this._validators) {
            const newError = this._validators.validate(this._value, this);
            if (this._error !== newError) {
                this._error = newError;
                newValid = newError === null;
            }
        }
        this._isValid = newValid;
    }

    protected _forEachChild(): void {
        throw new Error(`ZoriaFormControl::_forEachChild::should never be called`);
    }
}