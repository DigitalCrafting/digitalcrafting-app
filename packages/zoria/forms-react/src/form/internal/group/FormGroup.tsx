import type {PropsWithChildren, ElementType, ReactElement, ReactNode} from "react";
import {FormPathContextProvider} from "../FormPathContext";
import {useFormGroup} from "../../FormHooks";
import {Col, Grid, H2, Row} from "@zoria-ui/react";

export interface _FormGroupTitleProps {
    as?: ElementType
}

const _FormGroupTitle = ({children, as}: PropsWithChildren<_FormGroupTitleProps>) => {
    const Component = as || H2;

    return <Row><Component>{children}</Component></Row>
}

type _FormGroupTitleType = ReactElement<typeof _FormGroupTitle>;

const _FormGroupBody = ({children}: PropsWithChildren) => {
    return <Grid>{children}</Grid>
}

type _FormGroupBodyType = ReactElement<typeof _FormGroupBody>;

const _FormGroupError = () => {
    const {error} = useFormGroup();

    if (!error) {
        return null;
    }

    return <Row className='z-form-group-error'>{error}</Row>
}

export interface _FormGroupComponentProps {
    path: string,
    children: [_FormGroupTitleType, _FormGroupBodyType] | _FormGroupBodyType | ReactNode[] | ReactNode
}

const _FormGroupComponent = ({children, path}: _FormGroupComponentProps) => {
    return <FormPathContextProvider path={path}>
        <Col span={12} gap='sm' className='z-form-group'>
            {children}
            <_FormGroupError/>
        </Col>
    </FormPathContextProvider>
}

export const FormGroup = Object.assign(_FormGroupComponent, {
    Title: _FormGroupTitle,
    Body: _FormGroupBody
})
