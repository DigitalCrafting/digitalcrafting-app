import * as React from "react";

function PanelHeader({children}: React.PropsWithChildren) {
    return <div className={`z-panel-header`}>
        {children}
    </div>;
}

function PanelBody({children}: React.PropsWithChildren) {
    return <div className={`z-panel-body`}>
        {children}
    </div>;
}

function PanelFooter({children}: React.PropsWithChildren) {
    return <div className={`z-panel-footer`}>
        {children}
    </div>;
}

type HeaderType = React.ReactElement<typeof PanelHeader>;
type BodyType = React.ReactElement<typeof PanelBody>;
type FooterType = React.ReactElement<typeof PanelFooter>;

type PanelChildrenType =
    | [BodyType]
    | [HeaderType, BodyType]
    | [HeaderType, BodyType, FooterType]
    | [BodyType, FooterType]
    | React.ReactNode;

interface PanelProps {
    children: PanelChildrenType
}

function InternalPanel({children}: PanelProps) {
    return <div className={`z-card z-panel`}>
        {children}
    </div>;
}

const Panel = Object.assign(InternalPanel, {
    Header: PanelHeader,
    Body: PanelBody,
    Footer: PanelFooter
})

export {Panel};
