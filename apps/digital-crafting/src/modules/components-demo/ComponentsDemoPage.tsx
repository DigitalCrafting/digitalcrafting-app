import {ZCol, ZRow} from "@zoria-ui/react";
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

export function ComponentsDemoPage() {
    return <ZRow className={`justify-center`}>
        <ZCol span={8}>
            <ZRow >
                <ButtonDemo />
            </ZRow>
            <ZRow>
                <IconButtonDemo />
            </ZRow>
            <ZRow>
                <DatePickerDemo />
            </ZRow>
            <ZRow>
                <CheckboxDemo />
            </ZRow>
            <ZRow>
                <ToggleDemo />
            </ZRow>
            <ZRow>
                <InputDemo />
            </ZRow>
            <ZRow>
                <TextDemo />
            </ZRow>
            <ZRow>
                <PopoverDemo />
            </ZRow>
            <ZRow>
                <TooltipDemo />
            </ZRow>
            <ZRow>
                <ModalDemo/>
            </ZRow>
            <ZRow>
                <IconsDemo/>
            </ZRow>
        </ZCol>
    </ZRow>
}