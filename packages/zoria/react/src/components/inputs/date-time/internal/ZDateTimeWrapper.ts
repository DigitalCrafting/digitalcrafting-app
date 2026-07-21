import {DateTimeUtils} from "../../../../utils/DateTimeUtils";
import {DateUtils} from "../../../../utils/DateUtils";

export interface DateTimeParts {
    year: string;
    month: string;  // 1-12
    day: string;    // 1-31
    hour: string;   // 0-23
    minute: string;
    second: string;
}

const EMPTY_PARTS: DateTimeParts = {
    year: '', month: '', day: '', hour: '', minute: '', second: '',
};

// Fields required for a complete value (second is optional).
const REQUIRED: (keyof DateTimeParts)[] = ['year', 'month', 'day', 'hour', 'minute'];


export class ZDateTimeWrapper {
    private readonly parts: DateTimeParts;

    constructor(parts: Partial<DateTimeParts> = {}) {
        this.parts = { ...EMPTY_PARTS, ...parts };
    }

    static fromISO(isoString: string): ZDateTimeWrapper {
        if (!isoString) return new ZDateTimeWrapper();
        const date = new Date(isoString);
        if (Number.isNaN(date.getTime())) return new ZDateTimeWrapper();
        return ZDateTimeWrapper.fromDate(date);
    }

    static fromDate(date: Date): ZDateTimeWrapper {
        return new ZDateTimeWrapper({
            year: String(date.getFullYear()),
            month: String(date.getMonth() + 1),
            day: String(date.getDate()),
            hour: String(date.getHours()),
            minute: String(date.getMinutes()),
            second: String(date.getSeconds()),
        });
    }

    // ---------- Immutable updates ----------

    getParts(): DateTimeParts { return { ...this.parts }; }

    withPart(update: Partial<DateTimeParts>): ZDateTimeWrapper {
        return new ZDateTimeWrapper({ ...this.parts, ...update });
    }

    isEmpty(): boolean {
        return Object.values(this.parts).every((v) => v.trim() === '');
    }

    isComplete(): boolean {
        return REQUIRED.every((k) => this.parts[k].trim() !== '');
    }

    // ---------- Validation (round-trip guards overflow) ----------

    isValid(): boolean {
        const d = this.toDate();
        if (!d) return false;
        return (
            d.getFullYear() === this.num('year') &&
            d.getMonth() + 1 === this.num('month') &&
            d.getDate() === this.num('day') &&
            d.getHours() === this.num('hour') &&
            d.getMinutes() === this.num('minute') &&
            d.getSeconds() === this.num('second', 0)
        );
    }

    // ---------- Conversions ----------

    /** Local Date for validation & day arithmetic. Null if incomplete. */
    toDate(): Date | null {
        if (!this.isComplete()) return null;
        const d = new Date(
            this.num('year'),
            this.num('month') - 1,
            this.num('day'),
            this.num('hour'),
            this.num('minute'),
            this.num('second', 0),
        );
        return Number.isNaN(d.getTime()) ? null : d;
    }

    /** ISO string WITH LOCAL OFFSET (user's POV), e.g. 2026-07-21T14:30:00+02:00. */
    toISO(): string | null {
        const d = this.toDate();
        if (!d) return null;

        const p2 = (n: number) => String(n).padStart(2, '0');
        const p4 = (n: number) => String(n).padStart(4, '0');

        // Local offset, expressed the way ISO expects (sign inverted vs getTimezoneOffset).
        const offMin = -d.getTimezoneOffset();
        const sign = offMin >= 0 ? '+' : '-';
        const off = Math.abs(offMin);
        const offset = `${sign}${p2(Math.floor(off / 60))}:${p2(off % 60)}`;

        return (
            `${p4(d.getFullYear())}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}` +
            `T${p2(d.getHours())}:${p2(d.getMinutes())}:${p2(d.getSeconds())}${offset}`
        );
    }

    /** Display string. Pads empty fields so partial typing still renders. */
    toDisplay(format = 'YYYY-MM-DD HH:mm'): string {
        const p = this.parts;
        const pad = (v: string, len = 2) =>
            v === '' ? '_'.repeat(len) : v.padStart(len, '0');

        return format
            .replace('YYYY', pad(p.year, 4))
            .replace('MM', pad(p.month))
            .replace('DD', pad(p.day))
            .replace('HH', pad(p.hour))
            .replace('mm', pad(p.minute))
            .replace('ss', pad(p.second));
    }

    // ---------- Day arithmetic (new instance) ----------

    addDays(days: number): ZDateTimeWrapper {
        const d = this.toDate();
        if (!d) return this;
        d.setDate(d.getDate() + days); // handles month/year rollover + DST correctly
        return ZDateTimeWrapper.fromDate(d);
    }

    removeDays(days: number): ZDateTimeWrapper { return this.addDays(-days); }


    private num(key: keyof DateTimeParts, fallback = NaN): number {
        const raw = this.parts[key];
        if (raw.trim() === '') return fallback;
        const n = Number(raw);
        return Number.isNaN(n) ? fallback : n;
    }
}