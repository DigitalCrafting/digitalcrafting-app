import * as React from 'react';

export interface ZoriaProps {
    'data-testid'?: string
}

export type UniversalInteractionEvent =
    | React.MouseEvent
    | MouseEvent
    | React.KeyboardEvent
    | KeyboardEvent;