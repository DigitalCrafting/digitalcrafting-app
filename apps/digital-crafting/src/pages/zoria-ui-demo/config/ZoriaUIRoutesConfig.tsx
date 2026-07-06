import {ZoriaUIRoutePathsEnum, ZoriaUISubroutesPathsEnum} from "./ZoriaUIRoutesTypes.ts";
import type {RouteObject} from "react-router-dom";
import {TextDocs} from "../components/typography/TextDocs.tsx";
import {ZoriaUiReactAbout} from "../components/ZoriaUiReactAbout.tsx";
import {ModalDocs} from "../components/display/ModalDocs.tsx";
import {PopoverDocs} from "../components/display/PopoverDocs.tsx";
import {TooltipDocs} from "../components/display/TooltipDocs.tsx";
import {TabsDocs} from "../components/display/TabsDocs.tsx";
import {TableDocs} from "../components/display/TableDocs.tsx";
import {SpinnerDocs} from "../components/display/SpinnerDocs.tsx";
import {ChipDocs} from "../components/display/ChipDocs.tsx";
import {RadioGroupDocs} from "../components/inputs/RadioGroupDocs.tsx";
import {ToggleDocs} from "../components/inputs/ToggleDocs.tsx";
import {CheckboxDocs} from "../components/inputs/CheckboxDocs.tsx";
import {CalendarDocs} from "../components/inputs/CalendarDocs.tsx";
import {DateTimePickerInputDocs} from "../components/inputs/DateTimePickerInputDocs.tsx";
import {TimePickerInputDocs} from "../components/inputs/TimePickerInputDocs.tsx";
import {DatePickerInputDocs} from "../components/inputs/DatePickerInputDocs.tsx";
import {PasswordInputDocs} from "../components/inputs/PasswordInputDocs.tsx";
import {EmailInputDocs} from "../components/inputs/EmailInputDocs.tsx";
import {AutocompleteInputDocs} from "../components/inputs/AutocompleteInputDocs.tsx";
import {SelectInputDocs} from "../components/inputs/SelectInputDocs.tsx";
import {NumberInputDocs} from "../components/inputs/NumberInputDocs.tsx";
import {TextareaInputDocs} from "../components/inputs/TextareaInputDocs.tsx";
import {TextInputDocs} from "../components/inputs/TextInputDocs.tsx";
import {InputDocs} from "../components/inputs/InputDocs.tsx";
import {IconButtonDocs} from "../components/buttons/IconButtonDocs.tsx";
import {ButtonDocs} from "../components/buttons/ButtonDocs.tsx";
import {IconsDocs} from "../components/typography/IconsDocs.tsx";
import {HeadersDocs} from "../components/typography/HeadersDocs.tsx";
import {FormsDocs} from "../forms/FormsDocs.tsx";
import {ZoriaUiFormsAbout} from "../forms/ZoriaUiFormsAbout.tsx";

export const ZoriaUIRoutesConfig: RouteObject[] = [
    {
        path: `about`,
        index: true,
        Component: ZoriaUiReactAbout
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
    },
    {
        path: 'forms',
        children: [
            {
                path: `about`,
                index: true,
                Component: ZoriaUiFormsAbout,
            },
            {
                path: 'demo',
                Component: FormsDocs
            }
        ]
    }
]