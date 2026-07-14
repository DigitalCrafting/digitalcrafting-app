import {ZoriaUIRoutePathsEnum, ZoriaUISubroutesPathsEnum} from "./ZoriaUIRoutesTypes.ts";
import {redirect, type RouteObject} from "react-router-dom";
import {TextDocs} from "../react/typography/TextDocs.tsx";
import {ZoriaUiReactAbout} from "../react/ZoriaUiReactAbout.tsx";
import {ModalDocs} from "../react/display/ModalDocs.tsx";
import {PopoverDocs} from "../react/display/PopoverDocs.tsx";
import {TooltipDocs} from "../react/display/TooltipDocs.tsx";
import {TabsDocs} from "../react/display/TabsDocs.tsx";
import {TableDocs} from "../react/display/TableDocs.tsx";
import {SpinnerDocs} from "../react/display/SpinnerDocs.tsx";
import {ChipDocs} from "../react/display/ChipDocs.tsx";
import {RadioGroupDocs} from "../react/inputs/RadioGroupDocs.tsx";
import {ToggleDocs} from "../react/inputs/ToggleDocs.tsx";
import {CheckboxDocs} from "../react/inputs/CheckboxDocs.tsx";
import {CalendarDocs} from "../react/inputs/CalendarDocs.tsx";
import {DateTimePickerInputDocs} from "../react/inputs/DateTimePickerInputDocs.tsx";
import {TimePickerInputDocs} from "../react/inputs/TimePickerInputDocs.tsx";
import {DatePickerInputDocs} from "../react/inputs/DatePickerInputDocs.tsx";
import {PasswordInputDocs} from "../react/inputs/PasswordInputDocs.tsx";
import {EmailInputDocs} from "../react/inputs/EmailInputDocs.tsx";
import {AutocompleteInputDocs} from "../react/inputs/AutocompleteInputDocs.tsx";
import {SelectInputDocs} from "../react/inputs/SelectInputDocs.tsx";
import {NumberInputDocs} from "../react/inputs/NumberInputDocs.tsx";
import {TextareaInputDocs} from "../react/inputs/TextareaInputDocs.tsx";
import {TextInputDocs} from "../react/inputs/TextInputDocs.tsx";
import {InputDocs} from "../react/inputs/InputDocs.tsx";
import {IconButtonDocs} from "../react/buttons/IconButtonDocs.tsx";
import {ButtonDocs} from "../react/buttons/ButtonDocs.tsx";
import {IconsDocs} from "../react/typography/IconsDocs.tsx";
import {HeadersDocs} from "../react/typography/HeadersDocs.tsx";
import {FormsDocs} from "../forms/FormsDocs.tsx";
import {ZoriaUiFormsAbout} from "../forms/ZoriaUiFormsAbout.tsx";
import {ZoriaUiAbout} from "../ZoriaUiAbout.tsx";
import {ZoriaUiEventsAbout} from "../events/ZoriaUiEventsAbout.tsx";
import {EventEmitterDocs} from "../events/EventEmitterDocs.tsx";
import {ListsDocs} from "../react/typography/ListsDocs.tsx";
import {FlexDocs} from "../react/layout/FlexDocs.tsx";
import {GridDocs} from "../react/layout/grid/GridDocs.tsx";
import {SpacingDocs} from "../react/layout/SpacingDocs.tsx";

export const ZoriaUIRoutesConfig: RouteObject[] = [
    {
        path: '',
        index: true,
        Component: ZoriaUiAbout
    },
    {
        path: 'react',
        children: [
            {
                path: ``,
                index: true,
                loader: () => redirect('/zoria/react/about')
            },
            {
                path: `about`,
                Component: ZoriaUiReactAbout
            },
            {
                path: `${ZoriaUIRoutePathsEnum.LAYOUT}`,
                children: [
                    {
                        path: `${ZoriaUISubroutesPathsEnum.FLEX}`,
                        Component: FlexDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.GRID}`,
                        Component: GridDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.SPACING}`,
                        Component: SpacingDocs
                    },
                ]
            },
            {
                path: `${ZoriaUIRoutePathsEnum.TYPOGRAPHY}`,
                children: [
                    {
                        path: `${ZoriaUISubroutesPathsEnum.TEXT}`,
                        Component: TextDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.HEADERS}`,
                        Component: HeadersDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.ICONS}`,
                        Component: IconsDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.LISTS}`,
                        Component: ListsDocs
                    }
                ]
            },
            {
                path: `${ZoriaUIRoutePathsEnum.BUTTONS}`,
                children: [
                    {
                        path: `${ZoriaUISubroutesPathsEnum.BUTTON}`,
                        Component: ButtonDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.ICON_BUTTON}`,
                        Component: IconButtonDocs
                    }
                ]
            }, {
                path: `${ZoriaUIRoutePathsEnum.INPUTS}`,
                children: [
                    {
                        path: `${ZoriaUISubroutesPathsEnum.INPUT}`,
                        Component: InputDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.TEXT_INPUT}`,
                        Component: TextInputDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.TEXTAREA_INPUT}`,
                        Component: TextareaInputDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.NUMBER_INPUT}`,
                        Component: NumberInputDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.SELECT_INPUT}`,
                        Component: SelectInputDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.AUTOCOMPLETE_INPUT}`,
                        Component: AutocompleteInputDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.EMAIL_INPUT}`,
                        Component: EmailInputDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.PASSWORD_INPUT}`,
                        Component: PasswordInputDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.DATE_PICKER_INPUT}`,
                        Component: DatePickerInputDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.TIME_PICKER_INPUT}`,
                        Component: TimePickerInputDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.DATE_TIME_PICKER_INPUT}`,
                        Component: DateTimePickerInputDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.CALENDAR}`,
                        Component: CalendarDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.CHECKBOX}`,
                        Component: CheckboxDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.TOGGLE}`,
                        Component: ToggleDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.RADIO_GROUP}`,
                        Component: RadioGroupDocs
                    },
                ]
            }, {
                path: `${ZoriaUIRoutePathsEnum.DISPLAY}`,
                children: [
                    {
                        path: `${ZoriaUISubroutesPathsEnum.CHIP}`,
                        Component: ChipDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.SPINNER}`,
                        Component: SpinnerDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.TABLE}`,
                        Component: TableDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.TABS}`,
                        Component: TabsDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.TOOLTIP}`,
                        Component: TooltipDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.POPOVER}`,
                        Component: PopoverDocs
                    },
                    {
                        path: `${ZoriaUISubroutesPathsEnum.MODAL}`,
                        Component: ModalDocs
                    },
                ]
            }
        ]
    },
    {
        path: 'forms',
        children: [
            {
                path: '',
                index: true,
                loader: () => redirect('/zoria/forms/about')
            },
            {
                path: `about`,
                Component: ZoriaUiFormsAbout,
            },
            {
                path: 'demo',
                Component: FormsDocs
            }
        ]
    },
    {
        path: 'events',
        children: [
            {
                path: '',
                index: true,
                loader: () => redirect('/zoria/events/about')
            }, {
                path: 'about',
                Component: ZoriaUiEventsAbout
            },
            {
                path: 'event-emitter',
                Component: EventEmitterDocs
            }
        ]
    }
]