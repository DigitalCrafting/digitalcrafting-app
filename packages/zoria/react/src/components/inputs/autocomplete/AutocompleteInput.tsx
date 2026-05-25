import * as React from 'react';
import {type ChangeEvent, useEffect, useRef, useState} from 'react';
import {SearchIcon, XIcon} from "../../icons/Icons";
import {Card} from "../../card/Card";
import {IconButton} from "../../buttons/IconButton";
import {createPortal} from "react-dom";
import {useFloatingUiPositioning} from "../../../hooks/useFloatingUiPositioning";
import {Text} from "../../typography/Typography";
import {type AutocompleteDropdownOption} from "./AutocompleteTypes";
import {SpinnerCircle} from "../../spinner/Spinner";

interface AutocompleteDropdownProps {
    width: number;
    options: AutocompleteDropdownOption[];
    currentlySelected?: AutocompleteDropdownOption;
    currentlyFocusedIdx: number;
    noResultsMessage: string;
    onOptionSelected: (event: React.MouseEvent | MouseEvent | React.KeyboardEvent | KeyboardEvent, option: AutocompleteDropdownOption<any, any>) => void;
    isLoading: boolean
}

const AutocompleteDropdown = ({
    width,
    options,
    currentlySelected,
    currentlyFocusedIdx,
    noResultsMessage,
    onOptionSelected,
    isLoading
}: AutocompleteDropdownProps) => {

    if (isLoading) {
        return <Card className='flex align-items-center justify-center' style={width ? {minWidth: width} : {}}>
            <SpinnerCircle size='sm'/>
        </Card>
    }

    if (!options?.length) {
        return <Card className='align-items-center justify-center' style={width ? {minWidth: width} : {}}>
            <Text>{noResultsMessage}</Text>
        </Card>
    }

    return <Card padding='none' shadow='lg'>
        <ul className='z-options-box'
            style={width ? {minWidth: width} : {}}
            aria-autocomplete='list'
            tabIndex={-1}
        >
            {
                options.map((option, idx) => {
                    const isSelected = option.value === currentlySelected?.value;
                    const isFocused = idx === currentlyFocusedIdx;

                    return <li
                        id={`z-opt-${idx}`}
                        tabIndex={-1}
                        className={`${isSelected ? 'is-selected' : ''} ${isFocused ? 'is-focused' : ''}`}
                        aria-selected={isSelected}
                        key={option.value}
                        onClick={(event) => onOptionSelected(event, option)}
                        data-value={option.value}
                    >
                        {option.display}
                    </li>
                    }
                )
            }
        </ul>
    </Card>
}

interface AutocompleteInputProps<T = unknown> {
    className?: string,
    'data-testid'?: string,
    label?: string,
    hideLabel?: boolean,
    error?: string,
    id?: string,
    disabled?: boolean,
    value?: T,
    valueDecoration?: string,
    onChange?: (value?: any) => void,

    onQueryChange?: (value: string) => void
    options?: AutocompleteDropdownOption[],
    queryOptions?: (query: string) => Promise<AutocompleteDropdownOption[]>,
    debounceMS?: number,
    noResultsMessage?: string,
}

