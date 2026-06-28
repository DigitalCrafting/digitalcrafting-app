import {AbstractZoriaFormElement} from "./AbstractZoriaFormElement.ts";
import {PATH_DELIMITER} from "../helpers/ZoriaFormTraversal.ts";
import {FormElementTypeEnum, type FormUpdateOptions, type ValidatorFunc} from "../types/ZoriaFormElement.ts";
import {ZoriaValidators} from "../validators/ZoriaValidators.ts";
import {DEFAULT_VALIDATION_ERRORS} from "../validators/ZoriaValidatorsTypes.ts";
import {EventEmitter, type Subscription} from "@zoria-ui/events";

declare const process: { env: { NODE_ENV: string } };

export type FormArrayElementFactoryFunction = () => AbstractZoriaFormElement;

export interface FormArrayValidationMetadata<T = any> {
    value: T;
    message: string;
    validator: ValidatorFunc
}

export interface FormArrayMetadata {
    minLength?: FormArrayValidationMetadata<number>;
    maxLength?: FormArrayValidationMetadata<number>;
    required?: FormArrayValidationMetadata<boolean>;
}

export class ZoriaFormArray extends AbstractZoriaFormElement<typeof FormElementTypeEnum.FORM_ARRAY, any[]> {
    private _formArray: AbstractZoriaFormElement[]
    private _formElementFactory!: FormArrayElementFactoryFunction;
    private _metadata: FormArrayMetadata = {};
    private _metadataChangesEventEmitter: EventEmitter<any>;

    constructor(array?: AbstractZoriaFormElement[], validators?: ValidatorFunc[]) {
        super(FormElementTypeEnum.FORM_ARRAY, validators);
        this._formArray = array || [];
        this._metadataChangesEventEmitter = new EventEmitter();
        this._setUpElements();
        this._updateValidity();
    }

    setElementsFactory(factory: FormArrayElementFactoryFunction): void {
        this._formElementFactory = factory;
    }

    setMetadata(metadata: FormArrayMetadata): void {
        this._metadata = metadata;
        let minLengthMetadata = this._metadata.minLength;
        if (minLengthMetadata) {
            this._validators.add(minLengthMetadata.validator);
        }

        let maxLengthMetadata = this._metadata.maxLength;
        if (maxLengthMetadata && maxLengthMetadata?.value) {
            this._validators.add(maxLengthMetadata.validator);
        }

        let requiredMetadata = this._metadata.required;
        if (requiredMetadata && requiredMetadata.value) {
            this._validators.add(requiredMetadata.validator);
        }

        this._metadataChangesEventEmitter.emit(true);
        this._updateValidity();
    }

    canAdd(): boolean {
        const maxLength = this._metadata.maxLength?.value;
        if (maxLength === null || maxLength === undefined) {
            return true;
        }

        return maxLength > this._formArray.length;
    }

    canRemove(): boolean {
        const minLength = this._metadata.minLength?.value;
        const required = this._metadata.required?.value;
        if (minLength === null || minLength === undefined) {
            return true;
        }

        if (required && this._formArray.length <= 1) {
            return false;
        }

        return minLength < this._formArray.length;
    }

    /**
     * @param value - number specifying min length
     * @param message - optional error message, default provided
     *
     * @description
     * Adds minLength metadata that determines the outcome of {@link canRemove} and validity.
     * If {@link value} is less than 1, it will remove the requirements completely.
     * */
    setMinLength(value: number, message: string = DEFAULT_VALIDATION_ERRORS.MIN_LENGTH) {
        let changesPresent = false;
        if (this._metadata.minLength) {
            this._validators.remove(this._metadata.minLength.validator);
            this._metadata.minLength = undefined;
            changesPresent = true;
        }

        if (value >= 1) {
            this._metadata.minLength = {value, message, validator: ZoriaValidators.minLength(value, message)};
            this._validators.add(this._metadata.minLength.validator);
            changesPresent = true;
        }

        if (changesPresent) {
            this._metadataChangesEventEmitter.emit(true);
            this._updateValidity();
        }
    }

