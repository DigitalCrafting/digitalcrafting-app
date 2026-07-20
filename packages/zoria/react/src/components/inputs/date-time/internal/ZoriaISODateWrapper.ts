import {DateTimeUtils} from "../../../../utils/DateTimeUtils";
import {DateUtils} from "../../../../utils/DateUtils";

export class ZoriaISODateWrapper {
    private date: Date;

    private constructor(dateTime: string) {
        this.date = DateUtils.fromISODate(dateTime);
    }

    public static fromIsoString(dateTime: string) {
        return new ZoriaISODateWrapper(dateTime);
    }

    public toIsoString(): string {
        return DateUtils.toISODate(this.date);
    }
}