import {type ZoriaInputProps} from "../ZoriaInputProps";
import {useInputValue} from "../internal/useInputValue";

export interface CheckboxProps extends Omit<ZoriaInputProps<boolean>, 'value' | 'defaultValue'> {
    children: string;
    checked?: boolean;
    defaultChecked?: boolean;
}

export function Checkbox({
    children,
    disabled,
    className: externalClassName = '',
    checked: externalChecked = false,
    onChange: externalOnChange,
    defaultChecked: externalDefaultChecked = false,
    "data-testid": dataTestId = 'qa-checkbox',
    isControlled,
    ...rest
}: CheckboxProps) {
    const [checked, setChecked] = useInputValue<boolean>(externalChecked, externalOnChange, externalDefaultChecked, isControlled);

    return <label data-testid={`${dataTestId}`} className={`z-checkbox ${externalClassName}`}>
        <input data-testid={`${dataTestId}-input`} type='checkbox' disabled={disabled} checked={checked} onChange={(e) => setChecked(e.target.checked)} {...rest}/>
        <span data-testid={`${dataTestId}-box`} className='z-checkbox-box'/>
        <span className='z-checkbox-label'>{children}</span>
    </label>
}