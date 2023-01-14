import clsx from "clsx";

type SectionBodyProps = {
    className?: string;
    children:React.ReactNode
}

export default function SectionBody({className,children}:SectionBodyProps){

    return <div className={clsx("flex bg-gray-50 w-full",
    "border border-gray-200 rounded-lg shadow-sm p-5 space-y-2",
    className??"flex-col")}>
        {children}
    </div>
}