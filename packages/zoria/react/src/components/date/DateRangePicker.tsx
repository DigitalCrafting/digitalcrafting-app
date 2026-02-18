import React from "react";

interface DateRange {
    start?: string
    end?: string
}

interface DateRangePickerProps {
    range?: DateRange
    onChange?: (range: DateRange) => void
}

export function DateRangePicker({}: DateRangePickerProps) {
    return <div></div>;
}