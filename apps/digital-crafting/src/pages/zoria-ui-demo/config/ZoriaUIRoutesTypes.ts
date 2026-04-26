export const ZoriaUIRoutePathsEnum = {
    ABOUT: 'about',
    TYPOGRAPHY: 'typography',
    BUTTONS: 'buttons',
    INPUTS: 'inputs',
    MODAL: 'modal',
    POPOVER: 'popover',
    DISPLAY: 'display',
} as const;
export type ZoriaUIRoutePathsEnum = (typeof ZoriaUIRoutePathsEnum)[keyof typeof ZoriaUIRoutePathsEnum];

export const ZoriaUIDemoRoutesList = [
    ZoriaUIRoutePathsEnum.ABOUT,
    ZoriaUIRoutePathsEnum.TYPOGRAPHY,
    ZoriaUIRoutePathsEnum.BUTTONS,
    ZoriaUIRoutePathsEnum.INPUTS,
    ZoriaUIRoutePathsEnum.MODAL,
    ZoriaUIRoutePathsEnum.POPOVER,
    ZoriaUIRoutePathsEnum.DISPLAY,
]
