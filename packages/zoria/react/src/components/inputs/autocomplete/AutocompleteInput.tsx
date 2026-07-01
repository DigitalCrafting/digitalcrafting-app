import * as React from 'react';
import {
    type ChangeEvent, type Dispatch, type RefObject,
    type SetStateAction, useCallback, useEffect, useMemo, useRef, useState
} from 'react';
import {SearchIcon, XIcon} from "../../icons/Icons";
import {Card} from "../../card/Card";
import {IconButton} from "../../buttons/IconButton";
import {createPortal} from "react-dom";
import {useFloatingUiPositioning} from "../../../hooks/useFloatingUiPositioning";
import {Text} from "../../typography/Typography";
import {type AutocompleteDropdownOption} from "./AutocompleteTypes";
import {SpinnerCircle} from "../../spinner/Spinner";
import type {UniversalInteractionEvent} from "../../../types/CommonTypes";
import {useAutocompleteKeyHandler} from "./useAutocompleteKeyHandler";

interface AutocompleteDropdownProps {
    width: number;
    options: AutocompleteDropdownOption[];
    currentlySelected?: AutocompleteDropdownOption;
    currentlyFocusedIdx: number;
    noResultsMessage: string;
    onOptionSelected: (event: React.MouseEvent | MouseEvent | React.KeyboardEvent | KeyboardEvent, option: AutocompleteDropdownOption<any, any>) => void;
    isLoading?: boolean
}