const AutocompleteInput = ({
    className: externalClassName = '',
    'data-testid': dataTestId,
    id,
    label,
    error,
    disabled,
    value = undefined,
    onChange,
    onQueryChange,
    options: externalOptions = [],
    queryOptions,
    debounceMS = 200,
    noResultsMessage = 'No results'
}: AutocompleteInputProps) => {
    const [options, setOptions] = useState<AutocompleteDropdownOption[]>(externalOptions || []);
    const [currentlySelected, setCurrentlySelected] = useState<AutocompleteDropdownOption<any, any> | undefined>(options?.find(option => option.value === value));
    const [width, setWidth] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
    const [currentlyFocusedIdx, setCurrentlyFocusedIdx] = useState(-1);
    const [inputValue, setInputValue] = useState<string>('');

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<number | undefined>(undefined);

    useFloatingUiPositioning(containerRef, popoverRef, 'bottom');

    const onKeyDown = (event: React.KeyboardEvent | KeyboardEvent) => {
        if (event.key === 'ArrowDown') {
            event.stopPropagation();
            event.preventDefault();

            if (!isDropDownOpen) {
                setIsDropDownOpen(true);
                return;
            } else {
                // move focus
                if (options && currentlyFocusedIdx < options?.length - 1) {
                    setCurrentlyFocusedIdx(prev => ++prev);
                }
                return;
            }
        }

        if (event.key === 'ArrowUp') {
            event.stopPropagation();
            event.preventDefault();

            if (isDropDownOpen) {
                if (currentlyFocusedIdx <= 0) {
                    setCurrentlyFocusedIdx(-1);
                    setIsDropDownOpen(false);
                } else {
                    setCurrentlyFocusedIdx(prev => --prev);
                }
                return;
            }
        }

        if (event.key === 'Esc') {
            event.stopPropagation();
            event.preventDefault();

            setIsDropDownOpen(false);
            return;
        }

        if (event.key === 'Enter') {
            if (isDropDownOpen) {
                event.stopPropagation();
                event.preventDefault();

                if (currentlyFocusedIdx >= 0) {
                    onOptionSelected(event, options![currentlyFocusedIdx]);
                }
            }
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        event.stopPropagation();
        event.preventDefault();
        if (onQueryChange) {
            onQueryChange(value);
            return;
        }

        setInputValue(value);

        if (externalOptions && externalOptions.length) {
            if (!value) {
                setOptions(externalOptions);
                setIsDropDownOpen(true);
            } else {
                const visibleOptions = externalOptions.filter((option) => option.searchValue.indexOf(value) != -1);
                setOptions(visibleOptions);
                setIsDropDownOpen(true);
            }

        } else {
            clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                setIsDropDownOpen(true);
                setIsLoading(true)
                queryOptions?.(value).then((newOptions) => {
                    setOptions(newOptions);
                    const currentFocus = newOptions.findIndex((el) => el.value === currentlySelected?.value);
                    currentFocus < 0 ? setCurrentlyFocusedIdx(0) : setCurrentlyFocusedIdx(currentFocus);
                    setIsLoading(false);
                    setIsDropDownOpen(true);
                }).finally(() => {
                    setIsLoading(false);
                })
            }, debounceMS);
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
    const visibilityClassName = isDropDownOpen ? 'z-autocomplete-visible' : 'z-autocomplete-hidden';

    const onOptionSelected = (event: React.MouseEvent | MouseEvent | React.KeyboardEvent | KeyboardEvent, option: AutocompleteDropdownOption<any, any>) => {
        event.preventDefault();
        event.stopPropagation();
        setCurrentlySelected(option);
        const currentFocus = options.findIndex((el) => el.value === option?.value);
        currentFocus < 0 ? setCurrentlyFocusedIdx(0) : setCurrentlyFocusedIdx(currentFocus);
        setInputValue(option.value);
        setIsDropDownOpen(false);
        onChange?.(option.value);
    }

    const clear = () => {
        setInputValue('');
        setOptions(externalOptions);
        if (!externalOptions.length) {
            setIsDropDownOpen(false);
        }
        setCurrentlySelected(undefined);
        setCurrentlyFocusedIdx(-1);
        onChange?.(undefined);
    }

    return (<>
        <div className={`z-input-wrapper ${additionalClassName}`}
             data-testid={dataTestId}
        >
            {
                label ? <label className='z-input-label' htmlFor={id}>{label}</label> : null
            }
            <div ref={containerRef} className='z-input-container'>
                <input className='z-input' ref={inputRef} id={id} disabled={disabled}
                       onChange={handleInputChange}
                       onKeyDown={onKeyDown}
                       value={inputValue}
                       onClick={() => setIsDropDownOpen(true)}
                       onBlur={() => setIsDropDownOpen(false)}
                       type='text'
                       role='combobox'
                       aria-activedescendant={currentlyFocusedIdx >= 0 && options?.[currentlyFocusedIdx]
                           ? `z-opt-${currentlyFocusedIdx}`
                           : undefined}
                />
                {
                    inputValue?.length ?
                        <IconButton><XIcon onClick={() => clear()}/></IconButton> : <SearchIcon/>
                }
            </div>
            {
                error ? <span className='z-input-error'>{error}</span> : null
            }
        </div>
        {createPortal(
            <div ref={popoverRef}
                 role="dialog"
                 className={`z-autocomplete z-autocomplete-body ${visibilityClassName}`}
                 data-z-popover
                 aria-expanded={isDropDownOpen}
                 onMouseDown={event => event.preventDefault()}
            >
                <AutocompleteDropdown width={width} options={options} currentlySelected={currentlySelected}
                                      currentlyFocusedIdx={currentlyFocusedIdx}
                                      noResultsMessage={noResultsMessage} onOptionSelected={onOptionSelected}
                                      isLoading={isLoading}/>
            </div>,
            document.body
        )}
    </>)
}


export {AutocompleteInput};
export type {AutocompleteInputProps};