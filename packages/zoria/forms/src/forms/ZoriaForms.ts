import {type EventConfig, FormElementTypeEnum} from "../internal/types/ZoriaFormTypes.ts";
import {AbstractZoriaFormElement} from "../internal/impl/AbstractZoriaFormElement.ts";
import type {ValidatorFunc} from "../internal/types/ZoriaFormElement.ts";
import {PATH_DELIMITER} from "../internal/helpers/ZoriaFormTraversal.ts";

declare const process: { env: { NODE_ENV: string } };


export class FormGroup extends AbstractZoriaFormElement<typeof FormElementTypeEnum.FORM_GROUP, Record<string, any>> {
    private _formElements: { [key: string]: AbstractZoriaFormElement }

    constructor(formElements?: {
        [p: string]: AbstractZoriaFormElement
    }, validators?: ValidatorFunc[]) {
        super(FormElementTypeEnum.FORM_GROUP, validators);
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

    getValue(): Record<string, any> {
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

    getElement(path?: string): AbstractZoriaFormElement<any, any> {
        if (process.env.NODE_ENV !== 'production') {
            if (!path?.length) {
                throw new Error(`ZoriaFormGroup::getElement::'path' empty`);
            }
        }

        const firstDotIndex = path!.indexOf(PATH_DELIMITER);
        if (process.env.NODE_ENV !== 'production') {
            if (firstDotIndex === 0) {
                throw new Error(`ZoriaFormGroup::getElement::'path' incorrect: ${path}`)
            }
        }

        if (firstDotIndex < 0) {
            const element = this._formElements[path!];
            if (process.env.NODE_ENV !== 'production') {
                if (!element) {
                    throw new Error(`ZoriaFormGroup::getElement::'path' incorrect: ${path}`)
                }
            }
            return element;
        }

        const firstSection = path!.substring(0, firstDotIndex);
        const element = this._formElements[firstSection];
        if (process.env.NODE_ENV !== 'production') {
            if (!element) {
                throw new Error(`ZoriaFormGroup::getElement::'path' incorrect: ${path}`)
            }
        }

        /* TODO::[performance]::replace slice with keeping track of index and _internalGetElement(path, index)  */
        const restOfPath = path!.slice(firstDotIndex + 1);
        return element.getElement(restOfPath);
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
        if (this._validators) {
            const newError = this._validators.validate(this.getValue())
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
