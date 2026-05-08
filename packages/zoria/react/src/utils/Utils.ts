
export class CryptoUtils {
    static UUID(): string {
        return crypto.randomUUID();
    }
}

export function noop() {}

export function leftPad(padChar: string, length: number, value: string) {
    if (value.length >= length) {
        return value;
    }

    const howManyToAdd = length - value.length;
    let padded = value;
    for (let i = 0; i < howManyToAdd; i++) {
        padded = padChar + value;
    }

    return padded;
}