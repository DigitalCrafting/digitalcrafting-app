import type {PropsWithChildren} from "react";
import {FormPathContextProvider} from "../FormPathContext";

export interface _FormGroupComponentProps {
    path: string
}

export const _FormGroupComponent = ({children, path}: PropsWithChildren<_FormGroupComponentProps>) => {
    return <FormPathContextProvider path={path}>
        {children}
    </FormPathContextProvider>
}