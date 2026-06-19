import {createContext, type PropsWithChildren, useContext} from "react";
import {ZoriaFormGroup} from "@zoria-ui/forms";
declare const process: { env: { NODE_ENV: string } };

interface FormContextType {
    formGroup: ZoriaFormGroup
}

const FormContext = createContext<FormContextType | null>(null);

const useFormContext = (): FormContextType => {
    const ctx = useContext(FormContext);

    if (process.env.NODE_ENV !== 'production') {
        if (!ctx) {
            throw new Error("useFormContext::no context provider.")
        }
    }

    return ctx!;
}

interface FormContextProviderProps {
    formGroup: ZoriaFormGroup
}

const FormContextProvider = ({children, formGroup}: PropsWithChildren<FormContextProviderProps>) => {
    return <FormContext.Provider value={{formGroup}}>
        {children}
    </FormContext.Provider>
}

export {FormContextProvider, useFormContext}