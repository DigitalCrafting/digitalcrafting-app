// Compiled once at the module level
const TIME_REGEX = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;


export namespace TimeUtils {
    /**
     * Validates time in HH:mm or HH:mm:ss format.
     * Extremely performant for bulk validation or frequent input changes.
     */
    export function validateTime(str: string): boolean {
        return TIME_REGEX.test(str);
    }
}