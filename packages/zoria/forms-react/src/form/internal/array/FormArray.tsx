import {FormPathContextProvider, useFormPath} from "../FormPathContext";
import {createContext, type PropsWithChildren, useContext} from "react";
import './FormArray.scss';
import {useFormArray, useFormElement} from "../../FormHooks";
import {
    CircleMinusIcon,
    CirclePlusIcon,
    Col,
    Grid,
    IconButton,
    Row, SingleMessage,
    Text,
    TextButton, Tooltip
} from "@zoria-ui/react";
import {type ValidationError, ZoriaFormArray} from "@zoria-ui/forms";

declare const process: { env: { NODE_ENV: string } };

/* TODO params for length */
const DEFAULT_MAX_LENGTH_MESSAGE = 'You cannot add more elements';
const DEFAULT_MIN_LENGTH_MESSAGE = 'You cannot remove more elements';

type _FormArrayMinMaxMessagesProps = {
    maxLengthMessage?: string
    minLengthMessage?: string
}

type _FormArrayInternalContextType = {
    control: ZoriaFormArray;
    add: (value?: any) => void;
    remove: (index: number) => void;
} & _FormArrayMinMaxMessagesProps;

const _FormArrayInternalContext = createContext<_FormArrayInternalContextType | null>(null);

const _useFormArrayInternalContext = () => {
    const ctx = useContext(_FormArrayInternalContext);

    if (process.env.NODE_ENV !== 'production') {
        if (!ctx) {
            throw new Error(`useFormArrayContext::no context provider`);
        }
    }

    return ctx;
}

const _FormArrayInternalContextProvider = ({
    children,
    maxLengthMessage = DEFAULT_MAX_LENGTH_MESSAGE,
    minLengthMessage = DEFAULT_MIN_LENGTH_MESSAGE
}: PropsWithChildren<_FormArrayMinMaxMessagesProps>) => {
    const {formArrayControl} = useFormArray();

    const add = (value?: any) => {
        formArrayControl.push(value);
    }

    const remove = (index: number) => {
        formArrayControl.remove(index);
    }

    return <_FormArrayInternalContext.Provider value={{
        add,
        remove,
        control: formArrayControl,
        maxLengthMessage,
        minLengthMessage
    }}>
        {children}
    </_FormArrayInternalContext.Provider>
}

const _FormArrayInputs = ({children}: PropsWithChildren) => {
    return <div className='z-form-array-element-inputs'>{children}</div>;
}

const _FormArrayNoElementMessage = () => {
    const {add} = _useFormArrayInternalContext()!;


    const onAdd = () => {
        add();
    }

    return <Col span={12} className='z-form-array-no-elements justify-center align-items-center'>
        <Row gap='sm' className={'justify-center content-center'}>
            <Text>No elements have been added</Text>
        </Row>
        <Row gap='sm' className={'justify-center content-center'}>
            <TextButton onClick={onAdd}>Add element</TextButton>
        </Row>
    </Col>
}

interface _FormArrayButtonsProps {
    index: number
}

const _FormArrayRemoveButton = ({index}: _FormArrayButtonsProps) => {
    const {remove, control, minLengthMessage} = _useFormArrayInternalContext()!;

    const canRemove = control.canRemove();
    const onRemove = () => {
        remove(index);
    }

    if (canRemove) {
        return <IconButton onClick={onRemove}>
            <CircleMinusIcon/>
        </IconButton>
    } else {
        return <Tooltip>
            <Tooltip.Trigger>
                <IconButton disabled={!canRemove}>
                    <CircleMinusIcon/>
                </IconButton>
            </Tooltip.Trigger>
            <Tooltip.Body className='form-array-button-tooltip-body'>{minLengthMessage}</Tooltip.Body>
        </Tooltip>
    }
}

const _FormArrayAddButton = ({index}: _FormArrayButtonsProps) => {
    const {add, control, maxLengthMessage} = _useFormArrayInternalContext()!;

    const addVisible = index === control.length - 1;
    const canAdd = control.canAdd();
    const onAdd = () => {
        if (addVisible) {
            add();
        }
    }

    if (!addVisible) {
        return null;
    }

    if (canAdd) {
        return <IconButton onClick={onAdd}>
            <CirclePlusIcon/>
        </IconButton>
    } else {
        return <Tooltip>
            <Tooltip.Trigger>
                <IconButton disabled={!canAdd}>
                    <CirclePlusIcon/>
                </IconButton>
            </Tooltip.Trigger>
            <Tooltip.Body className='form-array-button-tooltip-body'>{maxLengthMessage}</Tooltip.Body>
        </Tooltip>
    }
}


const _FormArrayButtons = ({index}: _FormArrayButtonsProps) => {
    return <div className='z-form-array-element-buttons'>
        <Grid.Col className='z-form-array-element-buttons-button' span={1}>
            <_FormArrayRemoveButton index={index}/>
        </Grid.Col>
        <Grid.Col className='z-form-array-element-buttons-button' span={1}>
            <_FormArrayAddButton index={index}/>
        </Grid.Col>
    </div>
}

interface _FormArrayElementProps {
    index: number
}

const _FormArrayElement = ({children, index}: PropsWithChildren<_FormArrayElementProps>) => {
    const currentPath = useFormPath(index.toString());
    const element = useFormElement(currentPath);
    const error = element?.getError();

    return <FormPathContextProvider path={index.toString()}>
        <Col span={12}>
            <Row gap='sm'>
                <div className='z-form-array-element'>
                    <_FormArrayInputs>
                        {children}
                    </_FormArrayInputs>
                    <_FormArrayButtons index={index}/>
                </div>
            </Row>
            {
                error ?
                    <Row gap='sm'>
                        <_FormArrayError/>
                    </Row> : null
            }
        </Col>
    </FormPathContextProvider>
}

interface _FormArrayErrorProps {
    children?: ValidationError
}

const _FormArrayError = ({children}: _FormArrayErrorProps) => {
    return <SingleMessage severity='error'>{children}</SingleMessage>
}

const _FormArrayWrapper = ({children, ...messages}: PropsWithChildren<_FormArrayMinMaxMessagesProps>) => {
    const {
        value,
        error
    } = useFormArray();

    if (!value || !value.length) {
        return <Col span={12} className='z-form-array'>
            <_FormArrayInternalContextProvider>
                <_FormArrayNoElementMessage/>
            </_FormArrayInternalContextProvider>
        </Col>
    }

    return <Col span={12} className='z-form-array'>
        <_FormArrayInternalContextProvider {...messages}>
            {
                value.map((_, index) => {
                    return (
                        <Row key={`z-form-array-${index}-${value.length}`} gap='lg'>
                            <_FormArrayElement index={index}>
                                {children}
                            </_FormArrayElement>
                        </Row>
                    )
                })
            }
            {
                error ? <Row gap='lg'>
                    <_FormArrayError>{error}</_FormArrayError>
                </Row> : null
            }
        </_FormArrayInternalContextProvider>
    </Col>
}

export interface _FormArrayComponentProps extends _FormArrayMinMaxMessagesProps {
    path: string;
}

export const _FormArrayComponent = ({
    path,
    children,
    ...rest
}: PropsWithChildren<_FormArrayComponentProps>) => {
    return <FormPathContextProvider path={path}>
        <_FormArrayWrapper {...rest} >{children}</_FormArrayWrapper>
    </FormPathContextProvider>
}