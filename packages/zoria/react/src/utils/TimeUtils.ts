// Compiled once at the module level
const TIME_REGEX = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;

export namespace TimeUtils {
    export function validateTime(str: string): boolean {
        return TIME_REGEX.test(str);
    }
}