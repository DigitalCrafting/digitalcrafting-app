import {Input} from "../Input";
import {type ChangeEvent, useState} from "react";
import {EyeIcon, EyeOffIcon} from "../../icons/Icons";
import {IconButton} from "../../buttons/IconButton";
import {Tooltip} from "../../tooltip/Tooltip";
import {noop} from "../../../utils/Utils";
import {ZoriaInputProps} from "../ZoriaInputProps";
import {useInputValue} from "../internal/useInputValue";
import {useInputError} from "../internal/useInputError";

interface PasswordInputProps extends ZoriaInputProps<string> {
    children?: any
}

const PasswordInput = ({
    className: externalClassName = '',
    'data-testid': dataTestId = 'qa-password-input',
    label,
    value: externalValue = '',
    defaultValue: externalDefaultValue = '',
    onChange: externalOnChange = noop,
    error: externalError,
    isControlled = false,
    id,
    disabled,
    ...props
}: PasswordInputProps) => {
    const [value, setValue] = useInputValue(externalValue, externalOnChange, externalDefaultValue, isControlled);
    const [error] = useInputError(externalError);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const internalOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValue(value);
    }

    return <Input {...props} data-testid={dataTestId} value={value} error={error} onChange={internalOnChange} type={showPassword ? 'text' : 'password'}>
        <IconButton onClick={() => setShowPassword(curr => !curr)}>
            {
                showPassword ?
                    <Tooltip key='hideIconWithTooltip'>
                        <Tooltip.Trigger><EyeOffIcon/></Tooltip.Trigger>
                        <Tooltip.Body>Hide Password</Tooltip.Body>
                    </Tooltip>
                    : <Tooltip key='showIconWithTooltip'>
                        <Tooltip.Trigger><EyeIcon/></Tooltip.Trigger>
                        <Tooltip.Body>Show Password</Tooltip.Body>
                    </Tooltip>
            }
        </IconButton>
    </Input>
}

export {PasswordInput};
export type { PasswordInputProps };
