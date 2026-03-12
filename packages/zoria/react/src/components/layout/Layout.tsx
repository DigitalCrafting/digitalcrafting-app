import type {PropsWithChildren} from "react";

interface LayoutProps {
    className: string
}

const InternalLayout = ({children, className: externalClassName = ''}: PropsWithChildren<LayoutProps>) => {
    return <div className={`z-layout ${externalClassName}`}>{children}</div>
}

const LayoutHeader = ({children}: PropsWithChildren) => {
    return <div className="z-layout-header">{children}</div>
}

const LayoutBody = ({children}: PropsWithChildren) => {
    return <div className="z-layout-body">{children}</div>
}

export const Layout = Object.assign(InternalLayout, {
    Header: LayoutHeader,
    Body: LayoutBody
})


export const Main = ({children}: PropsWithChildren) => {
    return <main className="z-main">{children}</main>
}