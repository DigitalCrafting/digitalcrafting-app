import {useState} from "react";

export type UseInputErrorReturnType = [string | undefined, (value?: string) => void];

export function useInputError(externalError?: string): UseInputErrorReturnType {
    const [internalError, setInternalError] = useState<string | undefined>(externalError);

    // InternalError takes precedence
    // ExternalError change in component props will trigger the update, so we don't need additional check
    // We don't need a setter for externalError, that's responsibility of user
    const error = internalError ? internalError : externalError;

    return [error, setInternalError];
}