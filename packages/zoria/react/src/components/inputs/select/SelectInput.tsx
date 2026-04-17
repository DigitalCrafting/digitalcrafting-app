import {CryptoUtils} from "../../../utils/Utils";
import React, {type RefObject, useEffect, useRef, useState} from "react";
import {Popover, type PopoverHandle} from "../../popover/Popover";
import {ChevronDownIcon} from "../../icons/Icons";
import {SelectDropdownController} from "./SelectDropdownController";

export interface NativeSelectOption {
    value: string
    display: string
}

/* TODO remove generic ? */
export interface ZoriaSelectOption<T = string, D = string> {
    value: T
    display: D
    searchValue: string
}

interface SelectInputInternalProps<T = string> {
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
    valueDecoration?: string
    onChange?: (value: any) => void,
}

type NativeSelectInputProps = SelectInputInternalProps & {native: true, options: NativeSelectOption[]}

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
    native,
    options,
    ...props
}: NativeSelectInputProps) => {

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
            <select className='z-input z-select' value={value} {...props} onChange={internalOnChange} id={id}
                    disabled={disabled}>
                {
                    options.map(option => (
                        <option key={option.value}
                                value={option.value}
                        >
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

interface ZoriaSelectDropdownProps {
    currentlySelected: any;
    options: ZoriaSelectOption<any, any>[];
    width: number;
    onSelected: (option: ZoriaSelectOption<any, any>) => void;
    sentinelRef: RefObject<HTMLButtonElement | null>;
    close: () => void
}

const ZoriaSelectDropdown = ({
    currentlySelected,
    options,
    width,
    onSelected,
    sentinelRef,
    close
}: ZoriaSelectDropdownProps) => {
    const dropdownRef = useRef<HTMLUListElement>(null);

    const onOptionSelected = (event: React.MouseEvent | MouseEvent, option: ZoriaSelectOption<any, any>) => {
        event.preventDefault();
        event.stopPropagation();
        onSelected(option);
    }

    useEffect(() => {
        const selectController = SelectDropdownController.for(dropdownRef)
            .withFocusSentinel(sentinelRef)
            .withCloseCallback(close)
            .control();

        return () => {
            selectController.release();
        }
    }, []);

    return <ul className='z-options-box'
               style={{minWidth: width}}
               aria-autocomplete='list'
               ref={dropdownRef}
    >
        {
            options.map(option => (
                <li
                    tabIndex={-1}
                    className={option.value === currentlySelected?.value ? 'is-selected' : ''}
                    aria-selected={option.value === currentlySelected?.value}
                    key={option.value}
                    onClick={(event) => onOptionSelected(event, option)}
                >
                    {option.display}
                </li>)
            )
        }
    </ul>
}

type ZoriaSelectInputProps<T = any> = SelectInputInternalProps<T> & {native?: false, options: ZoriaSelectOption<any, any>[]}

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
    valueDecoration = '',
    onChange,
    options,
    ...props
}: ZoriaSelectInputProps) => {
    const [currentlySelected, setCurrentlySelected] = useState<ZoriaSelectOption<any, any> | undefined>(options.find(option => option.value === value));
    const [width, setWidth] = useState(0);
    const popoverRef = useRef<PopoverHandle>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLButtonElement>(null);

    const onSelected = (option: ZoriaSelectOption<any, any>) => {
        setCurrentlySelected(option);
        onChange?.(option.value);
        popoverRef?.current?.close();
    }

    const onKeyDown = (event: React.KeyboardEvent | KeyboardEvent) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            event.stopPropagation();
            (event.target as HTMLElement).click();
        }
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
                        <input tabIndex={-1} type='hidden' {...props} id={id} disabled={disabled}/>
                        <button onKeyDown={onKeyDown} ref={sentinelRef}>{valueDecoration} {currentlySelected?.display}</button>
                        <ChevronDownIcon tabIndex={-1}/>
                    </div>
                </div>
            </Popover.Trigger>
            <Popover.Body offset={0} padding='none' disableEscape>
                <ZoriaSelectDropdown currentlySelected={currentlySelected}
                                     options={options}
                                     width={width}
                                     onSelected={onSelected}
                                     sentinelRef={sentinelRef}
                                     close={() => popoverRef.current?.close()}
                />
            </Popover.Body>
        </Popover>
        {
            error ? <span className='z-input-error'>{error}</span> : null
        }
    </div>
}


type SelectInputProps = ZoriaSelectInputProps | NativeSelectInputProps;

const SelectInput = (allProps: SelectInputProps) => {
    const id = allProps.id || `input-${CryptoUtils.UUID()}`;
    const dataTestId = allProps['data-testid'] || `${id}-testId`;

    if (allProps.native === true) {
        return <NativeSelectInput id={id} data-testid={dataTestId} {...allProps} />
    } else {
        return <ZoriaSelectInput {...allProps} />
    }
}

export {SelectInput}