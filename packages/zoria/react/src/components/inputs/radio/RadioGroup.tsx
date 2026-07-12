import * as React from "react";
import {useState} from "react";

interface RadioGroupContextType {
    name: string,
    value: any,
    onChange: (value: any) => void
}

const RadioGroupContext = React.createContext<RadioGroupContextType | null>(null);

const useRadioGroupContext = () => React.useContext(RadioGroupContext)!;

interface RadioGroupItemProps {
    children: string
    className?: string
    value: any
}

const RadioGroupItem = ({children, className: externalClassName = '', value: radioValue}: RadioGroupItemProps) => {
    const {name, onChange, value} = useRadioGroupContext();

    return <label className={`z-radio ${externalClassName}`.trim()}>
        {/* @ts-ignore */}
        <input readOnly type='radio' checked={radioValue === value} name={name} value={radioValue} onClick={() => onChange(radioValue)}/>
        <span className="z-radio-box" />
        <span className="z-radio-label">{children}</span>
    </label>
}

interface RadioGroupProps {
    name: string;
    className?: string;
    children: React.ReactElement<typeof RadioGroupItem>[];
    value?: any;
    defaultValue?: any;
    onChange?: (value: any) => void;
    isControlled?: boolean;
}

const RadioGroupInternal = ({children, name, value: externalValue, defaultValue, isControlled = false, onChange: externalOnChange = () => {}, className: externalClassName = ''}: RadioGroupProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const internalOnChange = (value: any) => {
        setInternalValue(value);
        externalOnChange?.(value);
    }

    const value = isControlled ? externalValue : internalValue;

    const onChange = isControlled ? externalOnChange : internalOnChange;

    return <RadioGroupContext.Provider value={{name, onChange, value}}>
        <div className={`z-radio-group ${externalClassName}`.trim()}>
            {children}
        </div>
    </RadioGroupContext.Provider>
}

const RadioGroup = Object.assign(RadioGroupInternal, {
    Item: RadioGroupItem
})

export {RadioGroup, type RadioGroupProps};