import {Input, type InputProps} from "./Input";
import {useState} from "react";
import {EyeIcon, EyeOffIcon} from "../icons/Icons";
import {IconButton} from "../buttons/IconButton";
import {Tooltip} from "../tooltip/Tooltip";

interface PasswordInputProps extends Omit<InputProps, 'type'> {

}

const PasswordInput = ({children, ...props}: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return <Input {...props} type={showPassword ? 'text' : 'password'}>
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