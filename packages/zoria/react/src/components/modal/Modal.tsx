import * as React from 'react';
import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Subject} from "rxjs";
import {createPortal} from "react-dom";
import {UiSize} from "../../types/UiSizes";
import {XIcon} from "../icons/Icons";
import {useFocusTrap} from "../../hooks/useFocusTrap";
import {IconButton} from "../buttons/IconButton";
import {Col, Row} from "../layout/Layout";
import {Button, type ButtonProps} from "../buttons/Button";

interface ModalEvent {
    modal: React.ReactElement<ModalProps> | null
}

class ModalServiceImpl {
    readonly subject: Subject<ModalEvent> = new Subject();

    show(modal: React.ReactElement<ModalProps>) {
        this.subject.next({modal});
    }

    hide() {
        this.subject.next({modal: null})
    }
}

const ModalService = new ModalServiceImpl();

function ModalPortalManager() {
    const [state, setState] = useState<React.ReactElement<ModalProps> | null>(null);

    useEffect(() => {
        const sub = ModalService.subject.subscribe((state) => {
            setState(state.modal);
            if (state.modal) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        })
        return () => {
            sub.unsubscribe();
        }
    }, []);

    const visibilityClassName = state ? 'visible' : 'hidden';

    return <>
        {createPortal(
            <div className={`z-modal-backdrop ${visibilityClassName}`}
            >
                {state}
            </div>, document.body)}
    </>

}

interface ModalProviderProps {
    children: React.ReactElement
}

function ModalProvider({children}: ModalProviderProps) {

    return <>
        {children}
        <ModalPortalManager/>
    </>
}

type ModalActionEvent = 'submit' | 'close';

interface ModalContextType {
    subject: Subject<ModalActionEvent>
    dataTestId: string
}

const ModalContext = React.createContext<ModalContextType>({} as ModalContextType);

function useModalContext() {
    return useContext(ModalContext);
}

interface ModalContextProviderProps {
    children: React.ReactNode;
    dataTestId: string;
    subject: Subject<ModalActionEvent>
}

function ModalContextProvider({children, dataTestId, subject}: ModalContextProviderProps) {
    return <ModalContext.Provider value={{
        subject,
        dataTestId
    }}>{children}</ModalContext.Provider>
}

interface ModalPartProps {
    className?: string,
}

function ModalHeader({
    children,
    className: externalClassName = '',
}: React.PropsWithChildren<ModalPartProps>) {
    const {dataTestId} = useModalContext();

    return <Row data-testid={`${dataTestId}-header`} className={`z-modal-header ${externalClassName}`}>
        {children}
    </Row>;
}

function ModalBody({
    children,
    className: externalClassName = '',
}: React.PropsWithChildren<ModalPartProps>) {
    const {dataTestId} = useModalContext();

    return <Col data-testid={`${dataTestId}-body`} className={`z-modal-body ${externalClassName}`}>
        {children}
    </Col>;
}

function ModalFooter({
    children,
    className: externalClassName = '',
}: React.PropsWithChildren<ModalPartProps>) {
    const {dataTestId} = useModalContext();

    return <Row gap='sm' data-testid={`${dataTestId}-footer`} className={`z-modal-footer ${externalClassName}`}>
        {children}
    </Row>;
}

function ModalX() {
    const {dataTestId, subject} = useModalContext();

    const hideModal = () => {
        subject.next('close');
    }

    return <div className='z-modal-x item-right'>
        <IconButton size={UiSize.LG} data-testid={`${dataTestId}-x-button`} onClick={hideModal}>
            <XIcon/>
        </IconButton>
    </div>
}

function ModalSubmitButton({onClick, children, ...props}: ButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const {dataTestId, subject} = useModalContext();

    const internalOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
    }

    useEffect(() => {
        const subscription = subject.subscribe((event: ModalActionEvent) => {
            if (event === 'submit') {
                ref.current?.click();
            }
        })

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    return <Button
        ref={ref}
        onClick={internalOnClick}
        {...props}
        data-testid={`${dataTestId}-submit-button`}
    >{children}</Button>
}

function ModalActionButton({onClick, children, ...props}: ButtonProps) {
    const {dataTestId} = useModalContext();

    const internalOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
    }

    return <Button
        data-testid={`${dataTestId}-action-button`}
        onClick={internalOnClick}
        {...props}
        secondary
    >{children}</Button>
}

type HeaderType = React.ReactElement<typeof ModalHeader>;
type BodyType = React.ReactElement<typeof ModalBody>;
type FooterType = React.ReactElement<typeof ModalFooter>;

type ModalChildrenType =
    | [BodyType]
    | [HeaderType, BodyType]
    | [HeaderType, BodyType, FooterType]
    | [BodyType, FooterType]
    | React.ReactNode;

const ModalSize = {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    FS: 'fullscreen'
} as const;
type ModalSize = (typeof ModalSize)[keyof typeof ModalSize];

interface ModalProps {
    children: ModalChildrenType,
    size?: ModalSize,
    'data-testid'?: string,
    onClose?: (() => void) | null
}

function InternalModal({
    children,
    size = UiSize.MD,
    'data-testid': dataTestId = 'qa-modal',
    onClose = null
}: ModalProps) {
    const subject = useRef<Subject<ModalActionEvent>>(new Subject<ModalActionEvent>())
    const modalRef = useRef<HTMLDivElement>(null);

    useFocusTrap(modalRef);

    const hideModal = useCallback(() => {
        if (onClose !== null) {
            onClose();
        } else {
            ModalService.subject.next({modal: null});
        }
    }, [onClose]);

    const onKeyDown = useCallback((event: React.KeyboardEvent | KeyboardEvent) => {
        if (event.key === 'Escape') {
            hideModal();
        } else if (event.ctrlKey && event.key === 'Enter') {
            subject.current.next('submit');
        }
    }, [hideModal])

    useEffect(() => {
        const subscription = subject.current.subscribe((event: ModalActionEvent) => {
            if (event === 'close') {
                hideModal();
            }
        });
        document.addEventListener('keydown', onKeyDown);

        return () => {
            subscription.unsubscribe();
            document.removeEventListener('keydown', onKeyDown);
        }
    }, [onKeyDown]);

    return <ModalContextProvider dataTestId={dataTestId} subject={subject.current}>
        <div data-testid={dataTestId} ref={modalRef} role='dialog'
             className={`z-modal z-modal-${size}`}>
            {children}
        </div>
    </ModalContextProvider>;
}

const Modal = Object.assign(InternalModal, {
    Header: ModalHeader,
    Body: ModalBody,
    Footer: ModalFooter,
    X: ModalX,
    SubmitButton: ModalSubmitButton,
    ActionButton: ModalActionButton
})


export {Modal, ModalProvider, ModalSize, ModalService};