    /**
     * @param value - number specifying max length
     * @param message - optional error message, default provided
     *
     * @description
     * Adds maxLength metadata that determines the outcome of {@link canAdd} and validity.
     * If {@link value} is less than 1, it will remove the requirements completely.
     * */
    setMaxLength(value: number, message: string = DEFAULT_VALIDATION_ERRORS.MAX_LENGTH) {
        let changesPresent = false;
        if (this._metadata.maxLength) {
            this._validators.remove(this._metadata.maxLength.validator);
            this._metadata.maxLength = undefined;
            changesPresent = true;
        }

        if (value >= 1) {
            this._metadata.maxLength = {value, message, validator: ZoriaValidators.maxLength(value, message)};
            this._validators.add(this._metadata.maxLength.validator);
            changesPresent = true;
        }

        if (changesPresent) {
            this._metadataChangesEventEmitter.emit(true);
            this._updateValidity();
        }
    }

    /**
     * @param value - optional boolean value,
     * @param message - optional error message, default provided,
     *
     * @description
     * Adds required metadata that determines the outcome of {@link canRemove} and validity.
     * If {@link value} is false, it will remove the requirements completely.
     * */
    setRequired(value: boolean = true, message: string = DEFAULT_VALIDATION_ERRORS.REQUIRED) {
        let changesPresent = false;
        if (this._metadata.minLength) {
            this._validators.remove(this._metadata.minLength.validator);
            this._metadata.required = undefined;
            changesPresent = true;
        }

        if (value) {
            this._metadata.required = {value, message, validator: ZoriaValidators.arrayRequired(message)};
            this._validators.add(this._metadata.required.validator);
            changesPresent = true;
        }

        if (changesPresent) {
            this._metadataChangesEventEmitter.emit(true);
            this._updateValidity();
        }
    }

    onMetadataChanges(callback: () => void): Subscription {
        return this._metadataChangesEventEmitter.subscribe(callback);
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

    setValue(newValue: any[], options: FormUpdateOptions = {
        emitEvent: true,
        onlySelf: false
    }): void {
        if (!newValue) {
            this.clear(options);
            this._updateValidityAndEmitLocalEvents(options);
            return;
        }

        /* The idea is that if the lengths are the same, we replace just the values,
        *  and we skip whole object creation and garbage collection of old ones,
        *  but if the lengths are different, we would have to calculate if we should add or remove objects,
        *  so at lest for now, we simply clear the whole array and create new one.
        *  */
        if (this._formArray.length === newValue?.length) {
            for (let i = 0; i < newValue.length; i++) {
                // We don't want to 'bubbleUp' the event, since this control we emit change after the loop
                this._formArray[i].setValue(newValue[i], {emitEvent: options.emitEvent, onlySelf: true});
            }
        } else {
            this.clear(options);
        }

        if (this._formArray.length === 0) {
            for (const value of newValue) {
                this.push(value)
            }
            return;
        }

        this._updateValidityAndEmitLocalEvents(options);
    }

    setDefaultValue(newValue: any[] = [], updateValue = true, options: FormUpdateOptions = {
        emitEvent: true,
        onlySelf: false
    }): void {
        this._defaultValue = newValue;
        if (updateValue) {
            this.setValue(this._defaultValue, options);
        }
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
                if (Number.isNaN(elementIndex) || !this._formArray[elementIndex]) {
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

    remove(index: number, options: FormUpdateOptions = {emitEvent: true}) {
        if (process.env.NODE_ENV !== 'production') {
            if (index < 0 || index >= this._formArray.length) {
                console.log(`ZoriaFormArray:remove::Index out of bounds: ${index}`)
                return
            }
        }

        if (this._formArray[index]) {
            this._formArray[index]._setParent(null)
            this._formArray.splice(index, 1)
        }
        this._updateValidityAndEmitLocalEvents(options);
    }

    removeLast(options?: FormUpdateOptions) {
        if (!this._formArray.length) {
            return;
        }

        const lastIdx = this._formArray.length - 1;
        this.remove(lastIdx, options);
    }

    reset(options?: FormUpdateOptions) {
        this._formArray.forEach((element) => {
            element.reset(options);
        })
    }

    clear(options?: FormUpdateOptions) {
        this._formArray.forEach((element) => {
            element.clear(options);
        })
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

    pushElement(element: (AbstractZoriaFormElement), options?: FormUpdateOptions) {
        this._formArray.push(element);
        element._setParent(this);
        this._updateValidityAndEmitLocalEvents(options);
    }

    get length(): number {
        return this._formArray.length
    }

    getIsValid(): boolean {
        return this._isValid;
    }

    getErrorsTree(): any {
        return this._formArray.map(control => {
            return control.getErrorsTree();
        })
    }

    protected _forEachChild(cb: (control: (AbstractZoriaFormElement), index: number) => void): void {
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