import type {
    FormUpdateOptions,
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

    clear(config?: FormUpdateOptions): void {
        this.setValue(null, config);
    }

    _setParent(parent: AbstractZoriaFormElement | null): void {
        this._parent = parent;
    }

    _handleChildChange(): void {
        this._updateValidity();
        this._emitLocalEvents();

        if (this._parent) {
            this._parent._handleChildChange();
        }
    }

    protected _updateValidityAndEmitLocalEvents(options: FormUpdateOptions = {emitEvent: true}) {
        if (options.emitEvent) {
            this._updateValidity();
            this._emitLocalEvents();

            if (this._parent) {
                this._parent._handleChildChange();
            }
        } else {
            this._updateValidity();
        }
    }

    abstract _updateValidity(): void;

    protected _emitLocalEvents(): void {
        this._validityChangesEventEmitter.emit(this._isValid);
        this._errorChangesEventEmitter.emit(this._error);
        this._valueChangesEventEmitter.emit(this.getValue());
    }

    abstract getValue(raw?: boolean): V;

    abstract setValue(newValue: V | null | undefined, eventConfig?: FormUpdateOptions): void;

    abstract reset(config?: FormUpdateOptions): void;

    abstract getElement(path?: string): AbstractZoriaFormElement;
}
