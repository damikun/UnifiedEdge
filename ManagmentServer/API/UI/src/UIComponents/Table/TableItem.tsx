import clsx from "clsx"

type TableItemProps = {
    children: React.ReactNode
    className?:string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>

export default function TableItem({children,className,...rest}:TableItemProps){
    return <tr className={clsx("flex space-y-1 space-x-2",
    "text-center cursor-pointer justify-between py-1",
    "rounded-sm hover:shadow-sm px-2 md:px-5 items-center",
    "hover:bg-gray-200 h-10",
    className)}
    {...rest}
    >
        {children}
    </tr>
}