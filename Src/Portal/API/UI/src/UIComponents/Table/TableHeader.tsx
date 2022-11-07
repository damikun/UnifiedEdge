import clsx from "clsx"

type TableHeaderProps = {
    children: React.ReactNode
    className?:string
}

export default function TableHeader({children,className}:TableHeaderProps){
    return <thead className={clsx("flex text-gray-600 w-full",
    "space-x-2 justify-between border-b border-gray-200",
    "py-3 lg:py-4 px-2 md:px-5 select-none items-center font-semibold",
    className)}>
        {children}
    </thead>
}