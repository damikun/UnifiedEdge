import clsx from "clsx"

type TableProps = {
    children: React.ReactNode
    className?:string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableElement>, HTMLTableElement>

export default function Table({children,className,...rest}:TableProps){
    return <table className={clsx("flex bg-gray-100 flex-col w-full relative",
    "border border-gray-200 rounded-sm shadow-sm pt-2 table-auto table",
    className)}
    {...rest}
    >
        {children}
    </table>
}