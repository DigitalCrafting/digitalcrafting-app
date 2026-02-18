import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Subject} from "rxjs";
import {createPortal} from "react-dom";
import {ZSize} from "../../types/ZSizes.ts";
import {XIcon} from "../icons/Icons";
import {useFocusTrap} from "../../hooks/useFocusTrap.ts";
import {IconButton} from "../buttons/IconButton";
import {ZCol, ZRow} from "../layout/ZLayout";
import {ZButton, type ZButtonProps} from "../buttons/ZButton";

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

interface ZModalProviderProps {
    children: React.ReactElement
}

function ZModalProvider({children}: ZModalProviderProps) {

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

    return <ZRow data-testid={`${dataTestId}-header`} className={`z-modal-header ${externalClassName}`}>
        {children}
    </ZRow>;
}

function ModalBody({
                       children,
                       className: externalClassName = '',
                   }: React.PropsWithChildren<ModalPartProps>) {
    const {dataTestId} = useModalContext();

    return <ZRow data-testid={`${dataTestId}-body`} className={`z-modal-body ${externalClassName}`}>
        {children}
    </ZRow>;
}

function ModalFooter({
                         children,
                         className: externalClassName = '',
                     }: React.PropsWithChildren<ModalPartProps>) {
    const {dataTestId} = useModalContext();

    return <ZRow data-testid={`${dataTestId}-footer`} className={`z-modal-footer ${externalClassName}`}>
        {children}
    </ZRow>;
}

function ModalX() {
    const {dataTestId, subject} = useModalContext();

    const hideModal = () => {
        subject.next('close');
    }

    return <div className='z-modal-x item-right'>
        <IconButton size={ZSize.LG} data-testid={`${dataTestId}-x-button`} onClick={hideModal}>
            <XIcon/>
        </IconButton>
    </div>
}

function ModalSubmitButton({onClick, children, ...props}: ZButtonProps) {
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

    return <ZCol gap={ZSize.SM}><ZButton
        ref={ref}
        onClick={internalOnClick}
        {...props}
        data-testid={`${dataTestId}-submit-button`}
    >{children}</ZButton></ZCol>
}

function ModalActionButton({onClick, children, ...props}: ZButtonProps) {
    const {dataTestId} = useModalContext();

    const internalOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
    }

    return <ZCol gap={ZSize.SM}><ZButton
        data-testid={`${dataTestId}-action-button`}
        onClick={internalOnClick}
        {...props}
        secondary
    >{children}</ZButton></ZCol>
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

const ZModalSize = {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    FS: 'fullscreen'
} as const;
type ZModalSize = (typeof ZModalSize)[keyof typeof ZModalSize];

interface ModalProps {
    children: ModalChildrenType,
    size?: ZModalSize,
    'data-testid'?: string,
    onClose?: (() => void) | null
}

function Modal({children, size = ZSize.MD, 'data-testid': dataTestId = 'qa-modal', onClose = null}: ModalProps) {
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

const ZModal = Object.assign(Modal, {
    Header: ModalHeader,
    Body: ModalBody,
    Footer: ModalFooter,
    X: ModalX,
    SubmitButton: ModalSubmitButton,
    ActionButton: ModalActionButton
})


export {ZModal, ZModalProvider, ZModalSize, ModalService as ZModalService};
