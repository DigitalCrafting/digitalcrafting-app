const MessageSeverity = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNINGS: 'warnings',
    ERROR: 'error'
} as const;
type MessageSeverity = (typeof MessageSeverity)[keyof typeof MessageSeverity];

interface Message {
    text: string
    severity: MessageSeverity
}

interface SingleMessageProps extends Message {
}

const SingleMessage = ({text, severity}: SingleMessageProps) => {
    return <span className={`z-message-${severity}`}>{text}</span>
}

interface Messages {
    info: string[];
    success: string[];
    warnings: string[];
    error: string[];
}

interface MessagesListProps {
    messages: Messages | Message[]
}

const MessagesList = ()=> {
    return <></>
}