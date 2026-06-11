import type {EventConfig, FormElementTypeEnumType} from "./ZoriaFormTypes.ts";
import type {Observer, Subscription} from "@zoria-ui/events";

export type ValidationError = string | null

export type ValidatorFunc = (value: any, message?: string, control?: FormElement<any, any>) => ValidationError

export interface ValidatorsComposition<T = any> {
    validate(value: T): ValidationError;

    add(validator: ValidatorFunc): void;

    remove(validator: ValidatorFunc): void;

    set(validators: ValidatorFunc[]): void;

    clear(): void;
}

export interface FormElement<T extends FormElementTypeEnumType, V = unknown> {
    /* === Type === */
    getType(): T;

    /* === Errors === */
    setError(error: ValidationError): void;

    getError(): ValidationError;

    getErrorsTree(): ValidationError | Record<string, ValidationError>;

    /* === Validity === */
    getIsValid(): boolean;

    onValidityChanges(callback: Observer<any>): Subscription;

    /* === Validators === */
    addValidator(validator: ValidatorFunc): void;

    removeValidator(validator: ValidatorFunc): void;

    setValidators(validators: ValidatorFunc[]): void;

    clearValidator(): void;

    /* === Value === */
    getValue(): V;

    setValue(newValue: V, config?: EventConfig): void;

    onValueChanges(callback: Observer<V>): Subscription;

    /* === Auxiliaries === */
    setIsVisible(visible: boolean): void;

    getIsVisible(): boolean;

    onVisibilityChanges(callback: Observer<boolean>): Subscription;

    getIsRequired(): boolean;
}
