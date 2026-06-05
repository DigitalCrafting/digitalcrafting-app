import {FormPathContextProvider} from "./FormPathContext";

export interface _FormArrayComponentProps {
    path: string;
    children: any
}

export const _FormArrayComponent = ({path, children}: _FormArrayComponentProps) => {
    return <FormPathContextProvider path={path}>
        {children}
    </FormPathContextProvider>
}