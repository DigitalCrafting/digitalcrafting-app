export const ZoriaUIRoutePathsEnum = {
    ABOUT: 'about',
    TYPOGRAPHY: 'typography',
    BUTTONS: 'buttons',
    INPUTS: 'inputs',
    MODAL: 'modal',
    POPOVER: 'popover',
    TOOLTIP: 'tooltip',
    SPINNER: 'spinner',
    ICONS: 'icons',
} as const;
export type ZoriaUIRoutePathsEnum = (typeof ZoriaUIRoutePathsEnum)[keyof typeof ZoriaUIRoutePathsEnum];

export const ZoriaUIDemoRoutesList = [
    ZoriaUIRoutePathsEnum.ABOUT,
    ZoriaUIRoutePathsEnum.TYPOGRAPHY,
    ZoriaUIRoutePathsEnum.BUTTONS,
    ZoriaUIRoutePathsEnum.INPUTS,
    ZoriaUIRoutePathsEnum.MODAL,
    ZoriaUIRoutePathsEnum.POPOVER,
    ZoriaUIRoutePathsEnum.TOOLTIP,
    ZoriaUIRoutePathsEnum.SPINNER,
    ZoriaUIRoutePathsEnum.ICONS,
]
