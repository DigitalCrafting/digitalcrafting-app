import {createContext, PropsWithChildren, useContext} from "react";

interface FormPathContextType {
    currentPath: string
}

const FormPathContext = createContext<FormPathContextType>({
    currentPath: ''
})

const useFormPath = (path: string): string => {
    const ctx = useContext(FormPathContext);

    if (!ctx) {
        return '';
    }

    return ctx.currentPath + '.' + path;
}

interface FormPathContextProviderProps {
    path: string
}

const FormPathContextProvider = ({children, path}: PropsWithChildren<FormPathContextProviderProps>) => {
    const currentPath = useFormPath(path);

    return <FormPathContext.Provider value={{currentPath}}>
        {children}
    </FormPathContext.Provider>
}

export {FormPathContextProvider, useFormPath, type FormPathContextType};