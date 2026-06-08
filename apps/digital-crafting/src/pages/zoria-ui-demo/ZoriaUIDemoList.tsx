import {Col, Row} from "@zoria-ui/react";
import {InputDocs} from "./components/inputs/InputDocs.tsx";
import {TextDocs} from "./components/typography/TextDocs.tsx";
import {CheckboxDocs} from "./components/inputs/CheckboxDocs.tsx";
import {ToggleDocs} from "./components/inputs/ToggleDocs.tsx";
import {ButtonDocs} from "./components/ButtonDocs.tsx";
import {TooltipDocs} from "./components/display/TooltipDocs.tsx";
import {PopoverDocs} from "./components/PopoverDocs.tsx";
import {ModalDocs} from "./components/ModalDocs.tsx";
import {IconsDocs} from "./components/typography/IconsDocs.tsx";
import {IconButtonDocs} from "./components/IconButtonDocs.tsx";
import {CalendarDocs} from "./components/inputs/CalendarDocs.tsx";
import {SpinnerDocs} from "./components/display/SpinnerDocs.tsx";
import styles from "./ZoriaUIDemoList.module.scss";
import {ZoriaUIRoutePathsEnum} from "./config/ZoriaUIRoutesTypes.ts";
import {type FunctionComponent, useMemo} from "react";
import {RadioGroupDocs} from "./components/inputs/RadioGroupDocs.tsx";
import {ChipDocs} from "./components/display/ChipDocs.tsx";
import {TextInputDocs} from "./components/inputs/TextInputDocs.tsx";
import {NumberInputDocs} from "./components/inputs/NumberInputDocs.tsx";
import {PasswordInputDocs} from "./components/inputs/PasswordInputDocs.tsx";
import {TextareaInputDocs} from "./components/inputs/TextareaInputDocs.tsx";
import {DatePickerInputDocs} from "./components/inputs/DatePickerInputDocs.tsx";
import {SelectInputDocs} from "./components/inputs/SelectInputDocs.tsx";
import {HeadersDocs} from "./components/typography/HeadersDocs.tsx";
import {TableDocs} from "./components/display/TableDocs.tsx";
import {TabsDocs} from "./components/display/TabsDocs.tsx";
import {TimePickerInputDocs} from "./components/inputs/TimePickerInputDocs.tsx";
import {DateTimePickerInputDocs} from "./components/inputs/DateTimePickerInputDocs.tsx";
import {AutocompleteInputDocs} from "./components/inputs/AutocompleteInputDocs.tsx";
import {EmailInputDocs} from "./components/inputs/EmailInputDocs.tsx";

const ZoriaUiDemoComponentsMap = new Map<ZoriaUIRoutePathsEnum, FunctionComponent[]>([
    [ZoriaUIRoutePathsEnum.TYPOGRAPHY, [TextDocs, HeadersDocs, IconsDocs]],
    [ZoriaUIRoutePathsEnum.BUTTONS, [ButtonDocs, IconButtonDocs]],
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
    [ZoriaUIRoutePathsEnum.MODAL, [ModalDocs]],
    [ZoriaUIRoutePathsEnum.POPOVER, [PopoverDocs]],
    [ZoriaUIRoutePathsEnum.DISPLAY, [TableDocs, TabsDocs, TooltipDocs, ChipDocs, SpinnerDocs]],
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