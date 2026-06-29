import type {PropsWithChildren} from "react";

export const MessageSeverity = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNINGS: 'warnings',
    ERROR: 'error'
} as const;
export type MessageSeverity = (typeof MessageSeverity)[keyof typeof MessageSeverity];

export interface Message {
    text: string
    severity: MessageSeverity
}

export interface SingleMessageProps extends Message {
}

export const SingleMessage = ({children, severity}: PropsWithChildren<Omit<SingleMessageProps, 'text'>>) => {
    return <span className={`z-message-${severity}`}>{children}</span>
}

export interface Messages {
    info: string[];
    success: string[];
    warnings: string[];
    error: string[];
}

export interface MessagesListProps {
    messages: Messages | Message[]
}

export const MessagesList = ()=> {
    return <></>
}