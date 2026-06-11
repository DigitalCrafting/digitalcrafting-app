import {
    DEFAULT_VALIDATION_ERRORS,
} from "./ValidatorsTypes.ts";
import type {ValidationError, ValidatorFunc} from "../internal/types/ZoriaFormElement.ts";

const requiredValidator = (value: any, message = DEFAULT_VALIDATION_ERRORS.REQUIRED): ValidationError => {
    return !value ? message : null;
}

const minLengthValidator = (value: any, minLength: number, message = DEFAULT_VALIDATION_ERRORS.MIN_LENGTH): ValidationError => {
    if (!value) {
        /* For this validator, if it does not exist, it's valid */
        return null
    }

    if (typeof value === 'object') {
        if (Object.prototype.hasOwnProperty.call(value, 'length')) {
            return value.length < minLength ? message : null
        } else {
            return null;
        }
    } else {
        return String(value).length < minLength ? message : null;
    }
}

const maxLengthValidator = (value: any, maxLength: number, message = DEFAULT_VALIDATION_ERRORS.MAX_LENGTH): ValidationError => {
    if (!value) {
        /* For this validator, if it does not exist, it's valid */
        return null
    }

    if (typeof value === 'object') {
        if (Object.prototype.hasOwnProperty.call(value, 'length')) {
            return value.length > maxLength ? message : null
        } else {
            return null;
        }
    } else {
        return String(value).length > maxLength ? message : null;
    }
}

const minValueValidator = (value: number, min: number, message = DEFAULT_VALIDATION_ERRORS.MIN_VALUE): ValidationError => {
    if (!value) {
        return null
    }

    if (isNaN(value)) {
        throw new TypeError(`minValueValidator: Expected number, got: ${typeof value}`)
    }

    return value < min ? message : null
}

const maxValueValidator = (value: number, max: number, message = DEFAULT_VALIDATION_ERRORS.MAX_VALUE): ValidationError => {
    if (!value) {
        return null
    }

    if (isNaN(value)) {
        throw new TypeError(`maxValueValidator: Expected number, got: ${typeof value}`)
    }

    return value > max ? message : null
}

/* ----------------------------- */
/* Validators 'namespace' export */
/* ----------------------------- */
export class Validators {
    static required(message?: string): ValidatorFunc {
        return (value) => requiredValidator(value, message);
    }

    static minLength(minLength: number, message?: string): ValidatorFunc {
        return (value) => minLengthValidator(value, minLength, message);
    }

    static maxLength(maxLength: number, message?: string): ValidatorFunc {
        return (value) => maxLengthValidator(value, maxLength, message);
    }

    static min(min: number, message?: string): ValidatorFunc {
        return (value) => minValueValidator(value, min, message);
    }

    static max(max: number, message?: string): ValidatorFunc {
        return (value) => maxValueValidator(value, max, message);
    }
}