import {Col, Row} from "@zoria-ui/react";
import {InputDocs} from "./components/inputs/InputDocs.tsx";
import {TextDemo} from "./components/typography/TextDemo.tsx";
import {CheckboxDocs} from "./components/inputs/CheckboxDocs.tsx";
import {ToggleDocs} from "./components/inputs/ToggleDocs.tsx";
import {ButtonDemo} from "./components/ButtonDemo.tsx";
import {TooltipDemo} from "./components/display/TooltipDemo.tsx";
import {PopoverDemo} from "./components/PopoverDemo.tsx";
import {ModalDemo} from "./components/ModalDemo.tsx";
import {IconsDemo} from "./components/typography/IconsDemo.tsx";
import {IconButtonDemo} from "./components/IconButtonDemo.tsx";
import {CalendarDocs} from "./components/inputs/CalendarDocs.tsx";
import {SpinnerDemo} from "./components/display/SpinnerDemo.tsx";
import styles from "./ZoriaUIDemoList.module.scss";
import {ZoriaUIRoutePathsEnum} from "./config/ZoriaUIRoutesTypes.ts";
import {type FunctionComponent, useMemo} from "react";
import {RadioGroupDocs} from "./components/inputs/RadioGroupDocs.tsx";
import {ChipDemo} from "./components/display/ChipDemo.tsx";
import {TextInputDocs} from "./components/inputs/TextInputDocs.tsx";
import {NumberInputDocs} from "./components/inputs/NumberInputDocs.tsx";
import {PasswordInputDocs} from "./components/inputs/PasswordInputDocs.tsx";
import {TextareaInputDocs} from "./components/inputs/TextareaInputDocs.tsx";
import {DatePickerInputDocs} from "./components/inputs/DatePickerInputDocs.tsx";
import {SelectInputDocs} from "./components/inputs/SelectInputDocs.tsx";
import {HeadersDemo} from "./components/typography/HeadersDemo.tsx";
import {TableDemo} from "./components/display/TableDemo.tsx";
import {TabsDemo} from "./components/display/TabsDemo.tsx";
import {TimePickerInputDocs} from "./components/inputs/TimePickerInputDocs.tsx";
import {DateTimePickerInputDocs} from "./components/inputs/DateTimePickerInputDocs.tsx";
import {AutocompleteInputDocs} from "./components/inputs/AutocompleteInputDocs.tsx";
import {EmailInputDocs} from "./components/inputs/EmailInputDocs.tsx";

const ZoriaUiDemoComponentsMap = new Map<ZoriaUIRoutePathsEnum, FunctionComponent[]>([
    [ZoriaUIRoutePathsEnum.TYPOGRAPHY, [TextDemo, HeadersDemo, IconsDemo]],
    [ZoriaUIRoutePathsEnum.BUTTONS, [ButtonDemo, IconButtonDemo]],
    [ZoriaUIRoutePathsEnum.INPUTS, [
        InputDocs,
        TextInputDocs,
        TextareaInputDocs,
        NumberInputDocs,
        SelectInputDocs,
        AutocompleteInputDocs,
        EmailInputDocs,
        PasswordInputDocs,
        DatePickerInputDocs,
        TimePickerInputDocs,
        DateTimePickerInputDocs,
        CalendarDocs,
        CheckboxDocs,
        ToggleDocs,
        RadioGroupDocs]
    ],
    [ZoriaUIRoutePathsEnum.MODAL, [ModalDemo]],
    [ZoriaUIRoutePathsEnum.POPOVER, [PopoverDemo]],
    [ZoriaUIRoutePathsEnum.DISPLAY, [TableDemo, TabsDemo, TooltipDemo, ChipDemo, SpinnerDemo]],
]);

interface ZoriaUIDemoListProps {
    type?: ZoriaUIRoutePathsEnum
}

export function ZoriaUIDemoList({type}: ZoriaUIDemoListProps) {
    const demosToShow = useMemo(() => {
        if (!type || !ZoriaUiDemoComponentsMap.has(type)) {
            return Array.from(ZoriaUiDemoComponentsMap.values()).flat();
        }
        return ZoriaUiDemoComponentsMap.get(type);
    }, [type]);

    return <Row className={`justify-center`}>
        <Col
            className={styles.ZoriaUIDemoList}
        >
            {
                demosToShow!.map((DemoComponent) => {
                    return <Row key={DemoComponent.name}>
                        <DemoComponent/>
                    </Row>
                })
            }
        </Col>
    </Row>
}