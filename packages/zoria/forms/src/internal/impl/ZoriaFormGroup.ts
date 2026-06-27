import {AbstractZoriaFormElement} from "./AbstractZoriaFormElement.ts";
import {FormElementTypeEnum, type FormUpdateOptions, type ValidatorFunc} from "../types/ZoriaFormElement.ts";
import {PATH_DELIMITER} from "../helpers/ZoriaFormTraversal.ts";

declare const process: { env: { NODE_ENV: string } };

export class ZoriaFormGroup extends AbstractZoriaFormElement<typeof FormElementTypeEnum.FORM_GROUP, Record<string, any>> {
    private readonly _formElements: { [key: string]: AbstractZoriaFormElement }

    constructor(formElements?: {
        [p: string]: AbstractZoriaFormElement
    }, validators?: ValidatorFunc[]) {
        super(FormElementTypeEnum.FORM_GROUP, validators);
        this._formElements = formElements || {};
        this._setUpElements();
        this._updateValidity();
    }

    getIsValid(): boolean {
        let valid = true

        this._forEachChild((control) => {
            valid = valid && control.getIsValid()
        })

        return valid;
    }

    getValue(raw?: boolean): Record<string, any> {
        const valueObject = {};

        this._forEachChild((control, key) => {
            // @ts-ignore
            valueObject[key] = control.getValue()
        }, raw)

        return valueObject;
    }

    setValue(newValue: any, options: FormUpdateOptions = {
        emitEvent: true,
        onlySelf: false
    }): void {
        for (const prop in newValue) {
            if (process.env.NODE_ENV !== 'production') {
                if (!Object.hasOwn(this._formElements, prop)) {
                    throw new Error("ZoriaFormGroup::setValue::Value does not match FormGroup configuration")
                }
            }
            this._formElements[prop].setValue(newValue[prop], {emitEvent: options.emitEvent, onlySelf: true});
        }

        this._updateValidityAndEmitLocalEvents(options);
    }

    reset(config: FormUpdateOptions | undefined): void {
        this._forEachChild((element) => {
            element.reset(config);
        })
    }

    clear(config?: FormUpdateOptions) {
        this._forEachChild((element) => {
            element.clear(config);
        })
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



    // Internal
    protected _forEachChild(cb: (v: any, k: string) => void, raw?: boolean): void {
        Object.keys(this._formElements).forEach((key) => {
            // The list of controls can change (for ex. controls might be removed) while the loop
            // is running (as a result of invoking Forms API in `valueChanges` subscription), so we
            // have to null check before invoking the callback.
            const control = this.getElement(key);
            if (control && (control.isVisible() || raw)) {
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
