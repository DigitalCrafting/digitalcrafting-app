import * as React from "react";
import {ExpandCollapse} from "../expand-collapse/ExpandCollapse";

/* TODO chevron is aligned differently than in *DocsPanel components */
function PanelHeader({children, ...rest}: React.PropsWithChildren) {
    return <ExpandCollapse.Trigger asChild>
        <div {...rest} className={`z-panel-header z-expand-collapse-trigger`}>
            {children}
            <ExpandCollapse.Chevron />
        </div>
    </ExpandCollapse.Trigger>;
}

function PanelBody({children}: React.PropsWithChildren) {
    return <ExpandCollapse.Body>
        <div className={`z-panel-body`}>
            {children}
        </div>
    </ExpandCollapse.Body>;
}

type HeaderType = React.ReactElement<typeof PanelHeader>;
type BodyType = React.ReactElement<typeof PanelBody>;

type PanelChildrenType =
    | [HeaderType, BodyType];

interface PanelProps {
    children: PanelChildrenType,
    className?: string
    expandByDefault?: boolean;
}

function InternalPanel({children, className = '', expandByDefault = false}: PanelProps) {
    return <div className={`z-panel ${className}`.trim()}>
        <ExpandCollapse expandByDefault={expandByDefault}>
            {children}
        </ExpandCollapse>
    </div>;
}


// TODO Footer ?
const ExpandCollapsePanel = Object.assign(InternalPanel, {
    Header: PanelHeader,
    Body: PanelBody
})

export {ExpandCollapsePanel};
