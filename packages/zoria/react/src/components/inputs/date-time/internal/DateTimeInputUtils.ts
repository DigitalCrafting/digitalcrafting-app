import {DateTimeUtils} from "../../../../utils/DateTimeUtils";

export class DateTimeInputUtils {
    static isoToDisplay(isoString: string): string {
        const [date, time] = DateTimeUtils.split(isoString);

        return `${date} ${time.slice(0, 5)}`
    }

    static displayToIsoString(display: string): string {
        const [date, time] = display.split(' ');
        return DateTimeUtils.join(date, time);
    }
}