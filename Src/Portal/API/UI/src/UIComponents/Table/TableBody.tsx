import clsx from "clsx"

type TableBodyProps = {
    children: React.ReactNode
    className?:string
}

export default function TableBody({children,className}:TableBodyProps){
    return <tbody className={clsx("divide-y divide-gray-200",
    "divide-opacity-50 bg-gray-50",className)}>
        {children}
    </tbody>
}