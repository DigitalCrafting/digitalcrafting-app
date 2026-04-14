import {CryptoUtils} from "../../utils/Utils";
import {useEffect, useRef} from "react";
import {Popover, type PopoverHandle} from "../popover/Popover";
import {ChevronDownIcon} from "../icons/Icons";

export interface SelectOption<T = unknown> {
    value: any
    display: T
    default?: boolean
}

interface SelectInputInternalProps<T> {
    native?: boolean
    className?: string
    'data-testid'?: string
    label?: string
    hideLabel?: boolean
    error?: string
    id?: string
    disabled?: boolean
    compact?: boolean
    onChange?: (value: any) => void,
    options: SelectOption<T>[]
}

const NativeSelectInput = ({
    className: externalClassName = '',
    'data-testid': dataTestId,
    id,
    label,
    hideLabel = false,
    error,
    disabled,
    compact = false,
    onChange,
    options,
    ...props
}: SelectInputInternalProps<string>) => {


    return <div className={`z-input-wrapper z-select-wrapper ${externalClassName}`}
                data-testid={dataTestId}
    >
        {
            hideLabel ? null : <label className='z-input-label' htmlFor={id}>{label}</label>
        }
        <div className='z-input-container'>
            <select className='z-input z-select' {...props} id={id} disabled={disabled}>
                {
                    options.map(option => (
                        <option key={option.value}
                                value={option.value}
                                selected={option.default}>
                            {option.display}
                        </option>)
                    )
                }
            </select>
            <ChevronDownIcon className='z-select-arrow'/>
        </div>
        {
            error ? <span className='z-input-error'>{error}</span> : null
        }
    </div>
}

const ZoriaSelectInput = ({
    className: externalClassName = '',
    'data-testid': dataTestId,
    id,
    label,
    hideLabel = false,
    error,
    disabled,
    compact = false,
    onChange,
    options,
    ...props
}: SelectInputInternalProps<any>) => {
    const popoverRef = useRef<PopoverHandle>(null);
    const containerRef = useRef<HTMLDivElement>(null);


    const onSelected = (event, option: SelectOption) => {
        console.log(option)
    }

    useEffect(() => {
        console.log(containerRef.current)
        console.log(containerRef.current?.clientWidth)
    }, []);

    return <div className={`z-input-wrapper z-select-wrapper ${externalClassName}`}
                data-testid={dataTestId}
    >
        {
            hideLabel ? null : <label className='z-input-label' htmlFor={id}>{label}</label>
        }
        <Popover ref={popoverRef}>
            <Popover.Trigger>
                <div className='z-input-container' ref={containerRef}>
                    <div className='z-input z-select z-select-custom'>
                        <input type='hidden' {...props} id={id} disabled={disabled}/>
                        <button>{'selected value'}</button>
                        <ChevronDownIcon/>
                    </div>
                </div>
            </Popover.Trigger>
            {/* TODO remove shadow top */}
            <Popover.Body offset={0} padding='none'>
                <ul className='z-options-box' style={{width: `${containerRef!.current?.clientWidth}px`}}>
                    {
                        options.map(option => (
                            <li key={option.value} onClick={(event) => onSelected(event, option)}>
                                {option.display}
                            </li>)
                        )
                    }
                </ul>
            </Popover.Body>
        </Popover>
        {
            error ? <span className='z-input-error'>{error}</span> : null
        }
    </div>
}


type SelectInputProps = |
    ({ native: true } & SelectInputInternalProps<string>) |
    ({ native: false } & SelectInputInternalProps<any>) |
    SelectInputInternalProps<any>;

const SelectInput = ({native = false, id, 'data-testid': dataTestId, ...props}: SelectInputProps) => {
    if (!id) {
        id = `input-${CryptoUtils.UUID()}`
    }

    if (!dataTestId) {
        dataTestId = `${id}-testId`
    }

    if (native) {
        return <NativeSelectInput id={id} data-testid={dataTestId} {...props} />
    } else {
        return <ZoriaSelectInput {...props} />
    }
}

export {SelectInput}