import clsx from "clsx"
//@ts-ignore
import React, { Suspense} from "react";
import InfinityScrollBodyPlaceholder from "../Table/InfinityScrollBodyPlaceholder";


type HorizontalInfinityScrollContainerProps = {
    children: React.ReactNode
    className?:string
    isLoadingMore?: boolean;
    fallback?:React.ReactNode;
    height?: "h-96" | "h-72" |"h-60" | "h-80" | "h-full",
}

export default function HorizontalInfinityScrollContainer({
    children,
    height = "h-72",
    className,
    fallback
    }:HorizontalInfinityScrollContainerProps){

    return <div className={clsx("flex w-full h-full relative",
        "border border-gray-200 rounded-lg shadow-sm",
        "overflow-hidden",className)}>

        <Suspense fallback={fallback??<InfinityScrollBodyPlaceholder height={height}/>}>
            {children}
        </Suspense>

    </div>
}