import {AbstractZoriaFormElement} from "./AbstractZoriaFormElement.ts";
import {PATH_DELIMITER} from "../helpers/ZoriaFormTraversal.ts";
import {type EventConfig, FormElementTypeEnum, type ValidatorFunc} from "../types/ZoriaFormElement.ts";
declare const process: { env: { NODE_ENV: string } };

export type FormArrayElementFactoryFunction = () => AbstractZoriaFormElement;

export class FormArray extends AbstractZoriaFormElement<typeof FormElementTypeEnum.FORM_ARRAY, any[]> {
    private readonly _formArray: AbstractZoriaFormElement[]
    private _formElementFactory!: FormArrayElementFactoryFunction;

    constructor(array?: AbstractZoriaFormElement[], validators?: ValidatorFunc[]) {
        super(FormElementTypeEnum.FORM_ARRAY, validators);
        this._formArray = array || [];
        this._setUpElements();
        this._updateValidity();
    }

    setElementsFactory(factory: FormArrayElementFactoryFunction): void {
        this._formElementFactory = factory;
    }

    getValue(raw?: boolean): any[] {
        const valueArray = [] as any[]

        for (const el of this._formArray) {
            if (el.isVisible() || raw) {
                valueArray.push(el.getValue())
            }
        }

        return valueArray;
    }

    setValue(newValue: any[], eventConfig: EventConfig = {
        emit: true,
        bubbleUp: true
    }): void {
        if (process.env.NODE_ENV !== 'production') {
            if (!newValue?.length) {
                throw new Error(`ZoriaFormArray::setValue::newValue empty`);
            }
        }

        /* The idea is that if the lengths are the same, we replace just the values,
        *  and we skip whole object creation and garbage collection of old ones,
        *  but if the lengths are different, we would have to calculate if we should add or remove objects,
        *  so at lest for now, we simply clear the whole array and create new one.
        *  */
        if (this._formArray.length === newValue.length) {
            for (let i = 0; i < newValue.length; i++) {
                // We don't want to 'bubbleUp' the event, since this control we emit change after the loop
                this._formArray[i].setValue(newValue[i], {emit: eventConfig.emit, bubbleUp: false});
            }
        } else {
            this.clear();
        }

        if (this._formArray.length === 0) {
            for (const value of newValue) {
                this.push(value)
            }
            return;
        }

        this._emitValueChanges(eventConfig)
    }

    getElement(path?: string): AbstractZoriaFormElement {
        if (process.env.NODE_ENV !== 'production') {
            if (!path?.length) {
                throw new Error(`ZoriaFormArray::getElement::'path' empty`);
            }
        }

        const firstDotIndex = path!.indexOf(PATH_DELIMITER);
        if (process.env.NODE_ENV !== 'production') {
            if (firstDotIndex === 0) {
                throw new Error(`ZoriaFormArray::getElement::'path' incorrect: ${path}`)
            }
        }

        if (firstDotIndex < 0) {
            const elementIndex = Number(path);
            if (process.env.NODE_ENV !== 'production') {
                if (Number.isNaN(elementIndex) || !this._formArray[elementIndex]){
                    throw new Error(`ZoriaFormArray::getElement::'path' incorrect: ${path}`)
                }
                return this._formArray[elementIndex];
            }
        }

        const firstSection = Number(path!.substring(0, firstDotIndex));
        if (process.env.NODE_ENV !== 'production') {
            if (Number.isNaN(firstSection) || !this._formArray[firstSection]) {
                throw new Error(`ZoriaFormArray::getElement::'path' incorrect: ${path}`)
            }
        }

        const element = this._formArray[firstSection];
        /* TODO::[performance]::replace slice with keeping track of index and _internalGetElement(path, index)  */
        const restOfPath = path!.slice(firstDotIndex + 1);
        return element.getElement(restOfPath);
    }

    remove(index: number) {
        if (process.env.NODE_ENV !== 'production') {
            if (index < 0 || index >= this._formArray.length) {
                console.log(`ZoriaFormArray:remove::Index out of bounds: ${index}`)
                return
            }
        }

        if (this._formArray[index]) {
            this._formArray[index]._setParent(null)
            this._formArray.splice(index, 1)
            this._updateValidityAndEmitEvent()
            this._emitValueChanges()
        }
    }

    removeLast() {
        if (!this._formArray.length) {
            return;
        }

        const lastIdx = this._formArray.length - 1;
        this.remove(lastIdx);
    }


    clear() {
        for (let i = 0; i < this._formArray.length - 1; i++) {
            this.removeLast();
        }
    }

    push(value?: any) {
        if (process.env.NODE_ENV !== 'production') {
            if (!this._formElementFactory) {
                throw new Error(`ZoriaFormArray::push::elementFactory is not set`);
            }
        }

        const newElement = this._formElementFactory();
        newElement.setValue(value);
        this.pushElement(newElement);
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