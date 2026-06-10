import type {EventConfig, FormElementTypeEnum, FormValidationError} from "./ZoriaFormTypes.ts";
import type {Observer, Subscription} from "@zoria-ui/events";

export interface FormElement {
    /* === Type === */
    getType(): FormElementTypeEnum;

    /* === Validity === */
    getIsValid(): boolean;

    setError(error: FormValidationError): void;

    getError(): FormValidationError;

    // TODO Do I even need this?
    // When did I need the whole tree of errors?
    getErrorsTree(): FormValidationError | Record<string, FormValidationError>;

    onValidityChanges(callback: Observer<any>): Subscription;

    /* === Value === */
    getValue(): any;

    setValue(newValue: any, config?: EventConfig): void;

    onValueChanges(callback: Observer<any>): Subscription;

    /* === Auxiliaries === */
    setIsVisible(visible: boolean): void;

    getIsVisible(): boolean;

    onVisibilityChanges(callback: Observer<boolean>): Subscription;
}
