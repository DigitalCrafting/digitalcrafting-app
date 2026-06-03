import {createContext, PropsWithChildren, useContext} from "react";
import {FormGroup} from "@zoria-ui/forms";

interface FormContextType {
    formGroup: FormGroup
}

const FormContext = createContext<FormContextType>({

} as FormContextType);

const useFormContext = (): FormContextType => {
    const ctx = useContext(FormContext);

    if (!ctx) {
        throw new Error("Calling useFormContext without a provider.")
    }

    return ctx;
}

interface FormContextProviderProps {
    formGroup: FormGroup
}

const FormContextProvider = ({children, formGroup}: PropsWithChildren<FormContextProviderProps>) => {
    return <FormContext.Provider value={{formGroup}}>
        {children}
    </FormContext.Provider>
}

export {FormContextProvider, useFormContext}