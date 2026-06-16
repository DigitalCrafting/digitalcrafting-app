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

export type EventConfig = {
    emit?: boolean,
    bubbleUp?: boolean
}

export const FormElementTypeEnum = {
    FORM_GROUP: 'FORM_GROUP',
    FORM_ARRAY: 'FORM_ARRAY',
    FORM_CONTROL: 'FORM_CONTROL'
}
export type FormElementTypeEnumType = (typeof FormElementTypeEnum)[keyof typeof FormElementTypeEnum] | unknown;

export interface FormElement<T extends FormElementTypeEnumType, V = unknown> {
    /* === Type === */
    getType(): T;
    getElement(path?: string): FormElement<FormElementTypeEnumType>;

    /* === Errors === */
    setError(error: ValidationError): void;
    getError(): ValidationError;
    getErrorsTree(): ValidationError | Record<string, ValidationError>;
    onErrorChanges(callback: Observer<ValidationError>): Subscription;

    /* === Validity === */
    /* validation is implicitly triggered on setValue */
    getIsValid(): boolean;
    onValidityChanges(callback: Observer<boolean>): Subscription;

    /* === ZoriaValidators === */
    addValidator(validator: ValidatorFunc): void;
    removeValidator(validator: ValidatorFunc): void;
    setValidators(validators: ValidatorFunc[]): void;
    clearValidator(): void;

    /* === Value === */
    getValue(raw?: boolean): V;
    setValue(newValue: V, config?: EventConfig): void;
    onValueChanges(callback: Observer<V>): Subscription;

    /* === Auxiliaries === */
    setIsVisible(visible: boolean): void;
    isVisible(): boolean;
    onVisibilityChanges(callback: Observer<boolean>): Subscription;

    disable(): void;
    enable(): void;
    isEnabled(): boolean;
    isDisabled(): boolean;
    onDisabledChanges(callback: Observer<boolean>): Subscription;

    getIsRequired(): boolean;
}
