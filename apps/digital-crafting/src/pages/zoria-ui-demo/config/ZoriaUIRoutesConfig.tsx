import {ZoriaUIRoutePathsEnum, ZoriaUISubroutesPathsEnum} from "./ZoriaUIRoutesTypes.ts";
import type {RouteObject} from "react-router-dom";

export const ZoriaUIRoutesConfig: RouteObject[] = [
    {
        path: `about`,
        index: true,
        lazy: async () => {
            const {ZoriaUiReactAbout} = await import('../components/ZoriaUiReactAbout.tsx');
            return {element: <ZoriaUiReactAbout/>};
        },
    },
    {
        path: `${ZoriaUIRoutePathsEnum.TYPOGRAPHY}`,
        children: [
            {
                path: `${ZoriaUISubroutesPathsEnum.TEXT}`,
                lazy: async () => {
                    const {TextDocs} = await import('../components/typography/TextDocs');
                    return {element: <TextDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.HEADERS}`,
                lazy: async () => {
                    const {HeadersDocs} = await import('../components/typography/HeadersDocs');
                    return {element: <HeadersDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.ICONS}`,
                lazy: async () => {
                    const {IconsDocs} = await import('../components/typography/IconsDocs');
                    return {element: <IconsDocs/>}
                }
            }
        ]
    },
    {
        path: `${ZoriaUIRoutePathsEnum.BUTTONS}`,
        children: [
            {
                path: `${ZoriaUISubroutesPathsEnum.BUTTON}`,
                lazy: async () => {
                    const {ButtonDocs} = await import('../components/buttons/ButtonDocs.tsx');
                    return {element: <ButtonDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.ICON_BUTTON}`,
                lazy: async () => {
                    const {IconButtonDocs} = await import('../components/buttons/IconButtonDocs.tsx');
                    return {element: <IconButtonDocs/>}
                }
            }
        ]
    }, {
        path: `${ZoriaUIRoutePathsEnum.INPUTS}`,
        children: [
            {
                path: `${ZoriaUISubroutesPathsEnum.INPUT}`,
                lazy: async () => {
                    const {InputDocs} = await import('../components/inputs/InputDocs');
                    return {element: <InputDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.TEXT_INPUT}`,
                lazy: async () => {
                    const {TextInputDocs} = await import('../components/inputs/TextInputDocs');
                    return {element: <TextInputDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.TEXTAREA_INPUT}`,
                lazy: async () => {
                    const {TextareaInputDocs} = await import('../components/inputs/TextareaInputDocs');
                    return {element: <TextareaInputDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.NUMBER_INPUT}`,
                lazy: async () => {
                    const {NumberInputDocs} = await import('../components/inputs/NumberInputDocs');
                    return {element: <NumberInputDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.SELECT_INPUT}`,
                lazy: async () => {
                    const {SelectInputDocs} = await import('../components/inputs/SelectInputDocs');
                    return {element: <SelectInputDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.AUTOCOMPLETE_INPUT}`,
                lazy: async () => {
                    const {AutocompleteInputDocs} = await import('../components/inputs/AutocompleteInputDocs');
                    return {element: <AutocompleteInputDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.EMAIL_INPUT}`,
                lazy: async () => {
                    const {EmailInputDocs} = await import('../components/inputs/EmailInputDocs');
                    return {element: <EmailInputDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.PASSWORD_INPUT}`,
                lazy: async () => {
                    const {PasswordInputDocs} = await import('../components/inputs/PasswordInputDocs');
                    return {element: <PasswordInputDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.DATE_PICKER_INPUT}`,
                lazy: async () => {
                    const {DatePickerInputDocs} = await import('../components/inputs/DatePickerInputDocs');
                    return {element: <DatePickerInputDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.TIME_PICKER_INPUT}`,
                lazy: async () => {
                    const {TimePickerInputDocs} = await import('../components/inputs/TimePickerInputDocs');
                    return {element: <TimePickerInputDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.DATE_TIME_PICKER_INPUT}`,
                lazy: async () => {
                    const {DateTimePickerInputDocs} = await import('../components/inputs/DateTimePickerInputDocs');
                    return {element: <DateTimePickerInputDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.CALENDAR}`,
                lazy: async () => {
                    const {CalendarDocs} = await import('../components/inputs/CalendarDocs');
                    return {element: <CalendarDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.CHECKBOX}`,
                lazy: async () => {
                    const {CheckboxDocs} = await import('../components/inputs/CheckboxDocs');
                    return {element: <CheckboxDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.TOGGLE}`,
                lazy: async () => {
                    const {ToggleDocs} = await import('../components/inputs/ToggleDocs');
                    return {element: <ToggleDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.RADIO_GROUP}`,
                lazy: async () => {
                    const {RadioGroupDocs} = await import('../components/inputs/RadioGroupDocs');
                    return {element: <RadioGroupDocs/>}
                }
            },
        ]
    }, {
        path: `${ZoriaUIRoutePathsEnum.DISPLAY}`,
        children: [
            {
                path: `${ZoriaUISubroutesPathsEnum.CHIP}`,
                lazy: async () => {
                    const {ChipDocs} = await import('../components/display/ChipDocs');
                    return {element: <ChipDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.SPINNER}`,
                lazy: async () => {
                    const {SpinnerDocs} = await import('../components/display/SpinnerDocs');
                    return {element: <SpinnerDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.TABLE}`,
                lazy: async () => {
                    const {TableDocs} = await import('../components/display/TableDocs');
                    return {element: <TableDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.TABS}`,
                lazy: async () => {
                    const {TabsDocs} = await import('../components/display/TabsDocs');
                    return {element: <TabsDocs/>};
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.TOOLTIP}`,
                lazy: async () => {
                    const {TooltipDocs} = await import('../components/display/TooltipDocs');
                    return {element: <TooltipDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.POPOVER}`,
                lazy: async () => {
                    const {PopoverDocs} = await import('../components/display/PopoverDocs');
                    return {element: <PopoverDocs/>}
                }
            },
            {
                path: `${ZoriaUISubroutesPathsEnum.MODAL}`,
                lazy: async () => {
                    const {ModalDocs} = await import('../components/display/ModalDocs');
                    return {element: <ModalDocs/>}
                }
            },
        ]
    },
    {
        path: 'forms',
        children: [
            {
                path: `about`,
                index: true,
                lazy: async () => {
                    const {ZoriaUiFormsAbout} = await import('../forms/ZoriaUiFormsAbout');
                    return {element: <ZoriaUiFormsAbout/>};
                },
            },
            {
                path: 'demo',
                lazy: async () => {
                    const {FormsDocs} = await import('../forms/FormsDocs.tsx')
                    return {element: <FormsDocs/>}
                }
            }
        ]
    }
]