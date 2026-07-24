import * as React from 'react';

export interface ZoriaProps {
    'data-testid'?: string
}

export type UniversalInteractionEvent =
    | React.MouseEvent
    | MouseEvent
    | React.KeyboardEvent
    | KeyboardEvent;

export type KeyDownHandlerType = (event: React.KeyboardEvent | KeyboardEvent) => void;

export type OnClickHandlerType = (event: React.MouseEvent | MouseEvent) => void;

export const EN_DASH = "\u2013";
export const HYPHEN = "-";