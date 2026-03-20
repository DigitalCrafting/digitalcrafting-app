export class CryptoUtils {
    static UUID(): string {
        return crypto.randomUUID();
    }
}

export function noop() {}