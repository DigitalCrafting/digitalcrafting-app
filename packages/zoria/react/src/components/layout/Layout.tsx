import type {PropsWithChildren} from "react";

interface LayoutProps {
    className?: string
}

const InternalLayout = ({children, className: externalClassName = ''}: PropsWithChildren<LayoutProps>) => {
    return <div className={`z-layout ${externalClassName}`.trim()}>{children}</div>
}

const LayoutHeader = ({children, className: externalClassName = ''}: PropsWithChildren<LayoutProps>) => {
    return <div className={`z-layout-header ${externalClassName}`.trim()}>{children}</div>
}

const LayoutBody = ({children, className: externalClassName = ''}: PropsWithChildren<LayoutProps>) => {
    return <div className={`z-layout-body ${externalClassName}`.trim()}>{children}</div>
}

export const Layout = Object.assign(InternalLayout, {
    Header: LayoutHeader,
    Body: LayoutBody
})


export const Main = ({children}: PropsWithChildren) => {
    return <main className="z-main">{children}</main>
}