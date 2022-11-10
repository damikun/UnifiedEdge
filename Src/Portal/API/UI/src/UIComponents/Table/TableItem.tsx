import clsx from "clsx"

type TableItemProps = {
    children: React.ReactNode
    className?:string
    height?: "h-10" | "h-12" | "h-14" | "h-16"
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>

export default function TableItem({children,className,height="h-12",...rest}:TableItemProps){
    return <tr className={clsx("flex space-y-1 space-x-2",
    "text-center cursor-pointer justify-between py-1",
    "rounded-none hover:shadow-sm px-2 md:px-5 items-center",
    "hover:bg-gray-200",
    height,
    className)}
    {...rest}
    >
        {children}
    </tr>
}