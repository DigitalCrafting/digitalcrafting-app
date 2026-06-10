import type {ValidatorsComposition} from "../../validators/ValidatorsTypes.ts";
import type {EventConfig, FormElementTypeEnum, FormValidationError} from "../types/ZoriaFormTypes.ts";
import type {FormElement} from "../types/ZoriaFormElement.ts";
import {EventEmitter, type Observer, type Subscription} from "@zoria-ui/events";

export abstract class AbstractZoriaFormElement implements FormElement {
    protected type: FormElementTypeEnum;
    protected _parent: AbstractZoriaFormElement | null = null;
    protected _error: FormValidationError;
    protected _isValid: boolean;
    protected _isVisible: boolean;
    protected _validityChangeEventPending: boolean;
    protected _validator?: ValidatorsComposition;
    protected _validityChangesEventEmitter: EventEmitter<boolean>;
    protected _valueChangesEventEmitter: EventEmitter<any>;
    protected _visibilityChangesEventEmitter: EventEmitter<boolean>;

    constructor(_type: FormElementTypeEnum, validator?: ValidatorsComposition) {
        this.type = _type;
        this._validator = validator
        this._error = null;
        this._isValid = true;
        this._isVisible = true;
        this._validityChangeEventPending = false;
        this._validityChangesEventEmitter = new EventEmitter();
        this._valueChangesEventEmitter = new EventEmitter();
        this._visibilityChangesEventEmitter = new EventEmitter();
    }

    getType(): FormElementTypeEnum {
        return this.type;
    }

    getIsValid(): boolean {
        return this._isValid;
    }

    setError(error: FormValidationError): void {
        this._error = error;
    }

    getError(): FormValidationError {
        return this._error;
    }

    getErrorsTree(): any {
        return this._error;
    }

    onValidityChanges(callback: Observer<any>): Subscription {
        return this._validityChangesEventEmitter.subscribe(callback);
    }

    onValueChanges(callback: Observer<any>): Subscription {
        return this._valueChangesEventEmitter.subscribe(callback);
    }

    getIsVisible(): boolean {
        return this._isVisible;
    }

    onVisibilityChanges(callback: Observer<boolean>): Subscription {
        return this._visibilityChangesEventEmitter.subscribe(callback);
    }


    setIsVisible(visible: boolean): void {
        this._isVisible = visible;
    }

    protected _updateValidityAndEmitEvent(): void {
        this._updateValidity()
        this._emitValidityChanges()
    }

    abstract _updateValidity(): void;

    protected _emitValidityChanges(overridePending: boolean = false) {
        if (this._validityChangeEventPending || overridePending) {
            this._validityChangesEventEmitter.emit(this._isValid)

            if (this._parent) {
                this._parent._emitValidityChanges(true);
            }

            this._validityChangeEventPending = false;
        }
    }

    protected _emitValueChanges(eventConfig: EventConfig = {
        emit: true,
        bubbleUp: true
    }) {
        if (eventConfig.emit) {
            this._valueChangesEventEmitter.emit(this.getValue())
            if (eventConfig.bubbleUp && this._parent) {
                this._parent._emitValueChanges(eventConfig)
            }
        }
    }

    _setParent(parent: AbstractZoriaFormElement | null): void {
        this._parent = parent;
    }

    abstract getValue(): any;

    abstract setValue(newValue: any, eventConfig?: EventConfig): void;
}
