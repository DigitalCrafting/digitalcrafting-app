import type {
    EventConfig,
    FormElement,
    FormElementTypeEnumType,
    ValidationError,
    ValidatorFunc,
    ValidatorsComposition
} from "../types/ZoriaFormElement.ts";
import {EventEmitter, type Observer, type Subscription} from "@zoria-ui/events";
import {ZoriaFormValidatorsComposition} from "../validators/ZoriaFormValidatorsComposition.ts";

export abstract class AbstractZoriaFormElement<T extends FormElementTypeEnumType = unknown, V = unknown> implements FormElement<T, V> {
    protected _type: T;
    protected _parent: AbstractZoriaFormElement | null = null;
    protected _error: ValidationError;
    protected _isValid: boolean;
    protected _isVisible: boolean;
    protected _isDisabled: boolean;
    protected _validityChangeEventPending: boolean;
    protected _validators: ValidatorsComposition;
    protected _errorChangesEventEmitter: EventEmitter<ValidationError>;
    protected _validityChangesEventEmitter: EventEmitter<boolean>;
    protected _valueChangesEventEmitter: EventEmitter<any>;
    protected _visibilityChangesEventEmitter: EventEmitter<boolean>;
    protected _disabledChangesEventEmitter: EventEmitter<boolean>;

    protected constructor(_type: T, validators?: ValidatorFunc[]) {
        this._type = _type;
        this._validators = new ZoriaFormValidatorsComposition(validators);
        this._error = null;
        this._isValid = true;
        this._isVisible = true;
        this._isDisabled = false;
        this._validityChangeEventPending = false;
        this._errorChangesEventEmitter = new EventEmitter();
        this._validityChangesEventEmitter = new EventEmitter();
        this._valueChangesEventEmitter = new EventEmitter();
        this._visibilityChangesEventEmitter = new EventEmitter();
        this._disabledChangesEventEmitter = new EventEmitter();
    }

    getType(): T {
        return this._type;
    }

    getIsValid(): boolean {
        return this._isValid;
    }

    setError(error: ValidationError): void {
        this._error = error;
        this._isValid = !this._error;
        this._errorChangesEventEmitter.emit(this._error);
        this._validityChangesEventEmitter.emit(this._isValid);
    }

    getError(): ValidationError {
        return this._error;
    }

    getErrorsTree(): any {
        return this._error;
    }

    onErrorChanges(callback: Observer<ValidationError>): Subscription {
        return this._errorChangesEventEmitter.subscribe(callback);
    }

    onValidityChanges(callback: Observer<boolean>): Subscription {
        return this._validityChangesEventEmitter.subscribe(callback);
    }

    onValueChanges(callback: Observer<V>): Subscription {
        return this._valueChangesEventEmitter.subscribe(callback);
    }

    isVisible(): boolean {
        return this._isVisible;
    }

    onVisibilityChanges(callback: Observer<boolean>): Subscription {
        return this._visibilityChangesEventEmitter.subscribe(callback);
    }

    setIsVisible(visible: boolean): void {
        this._isVisible = visible;
    }

    addValidator(validator: ValidatorFunc): void {
        this._validators.add(validator);
    }

    clearValidator(): void {
        this._validators.clear();
    }

    getIsRequired(): boolean {
        return false;
    }

    removeValidator(validator: ValidatorFunc): void {
        this._validators.remove(validator);
    }

    setValidators(validators: ValidatorFunc[]): void {
        this._validators.set(validators);
    }

    disable(): void {
        this._isDisabled = true;
    }

    enable(): void {
        this._isDisabled = false;
    }

    isDisabled(): boolean {
        return this._isDisabled;
    }

    isEnabled(): boolean {
        return !this._isDisabled;
    }

    onDisabledChanges(callback: Observer<boolean>): Subscription {
        return this._disabledChangesEventEmitter.subscribe(callback);
    }

    _setParent(parent: AbstractZoriaFormElement | null): void {
        this._parent = parent;
    }

    protected _updateValidityAndEmitEvent(): void {
        this._updateValidity()
        this._emitValidityChanges()
    }

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

    abstract _updateValidity(): void;

    abstract getValue(raw?: boolean): V;

    abstract setValue(newValue: V, eventConfig?: EventConfig): void;

    abstract getElement(path?: string): AbstractZoriaFormElement;
}
