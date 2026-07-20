import type {ZoriaSelectOption} from "../../../select/SelectInputTypes";
import {useMemo} from "react";
import {leftPad} from "../../../../../utils/Utils";

export function useTimePickerSelectOptions(
    minutesInterval: number = 30,
    minHour: number = 0,
    maxHour: number = 24,
    minMin: number = 0,
    maxMin: number = 60,
): ZoriaSelectOption[] {
    return useMemo(() => {
        const options: ZoriaSelectOption[] = [];

        for (let i = minHour; i < maxHour; i++) {
            for (let j = 0; j < 60; j += minutesInterval) {
                if (i === minHour && j < minMin) {
                    continue;
                }

                if (i === maxHour - 1 && j > maxMin) {
                    continue;
                }

                const hours = leftPad('0', 2, String(i));
                const minutes = leftPad('0', 2, String(j));
                const time = hours + ':' + minutes;
                options.push({
                    value: time,
                    searchValue: time,
                    display: time
                })
            }
        }


        return options;
    }, [minutesInterval, minHour, maxHour, minMin, maxMin])
}