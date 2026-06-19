import {FormPathContextProvider, useFormPath} from "../FormPathContext";
import {createContext, type PropsWithChildren, type ReactElement, useContext} from "react";
import './FormArray.scss';
import {useFormArray} from "../../FormHooks";
import {Col, noop, Row} from "@zoria-ui/react";
import type {ValidationError} from "@zoria-ui/forms";

declare const process: { env: { NODE_ENV: string } };

// <FormArray>
//     <FormArray.Element>
//         <FormArray.Inputs></FormArray.Inputs>
//         <FormArray.Buttons>
//             <FormArray.RemoveButton />
//             <FormArray.AddButton />
//         </FormArray.Buttons>
//     </FormArray.Element> || <FormArray.NoElementMessage />
//     <FormArray.Error></FormArray.Error>
// </FormArray>

type _FormArrayInternalContextType = {
    index: number;
    add: (value: any) => void;
    remove: (index: number) => void;
}

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

const _FormArrayInputs = ({children}: PropsWithChildren) => {
    return <div className='form-array-inputs'>{children}</div>;
}

type _FormArrayInputsType = ReactElement<typeof _FormArrayInputs>;

const _FormArrayNoElementMessage = () => {

}

type _FormArrayNoElementMessageType = ReactElement<typeof _FormArrayNoElementMessage>;

const _FormArrayAddButton = () => {

}

type _FormArrayAddButtonType = ReactElement<typeof _FormArrayAddButton>;

const _FormArrayRemoveButton = () => {

}

type _FormArrayRemoveButtonType = ReactElement<typeof _FormArrayRemoveButton>;

const _FormArrayButtons = () => {
    return <div className='form-array-element-buttons'></div>
}

type _FormArrayButtonsType = ReactElement<typeof _FormArrayButtons>;

interface _FormArrayElementProps {
    index: number
}

const _FormArrayElement = ({children, index}: PropsWithChildren<_FormArrayElementProps>) => {
    return <FormPathContextProvider path={index.toString()}>
        <Col span={12}>
            <Row gap='sm'>
                <div className='form-array-element'>
                    <_FormArrayInputs>
                        {children}
                    </_FormArrayInputs>
                    <_FormArrayButtons/>
                </div>
            </Row>
            <Row gap='sm'>
                <_FormArrayError></_FormArrayError>
            </Row>
        </Col>
    </FormPathContextProvider>
}

type _FormArrayElementType = ReactElement<typeof _FormArrayElement>;

interface _FormArrayErrorProps {
    children?: ValidationError
}

const _FormArrayError = ({children}: _FormArrayErrorProps) => {
    return <span className='z-input-error'>{children}</span>
}

type _FormArrayErrorType = ReactElement<typeof _FormArrayError>;

const _FormArrayWrapper = ({children}: PropsWithChildren) => {
    const currentPath = useFormPath();
    const {
        value,
        error
    } = useFormArray(currentPath);

    return <div className='form-array'>
        {
            value.map((_, index) => {
                return (
                    <Row key={`form-array-`} gap='lg'>
                        <_FormArrayElement index={index}>
                            {children}
                        </_FormArrayElement>
                    </Row>
                )
            })
        }
        {
            error ? <Row gap='lg'><_FormArrayError>{error}</_FormArrayError></Row> : null
        }
    </div>
}

export interface _FormArrayComponentProps {
    path: string;
}

export const _FormArrayComponent = ({path, children}: PropsWithChildren<_FormArrayComponentProps>) => {
    return <FormPathContextProvider path={path}>
        <_FormArrayWrapper>{children}</_FormArrayWrapper>
    </FormPathContextProvider>
}