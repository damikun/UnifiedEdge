import clsx from "clsx"

type TableProps = {
    children: React.ReactNode
    className?:string
}

export default function Table({children,className}:TableProps){
    return <table className={clsx("flex bg-gray-100 flex-col w-full",
    "border border-gray-200 rounded-sm shadow-sm pt-2 table-auto table",
    className)}>
        {children}
    </table>
}