import {Col, Row} from "@zoria-ui/react";
import {InputDemo} from "./components/InputDemo.tsx";
import {TextDemo} from "./components/TextDemo.tsx";
import {CheckboxDemo} from "./components/CheckboxDemo.tsx";
import {ToggleDemo} from "./components/ToggleDemo.tsx";
import {ButtonDemo} from "./components/ButtonDemo.tsx";
import {TooltipDemo} from "./components/TooltipDemo.tsx";
import {PopoverDemo} from "./components/PopoverDemo.tsx";
import {ModalDemo} from "./components/ModalDemo.tsx";
import {IconsDemo} from "./components/IconsDemo.tsx";
import {IconButtonDemo} from "./components/IconButtonDemo.tsx";
import {DatePickerDemo} from "./components/DatePickerDemo.tsx";
import {SpinnerDemo} from "./components/SpinnerDemo.tsx";
import styles from "./ZoriaUIDemoList.module.scss";
import {ZoriaUIRoutePathsEnum} from "./config/ZoriaUIRoutesTypes.ts";
import {type FunctionComponent, useMemo} from "react";

const ZoriaUiDemoComponents = new Map<ZoriaUIRoutePathsEnum, FunctionComponent[]>([
    [ZoriaUIRoutePathsEnum.TYPOGRAPHY, [TextDemo]],
    [ZoriaUIRoutePathsEnum.BUTTONS, [ButtonDemo, IconButtonDemo]],
    [ZoriaUIRoutePathsEnum.INPUTS, [InputDemo, DatePickerDemo, CheckboxDemo, ToggleDemo]],
    [ZoriaUIRoutePathsEnum.MODAL, [ModalDemo]],
    [ZoriaUIRoutePathsEnum.POPOVER, [PopoverDemo]],
    [ZoriaUIRoutePathsEnum.TOOLTIP, [TooltipDemo]],
    [ZoriaUIRoutePathsEnum.SPINNER, [SpinnerDemo]],
    [ZoriaUIRoutePathsEnum.ICONS, [IconsDemo]]
]);

interface ZoriaUIDemoListProps {
    type?: ZoriaUIRoutePathsEnum
}

export function ZoriaUIDemoList({type}: ZoriaUIDemoListProps) {
    const demosToShow = useMemo(() => {
        if (!type || !ZoriaUiDemoComponents.has(type)) {
            return Array.from(ZoriaUiDemoComponents.values()).flat();
        }
        return ZoriaUiDemoComponents.get(type);
    }, [type]);

    return <Row className={`justify-center`}>
        <Col
            className={styles.ZoriaUIDemoList}
            >
            {
                demosToShow!.map((DemoComponent) => {
                    return <Row key={DemoComponent.name}>
                        <DemoComponent />
                    </Row>
                })
            }
        </Col>
    </Row>
}