const AutocompleteDropdown = ({
    width,
    options,
    currentlySelected,
    currentlyFocusedIdx,
    noResultsMessage,
    onOptionSelected,
    isLoading = false
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

interface BaseAutocompleteInputProps {
    className?: string;
    'data-testid'?: string;
    label?: string;
    error?: string;
    id?: string;
    disabled?: boolean;
    placeholder?: string;
    noResultsMessage?: string;
    isDropdownOpen: boolean;
    setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
    currentlyFocusedIdx: number;
    setCurrentlyFocusedIdx: Dispatch<SetStateAction<number>>;
    options: AutocompleteDropdownOption[];
    onOptionSelected: (event: UniversalInteractionEvent, option: AutocompleteDropdownOption<any, any>) => void;
    isLoading?: boolean;
    currentlySelected: AutocompleteDropdownOption<any, any> | undefined;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    inputRef: RefObject<HTMLInputElement | null>;
    clear: () => void;
    inputValue: string;
}

const BaseAutocompleteInput = ({
    className: externalClassName = '',
    'data-testid': dataTestId = 'qa-static-autocomplete',
    id,
    label,
    error,
    disabled,
    placeholder,
    noResultsMessage = 'No results',
    isDropdownOpen,
    setIsDropdownOpen,
    currentlyFocusedIdx,
    setCurrentlyFocusedIdx,
    options,
    onOptionSelected,
    isLoading,
    currentlySelected,
    handleInputChange,
    inputRef,
    clear,
    inputValue
}: BaseAutocompleteInputProps) => {
    const [width, setWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const onKeyDown = useAutocompleteKeyHandler(
        isDropdownOpen,
        setIsDropdownOpen,
        currentlyFocusedIdx,
        setCurrentlyFocusedIdx,
        options,
        onOptionSelected
    )

    useFloatingUiPositioning(containerRef, popoverRef, 'bottom');

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

    const additionalClassName = externalClassName;
    const visibilityClassName = isDropdownOpen ? 'z-autocomplete-visible' : 'z-autocomplete-hidden';

    return <>
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
                       onClick={() => setIsDropdownOpen(true)}
                       onBlur={() => setIsDropdownOpen(false)}
                       type='text'
                       role='combobox'
                       placeholder={placeholder}
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
                 aria-expanded={isDropdownOpen}
                 onMouseDown={event => event.preventDefault()}
            >
                <AutocompleteDropdown width={width} options={options} currentlySelected={currentlySelected}
                                      currentlyFocusedIdx={currentlyFocusedIdx}
                                      isLoading={isLoading}
                                      noResultsMessage={noResultsMessage} onOptionSelected={onOptionSelected}/>
            </div>,
            document.body
        )}
    </>
}

interface CommonAutocompleteInputProps<T = unknown> {
    className?: string;
    'data-testid'?: string;
    label?: string;
    hideLabel?: boolean;
    error?: string;
    id?: string;
    disabled?: boolean;
    defaultValue?: T;
    valueDecoration?: string;
    onChange?: (value?: any) => void;
    placeholder?: string;
    noResultsMessage?: string;

    // controlled
    value?: T;
    controlled?: boolean;
}

interface StaticAutocompleteInputProps<T = unknown> extends CommonAutocompleteInputProps<T> {
    options?: AutocompleteDropdownOption[];
}

const StaticAutocompleteInput = ({
    value = undefined,
    defaultValue = undefined,
    controlled = false,
    onChange,
    options: externalOptions = undefined,
    ...baseProps
}: StaticAutocompleteInputProps) => {
    const [options, setOptions] = useState<AutocompleteDropdownOption[]>(externalOptions || []);
    const defaultSelectedValue = useMemo(() => {
        if (defaultValue) {
            return options?.find(option => option.value === defaultValue);
        }
        return undefined;
    }, [])

    const [internalCurrentlySelected, setCurrentlySelected] = useState<AutocompleteDropdownOption<any, any> | undefined>(defaultSelectedValue);

    let currentlySelected: AutocompleteDropdownOption<any, any> | undefined = undefined;
    if (controlled) {
        currentlySelected = useMemo(() => {
            if (value) {
                return options?.find(option => option.value === value);
            }
            return undefined;
        }, [value, options]);
    } else {
        currentlySelected = internalCurrentlySelected;
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [currentlyFocusedIdx, setCurrentlyFocusedIdx] = useState(-1);
    const [inputValue, setInputValue] = useState<string>('');

     const inputRef = useRef<HTMLInputElement>(null);

    const queryStaticOptions = useCallback((searchValue?: string, options: AutocompleteDropdownOption[] = []) => {
        if (!searchValue) {
            setOptions(options);
        } else {
            const visibleOptions = options.filter((option) => option.searchValue.indexOf(searchValue) != -1);
            setOptions(visibleOptions);
        }
    }, [])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        event.stopPropagation();
        event.preventDefault();
        setInputValue(value);

        if (externalOptions != undefined) {
            queryStaticOptions(value, externalOptions);
            setIsDropdownOpen(true);
        } else {
            throw new Error("[AutocompleteInput]: Incorrect properties")
        }
    }

    useEffect(() => {
        queryStaticOptions(inputRef?.current?.value, externalOptions);
    }, [externalOptions])


    const onOptionSelected = (event: UniversalInteractionEvent, option: AutocompleteDropdownOption<any, any>) => {
        event.preventDefault();
        event.stopPropagation();
        setCurrentlySelected(option);
        const currentFocus = options.findIndex((el) => el.value === option?.value);
        currentFocus < 0 ? setCurrentlyFocusedIdx(0) : setCurrentlyFocusedIdx(currentFocus);
        setInputValue(option.display);
        setIsDropdownOpen(false);
        onChange?.(option.value);
    }

    const clear = () => {
        setInputValue('');
        setOptions(externalOptions || []);
        if (!externalOptions?.length) {
            setIsDropdownOpen(false);
        }
        setCurrentlySelected(undefined);
        setCurrentlyFocusedIdx(-1);
        onChange?.(undefined);
    }

    return <BaseAutocompleteInput
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        currentlyFocusedIdx={currentlyFocusedIdx}
        setCurrentlyFocusedIdx={setCurrentlyFocusedIdx}
        options={options}
        onOptionSelected={onOptionSelected}
        inputRef={inputRef}
        inputValue={inputValue}
        currentlySelected={currentlySelected}
        clear={clear}
        handleInputChange={handleInputChange}
        {...baseProps}/>
}

interface DynamicAutocompleteInputProps<T = unknown> extends CommonAutocompleteInputProps<T> {
    onQueryChange?: (value: string) => void;
    queryOptions?: (query: string) => Promise<AutocompleteDropdownOption[]>;
    debounceMS?: number;
}

const DynamicAutocompleteInput = ({
    value = undefined,
    defaultValue = undefined,
    controlled = false,
    onChange,
    onQueryChange,
    queryOptions = undefined,
    debounceMS = 200,
    ...baseProps
}: DynamicAutocompleteInputProps) => {
    const [options, setOptions] = useState<AutocompleteDropdownOption[]>([]);
    const defaultSelectedValue = useMemo(() => {
        if (defaultValue) {
            return options?.find(option => option.value === defaultValue);
        }
        return undefined;
    }, [])

    const [internalCurrentlySelected, setCurrentlySelected] = useState<AutocompleteDropdownOption<any, any> | undefined>(defaultSelectedValue);

    let currentlySelected: AutocompleteDropdownOption<any, any> | undefined = undefined;
    if (controlled) {
        currentlySelected = useMemo(() => {
            if (value) {
                return options?.find(option => option.value === value);
            }
            return undefined;
        }, [value, options]);
    } else {
        currentlySelected = internalCurrentlySelected;
    }

    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [currentlyFocusedIdx, setCurrentlyFocusedIdx] = useState(-1);
    const [inputValue, setInputValue] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const queryDynamicOptions = (value: string) => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setIsDropdownOpen(true);
            setIsLoading(true)
            queryOptions?.(value).then((newOptions) => {
                updateOptions(newOptions);
                setIsLoading(false);
                setIsDropdownOpen(true);
            }).finally(() => {
                setIsLoading(false);
            })
        }, debounceMS);
    }

    const updateOptions = (newOptions: AutocompleteDropdownOption[]) => {
        setOptions(newOptions);
        const currentFocus = newOptions.findIndex((el) => el.value === currentlySelected?.value);
        currentFocus < 0 ? setCurrentlyFocusedIdx(0) : setCurrentlyFocusedIdx(currentFocus);
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

        if (queryOptions != undefined) {
            queryDynamicOptions(value);
        } else {
            throw new Error("[AutocompleteInput]: Incorrect properties")
        }
    }

    const onOptionSelected = (event: UniversalInteractionEvent, option: AutocompleteDropdownOption<any, any>) => {
        event.preventDefault();
        event.stopPropagation();
        setCurrentlySelected(option);
        const currentFocus = options.findIndex((el) => el.value === option?.value);
        currentFocus < 0 ? setCurrentlyFocusedIdx(0) : setCurrentlyFocusedIdx(currentFocus);
        setInputValue(option.display);
        setIsDropdownOpen(false);
        onChange?.(option.value);
    }

    const clear = () => {
        setInputValue('');
        setOptions([]);
        setIsDropdownOpen(false);
        setCurrentlySelected(undefined);
        setCurrentlyFocusedIdx(-1);
        onChange?.(undefined);
    }

     return <BaseAutocompleteInput
         isDropdownOpen={isDropdownOpen}
         setIsDropdownOpen={setIsDropdownOpen}
         currentlyFocusedIdx={currentlyFocusedIdx}
         setCurrentlyFocusedIdx={setCurrentlyFocusedIdx}
         options={options}
         onOptionSelected={onOptionSelected}
         inputRef={inputRef}
         inputValue={inputValue}
         currentlySelected={currentlySelected}
         clear={clear}
         handleInputChange={handleInputChange}
         isLoading={isLoading}
         {...baseProps}/>
}

type AutocompleteInputProps<T = unknown> = |
    { isStatic: true; } & StaticAutocompleteInputProps<T> |
    { isStatic?: false } & DynamicAutocompleteInputProps<T>;

const AutocompleteInput = ({
    isStatic = false,
    ...props
}: AutocompleteInputProps) => {
    if (isStatic) {
        return <StaticAutocompleteInput {...props} />
    } else {
        return <DynamicAutocompleteInput {...props} />
    }
}


export {AutocompleteInput};
export type {AutocompleteInputProps};