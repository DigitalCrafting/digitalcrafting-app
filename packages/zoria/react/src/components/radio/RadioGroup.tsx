import * as React from "react";

interface RadioGroupContextType {
    name: string,
    onChange: (value: any) => void
}

const RadioGroupContext = React.createContext({
    name: '',
    onChange: () => {
    }
} as RadioGroupContextType);

const useRadioGroupContext = () => React.useContext(RadioGroupContext);

interface RadioGroupItemProps {
    children: string
    className?: string
    value: any
}

const RadioGroupItem = ({children, className: externalClassName = '', value}: RadioGroupItemProps) => {
    const {name, onChange} = useRadioGroupContext();

    return <label className={`z-radio ${externalClassName}`.trim()}>
        <input type='radio' name={name} value={value} onChange={(e) => onChange(e.target.value)}/>
        <span className="z-radio-box" />
        <span className="z-radio-label">{children}</span>
    </label>
}

interface RadioGroupProps {
    name: string
    className?: string
    children: React.ReactElement<typeof RadioGroupItem>[]
    onChange?: (value: any) => void
}

const RadioGroupInternal = ({children, name, onChange = () => {}, className: externalClassName = ''}: RadioGroupProps) => {

    return <RadioGroupContext.Provider value={{name, onChange}}>
        <div className={`z-radio-group ${externalClassName}`.trim()}>
            {children}
        </div>
    </RadioGroupContext.Provider>
}

const RadioGroup = Object.assign(RadioGroupInternal, {
    Item: RadioGroupItem
})

export {RadioGroup};