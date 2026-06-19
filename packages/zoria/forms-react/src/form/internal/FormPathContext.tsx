import {createContext, type PropsWithChildren, useContext} from "react";

interface FormPathContextType {
    currentPath: string
}

const FormPathContext = createContext<FormPathContextType | null>(null);

const useFormPath = (path: string = ''): string => {
    const ctx = useContext(FormPathContext);

    if (!ctx) {
        return path;
    }

    if (!path) {
        return ctx.currentPath;
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