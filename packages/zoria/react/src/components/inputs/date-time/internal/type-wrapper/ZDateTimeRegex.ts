/* ISO 8601 */
export namespace ZDateTimeRegex {
    // Basic ISO Date
    export const ISO_DATE_PATTERN = '\\d{4}-\\d{2}-\\d{2}';
    // ISO Time HH:mm with optional :ss, allows 1-digit hours/minutes/seconds
    export const ISO_TIME_PATTERN = '\\d{1,2}:\\d{1,2}(?::\\d{1,2})?';
    export const DISPLAY_DASH_SEPARATOR_PATTERN = '\\s*[\\-–—]\\s*';
    export const ISO_TIMEZONE_SUFFIX = '?(?:Z|[+-]\\d{2}:?\\d{2})?';

    export const ISO_DATETIME_PATTERN = `${ISO_DATE_PATTERN}T${ISO_TIME_PATTERN}`;
    export const DISPLAY_DATETIME_PATTERN = `${ISO_DATE_PATTERN}\\s+${ISO_TIME_PATTERN}`;


    // 2. COMPOSED REGEX BUILDERS
    // Note: We wrap parts in capture groups () so they show up cleanly in match results
    export const ISO_DATE_REGEX = new RegExp(`^${ISO_DATE_PATTERN}$`);
    export const ISO_TIME_REGEX = new RegExp(`^${ISO_TIME_PATTERN}$`);

    export const ISO_DATETIME_REGEX = new RegExp(`^${ISO_DATETIME_PATTERN}${ISO_TIMEZONE_SUFFIX}$`);
    export const DISPLAY_DATETIME_REGEX = new RegExp(`^${DISPLAY_DATETIME_PATTERN}$`);

    // Ranges
    export const ISO_DATE_RANGE_REGEX = new RegExp(
        `^(${ISO_DATE_PATTERN})/(${ISO_DATE_PATTERN})$`
    );
    export const DISPLAY_DATE_RANGE_REGEX = new RegExp(
        `^(${ISO_DATE_PATTERN})${DISPLAY_DASH_SEPARATOR_PATTERN}(${ISO_DATE_PATTERN})$`
    );

    export const ISO_TIME_RANGE_REGEX = new RegExp(
        `^(${ISO_TIME_PATTERN})/(${ISO_TIME_PATTERN})$`
    );
    export const DISPLAY_TIME_RANGE_REGEX = new RegExp(
        `^(${ISO_TIME_PATTERN})${DISPLAY_DASH_SEPARATOR_PATTERN}(${ISO_TIME_PATTERN})$`
    );

    export const ISO_DATETIME_RANGE_REGEX = new RegExp(
        `^(${ISO_DATETIME_PATTERN})/(${ISO_DATETIME_PATTERN})$`
    );
    export const DISPLAY_DATETIME_RANGE_REGEX = new RegExp(
        `^(${DISPLAY_DATETIME_PATTERN})${DISPLAY_DASH_SEPARATOR_PATTERN}(${DISPLAY_DATETIME_PATTERN})$`
    );
}
