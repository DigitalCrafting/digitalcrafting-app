import type {ValidatorsComposition} from "../validators/ValidatorsTypes.ts";
import {type EventConfig, FormElementTypeEnum} from "../internal/types/ZoriaFormTypes.ts";
import type {FormElement} from "../internal/types/ZoriaFormElement.ts";
import {AbstractZoriaFormElement} from "../internal/impl/AbstractZoriaFormElement.ts";


export class FormGroup extends AbstractZoriaFormElement {
    private _formElements: { [key: string]: AbstractZoriaFormElement }

    constructor(formElements?: {
        [p: string]: AbstractZoriaFormElement
    }, validator?: ValidatorsComposition) {
        super(FormElementTypeEnum.FORM_GROUP, validator);
        this._formElements = formElements || {};
        this._setUpElements();
    }

    getIsValid(): boolean {
        let valid = true

        this._forEachChild((control) => {
            valid = valid && control.getIsValid()
        })

        return valid;
    }

    getValue(): any {
        const valueObject = {};

        this._forEachChild((control, key) => {
            const controlValue = control.getValue()
            // @ts-ignore
            valueObject[key] = controlValue

        })

        return valueObject;
    }

    setValue(newValue: any, eventConfig: EventConfig = {
        emit: true,
        bubbleUp: true
    }): void {
        for (const prop in newValue) {
            if (!Object.prototype.hasOwnProperty.call(this._formElements, prop)) {
                throw new Error("Value does not match FormGroup configuration")
            }
            this._formElements[prop].setValue(newValue[prop], {emit: true, bubbleUp: false});
        }
        this._updateValidity()
        this._emitValueChanges(eventConfig)
        this._emitValidityChanges()
    }

    getElement(key: string): AbstractZoriaFormElement {
        return this._formElements[key]
    }

    /**
     * Returns nested child component using path.
     *
     * Path parts should be separated using coma,
     * if path goes through FormArray, use index to get concrete element.
     * */
    getElementFromPath<T = AbstractZoriaFormElement>(path: string): T | FormElement {
        const pathParts = path.split('.')

        if (pathParts.length === 1) {
            return this._formElements[pathParts[0]] as T
        }

        if (pathParts.length > 1) {
            let element: AbstractZoriaFormElement | undefined = undefined;
            for (let i = 0; i < pathParts.length; i++) {
                const pathPart = pathParts[i];

                // @ts-ignore
                if (!element) {
                    element = this._formElements[pathPart]
                } else {
                    if (element instanceof FormGroup) {
                        element = element.getElement(pathPart)
                    } else if (element instanceof FormArray) {
                        element = element.getElement(+pathPart)
                    } else {
                        /* We should only get FormInputControl as the last element */
                        throw new Error(`Path ${path} does not match actual form structure`)
                    }
                }
            }

            return element as T
        }

        throw new Error(`Element on path ${path} does not exist.`)
    }

    getErrorsTree(): Record<string, any> {
        const errorTree: Record<string, any> = {}

        this._forEachChild((control, key) => {
            errorTree[key] = control.getErrorsTree()
        })

        return errorTree
    }

    _updateValidity(): void {
        let newValid = true;
        if (this._validator) {
            const newError = this._validator.validate(this.getValue())
            if (newError !== this._error) {
                this._error = newError;
                newValid = newError === null;
            }
        }

        let childrenValid = true
        this._forEachChild((control) => {
            childrenValid = childrenValid && control.getIsValid()
        })

        if (this._isValid !== (childrenValid && newValid)) {
            this._isValid = childrenValid && newValid;
            this._validityChangeEventPending = true;
        }

        if (this._parent && this._validityChangeEventPending) {
            this._parent._updateValidity();
        }
    }

    // Internal
    private _forEachChild(cb: (v: any, k: string) => void): void {
        Object.keys(this._formElements).forEach((key) => {
            // The list of controls can change (for ex. controls might be removed) while the loop
            // is running (as a result of invoking Forms API in `valueChanges` subscription), so we
            // have to null check before invoking the callback.
            const control = (this._formElements as any)[key];
            if (control) {
                cb(control, key);
            }
        });
    }

    private _setUpElements() {
        this._forEachChild((control) => {
            control._setParent(this)
        })
    }
}

export class FormControl extends AbstractZoriaFormElement {
    private _value: any | null;

    constructor(value: any | null = null, validator?: ValidatorsComposition) {
        super(FormElementTypeEnum.FORM_CONTROL, validator);
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

    _updateValidity(): void {
        let newValid = true;
        if (this._validator) {
            const newError = this._validator.validate(this._value)
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

export class FormArray extends AbstractZoriaFormElement {
    private _formArray: AbstractZoriaFormElement[]

    constructor(array?: AbstractZoriaFormElement[], validator?: ValidatorsComposition) {
        super(FormElementTypeEnum.FORM_ARRAY, validator);
        this._formArray = array || [];
        this._setUpElements();
        this._updateValidity();
    }

    getValue(): any[] {
        const valueArray = [] as any[]

        for (const el of this._formArray) {
            valueArray.push(el.getValue())
        }

        return valueArray;
    }

    setValue(newValue: any[], eventConfig: EventConfig = {
        emit: true,
        bubbleUp: true
    }): void {
        if (newValue.length != this._formArray.length) {
            throw new Error("Arrays lengths don't match")
        }

        for (let i = 0; i < newValue.length; i++) {
            // We don't want to 'bubbleUp' the event, since this control we emit change after the loop
            this._formArray[i].setValue(newValue[i], {emit: eventConfig.emit, bubbleUp: false});
        }

        this._emitValueChanges(eventConfig)
    }

    getElement<T = AbstractZoriaFormElement>(index: number): T {
        return this._formArray[index] as T
    }

    removeElement(index: number) {
        if (index < 0 || index >= this._formArray.length) {
            console.log(`Index out of bounds: ${index}`)
            return
        }

        if (this._formArray[index]) {
            this._formArray[index]._setParent(null)
            this._formArray.splice(index, 1)
            this._updateValidityAndEmitEvent()
            this._emitValueChanges()
        }
    }

    pushElement(element: (AbstractZoriaFormElement)) {
        this._formArray.push(element);
        element._setParent(this);
        this._updateValidityAndEmitEvent()
        this._emitValueChanges();
    }

    get length(): number {
        return this._formArray.length
    }

    getIsValid(): boolean {
        return this._isValid;
    }

    getErrorsTree(): any[] {
        return this._formArray.map(control => {
            return control.getErrorsTree();
        })
    }

    _updateValidity(): void {
        let newValid = true;

        if (this._validator) {
            const newError = this._validator.validate(this.getValue())
            if (newError !== this._error) {
                this._error = newError;
                newValid = newError === null;
            }
        }

        let childrenValid = true
        this._forEachChild((control) => {
            childrenValid = childrenValid && control.getIsValid()
        })

        if (this._isValid !== (childrenValid && newValid)) {
            this._isValid = childrenValid && newValid;
            this._validityChangeEventPending = true;
        }

        if (this._parent && this._validityChangeEventPending) {
            this._parent._updateValidity();
        }
    }

    private _forEachChild(cb: (control: (AbstractZoriaFormElement), index: number) => void): void {
        this._formArray.forEach((control, index) => {
            cb(control, index);
        });
    }

    private _setUpElements() {
        this._forEachChild((control) => {
            control._setParent(this);
        })
    }
}