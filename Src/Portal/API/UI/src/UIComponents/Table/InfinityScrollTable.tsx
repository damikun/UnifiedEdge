import clsx from "clsx"
//@ts-ignore
import React, { Suspense} from "react";
import InfinityScrollBodyPlaceholder from "./InfinityScrollBodyPlaceholder";


type InfinityScrollTableProps = {
    children: React.ReactNode
    className?:string
    header?: React.ReactNode;
    isLoadingMore?: boolean;
    fallback?:React.ReactNode;
    height?: "h-96" | "h-72" |"h-60" | "h-80",
}

export default function InfinityScrollTable({
    children,
    header,
    height = "h-72",
    className,
    fallback
    }:InfinityScrollTableProps){

    return <table className={clsx("flex flex-col w-full relative",
        "border border-gray-200 rounded-md shadow-sm table-auto",
        className)}>

        {header}

        <Suspense fallback={fallback??<InfinityScrollBodyPlaceholder height={height}/>}>
            {children}
        </Suspense>

    </table>
}