import * as React from "react";
import {useContext} from "react";

type TableContextType = {
    dataTestId: string
}

const TableContext = React.createContext<TableContextType>({
    dataTestId: 'qa-table'
});

const useTableContext = () => {
    return useContext(TableContext);
}

type TableChildrenType = |
    TableHeadType |
    TableBodyType |
    TableFootType |
    [TableHeadType, TableBodyType] |
    [TableHeadType, TableBodyType, TableFootType] |
    [TableBodyType | TableFootType] |
    [TableHeadType | TableFootType];

interface TableProps extends Omit<React.TableHTMLAttributes<HTMLTableElement>, 'className'> {
    children: TableChildrenType;
    className?: string
    'data-testid'?: string
}

const TableInternal = ({children, className = '', 'data-testid': dataTestId = 'qa-table', ...props}: TableProps) => {
    return <div data-testid={`${dataTestId}-wrapper`} className='z-table-wrapper'>
        <table data-testid={dataTestId} className={`z-table ${className}`.trim()} {...props}>
            {children}
        </table>
    </div>
}

interface TableHeadProps extends Omit<React.TableHTMLAttributes<HTMLTableSectionElement>, 'className'> {
    children: TableRowType | TableRowType[];
    className?: string;
}

const TableHead = ({children, className = '', ...props}: TableHeadProps) => {
    const {dataTestId} = useTableContext();
    return <thead data-testid={`${dataTestId}-thead`} className={className} {...props}>{children}</thead>
}

type TableHeadType = React.ReactElement<typeof TableHead>;

interface TableBodyProps extends Omit<React.TableHTMLAttributes<HTMLTableSectionElement>, 'className'> {
    children: TableRowType | TableRowType[];
    className?: string;
}

const TableBody = ({children, className = '', ...props}: TableBodyProps) => {
    const {dataTestId} = useTableContext();
    return <tbody data-testid={`${dataTestId}-tbody`} className={className} {...props}>{children}</tbody>
}

type TableBodyType = React.ReactElement<typeof TableBody>;

interface TableFootProps extends Omit<React.TableHTMLAttributes<HTMLTableSectionElement>, 'className'> {
    children: TableRowType | TableRowType[];
    className?: string;
}

const TableFoot = ({children, className = '', ...props}: TableFootProps) => {
    const {dataTestId} = useTableContext();
    return <tfoot data-testid={`${dataTestId}-tfoot`} className={className} {...props}>{children}</tfoot>
}

type TableFootType = React.ReactElement<typeof TableFoot>;

interface TableRowProps extends Omit<React.TableHTMLAttributes<HTMLTableRowElement>, 'className'> {
    children: (TableHeaderType | TableCellType)[] | TableHeaderType | TableCellType;
    className?: string;
}

const TableRow = ({children, className = '', ...props}: TableRowProps) => {
    const {dataTestId} = useTableContext();
    return <tr data-testid={`${dataTestId}-tr`} className={className} {...props}>{children}</tr>
}

type TableRowType = React.ReactElement<typeof TableRow>;

interface TableHeaderProps extends Omit<React.TableHTMLAttributes<HTMLTableCellElement>, 'className'> {
    children: string | React.ReactNode;
    className?: string;
}

const TableHeader = ({children, className = '', ...props}: TableHeaderProps) => {
    const {dataTestId} = useTableContext();
    return <th data-testid={`${dataTestId}-th`} className={className} {...props}>{children}</th>
}

type TableHeaderType = React.ReactElement<typeof TableHeader>;

interface TableCellProps extends Omit<React.TableHTMLAttributes<HTMLTableCellElement>, 'className'> {
    children: string | React.ReactNode;
    className?: string;
}

const TableCell = ({children, className = '', ...props}: TableCellProps) => {
    const {dataTestId} = useTableContext();
    return <td data-testid={`${dataTestId}-td`} className={className} {...props}>{children}</td>
}

type TableCellType = React.ReactElement<typeof TableCell>;

const Table = Object.assign(TableInternal, {
    Head: TableHead,
    Body: TableBody,
    Foot: TableFoot,
    Row: TableRow,
    Header: TableHeader,
    Cell: TableCell
});

export {Table};