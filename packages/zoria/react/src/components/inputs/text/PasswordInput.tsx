import {Input, type InputProps} from "../Input";
import {type ChangeEvent, useState} from "react";
import {EyeIcon, EyeOffIcon} from "../../icons/Icons";
import {IconButton} from "../../buttons/IconButton";
import {Tooltip} from "../../tooltip/Tooltip";
import {noop} from "../../../utils/Utils";

interface PasswordInputProps extends Omit<InputProps, 'type' | 'onChange'> {
    onChange?: (value: string) => void
}

const PasswordInput = ({children, onChange = noop, ...props}: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const internalOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChange(value);
    }

    return <Input {...props} onChange={internalOnChange} type={showPassword ? 'text' : 'password'}>
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