import {Col, type ColProps, H2, Panel, Row, type RowProps} from "@zoria-ui/react";
import * as React from "react";

const DemoPanelCol = ({children, className: externalClassName = '', ...props}: React.PropsWithChildren<ColProps>) => {
    return <Col {...props} className={`justify-center align-items-center ${externalClassName}`.trim()}>{children}</Col>
}

const DemoPanelRow = ({children, className: externalClassName = '', ...props}: React.PropsWithChildren<RowProps>) => {
    return <Row {...props} className={`justify-center content-center ${externalClassName}`.trim()}>
        {children}
    </Row>
}

interface DemoPanelProps {
    title: string
}

const DemoPanelInternal = ({
    title,
    children
}: React.PropsWithChildren<DemoPanelProps>) => {
    return <Panel>
        <Panel.Header>
            <H2>{title}</H2>
        </Panel.Header>
        <Panel.Body>
            <Col gap='sm'>
                {children}
            </Col>
        </Panel.Body>
    </Panel>
}

const DemoPanel = Object.assign(DemoPanelInternal, {
    Row: DemoPanelRow,
    Col: DemoPanelCol
})

export {DemoPanel};