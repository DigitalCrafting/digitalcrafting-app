export const ZoriaUIRoutePathsEnum = {
    ABOUT: 'about',
    TYPOGRAPHY: 'typography',
    BUTTONS: 'buttons',
    INPUTS: 'inputs',
    DISPLAY: 'display',
} as const;
export type ZoriaUIRoutePathsEnum = (typeof ZoriaUIRoutePathsEnum)[keyof typeof ZoriaUIRoutePathsEnum];

export const ZoriaUISubroutesPathsEnum = {
    // Inputs
    AUTOCOMPLETE_INPUT: 'autocomplete',
    CALENDAR: 'calendar',
    CHECKBOX: 'checkbox',
    DATE_PICKER_INPUT: 'date-picker',
    DATE_TIME_PICKER_INPUT: 'date-time-picker',
    EMAIL_INPUT: 'email',
    INPUT: 'input',
    NUMBER_INPUT: 'number',
    PASSWORD_INPUT: 'password',
    RADIO_GROUP: 'radio-group',
    SELECT_INPUT: 'select',
    TEXTAREA_INPUT: 'textarea',
    TEXT_INPUT: 'text',
    TIME_PICKER_INPUT: 'time-picker',
    TOGGLE: 'toggle',

    // Display
    CHIP: 'chip',
    SPINNER: 'spinner',
    TABLE: 'table',
    TABS: 'tabs',
    TOOLTIP: 'tooltip',
    POPOVER: 'popover',
    MODAL: 'modal',

    // Typography
    TEXT: 'text',
    HEADERS: 'headers',
    ICONS: 'icons',
    LISTS: 'lists',

    // Buttons
    BUTTON: 'button',
    ICON_BUTTON: 'icon-button',
} as const;
export type ZoriaUISubroutesPathsEnum = (typeof ZoriaUISubroutesPathsEnum)[keyof typeof ZoriaUISubroutesPathsEnum];

export const ZoriaUIDocsRoutesList = [
    ZoriaUIRoutePathsEnum.TYPOGRAPHY,
    ZoriaUIRoutePathsEnum.BUTTONS,
    ZoriaUIRoutePathsEnum.INPUTS,
    ZoriaUIRoutePathsEnum.DISPLAY
]

export const ZoriaUIDocsRoutes: Partial<Record<ZoriaUIRoutePathsEnum, string[]>> = {
    [ZoriaUIRoutePathsEnum.TYPOGRAPHY]: [
        ZoriaUISubroutesPathsEnum.HEADERS,
        ZoriaUISubroutesPathsEnum.TEXT,
        ZoriaUISubroutesPathsEnum.LISTS,
        ZoriaUISubroutesPathsEnum.ICONS,
    ],
    [ZoriaUIRoutePathsEnum.BUTTONS]: [
        ZoriaUISubroutesPathsEnum.BUTTON,
        ZoriaUISubroutesPathsEnum.ICON_BUTTON,
    ],
    [ZoriaUIRoutePathsEnum.INPUTS]: [
        ZoriaUISubroutesPathsEnum.AUTOCOMPLETE_INPUT,
        ZoriaUISubroutesPathsEnum.CALENDAR,
        ZoriaUISubroutesPathsEnum.CHECKBOX,
        ZoriaUISubroutesPathsEnum.DATE_PICKER_INPUT,
        ZoriaUISubroutesPathsEnum.DATE_TIME_PICKER_INPUT,
        ZoriaUISubroutesPathsEnum.EMAIL_INPUT,
        ZoriaUISubroutesPathsEnum.INPUT,
        ZoriaUISubroutesPathsEnum.NUMBER_INPUT,
        ZoriaUISubroutesPathsEnum.PASSWORD_INPUT,
        ZoriaUISubroutesPathsEnum.RADIO_GROUP,
        ZoriaUISubroutesPathsEnum.SELECT_INPUT,
        ZoriaUISubroutesPathsEnum.TEXTAREA_INPUT,
        ZoriaUISubroutesPathsEnum.TEXT_INPUT,
        ZoriaUISubroutesPathsEnum.TIME_PICKER_INPUT,
        ZoriaUISubroutesPathsEnum.TOGGLE,
    ],
    [ZoriaUIRoutePathsEnum.DISPLAY]: [
        ZoriaUISubroutesPathsEnum.CHIP,
        ZoriaUISubroutesPathsEnum.SPINNER,
        ZoriaUISubroutesPathsEnum.TABLE,
        ZoriaUISubroutesPathsEnum.TABS,
        ZoriaUISubroutesPathsEnum.TOOLTIP,
        ZoriaUISubroutesPathsEnum.POPOVER,
        ZoriaUISubroutesPathsEnum.MODAL,
    ],
}