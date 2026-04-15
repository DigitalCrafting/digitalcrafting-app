import {CryptoUtils} from "../../utils/Utils";
import React, {useEffect, useRef, useState} from "react";
import {Popover, type PopoverHandle} from "../popover/Popover";
import {ChevronDownIcon} from "../icons/Icons";

export interface SelectOption<T = unknown> {
    value: T
    display: React.ReactNode
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
    value?: T
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
    value,
    onChange,
    options,
    ...props
}: SelectInputInternalProps<string>) => {

    const internalOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        onChange?.(value);
    };

    let additionalClassName = externalClassName;
    if (compact) {
        additionalClassName += ' z-select-compact';
    }

    return <div className={`z-input-wrapper z-select-wrapper ${additionalClassName}`.trim()}
                data-testid={dataTestId}
    >
        {
            hideLabel ? null : <label className='z-input-label' htmlFor={id}>{label}</label>
        }
        <div className='z-input-container'>
            <select className='z-input z-select' value={value} {...props} onChange={internalOnChange} id={id} disabled={disabled}>
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
    value = undefined,
    onChange,
    options,
    ...props
}: SelectInputInternalProps<any>) => {
    const [currentlySelected, setCurrentlySelected] = useState<SelectOption<any> | undefined>(options.find(option => option.value === value));
    const [width, setWidth] = useState(0);
    const popoverRef = useRef<PopoverHandle>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const onSelected = (event: React.MouseEvent | MouseEvent, option: SelectOption) => {
        event.stopPropagation();
        event.preventDefault();
        console.log(`========== SelectInput.onSelected`)
        setCurrentlySelected(option);
        onChange?.(option.value);
        popoverRef?.current?.close();
    }

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.getBoundingClientRect().width);
            }
        };

        window.addEventListener('resize', updateWidth);
        updateWidth();
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    let additionalClassName = externalClassName;
    if (compact) {
        additionalClassName += ' z-select-compact';
    }

    return <div className={`z-input-wrapper z-select-wrapper ${additionalClassName}`.trim()}
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
                        <button>{currentlySelected?.display}</button>
                        <ChevronDownIcon/>
                    </div>
                </div>
            </Popover.Trigger>
            <Popover.Body offset={0} padding='none'>
                <ul className='z-options-box' style={{minWidth: width}}>
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