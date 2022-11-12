import clsx from "clsx"
//@ts-ignore
import React, { createRef, Suspense} from "react";
import useDivInfinityScroll from "../../Hooks/useDivInfinityScroll";
import InfinityScrollBodyPlaceholder from "./InfinityScrollBodyPlaceholder";


type InfinityScrollTableProps = {
    children: React.ReactNode
    className?:string
    isEmpty?: boolean;
    offset?: number;
    isLoading?: boolean;
    header?: React.ReactNode;
    isLoadingMore?: boolean;
    fallback?:React.ReactNode;
    height?: "h-96" | "h-72" |"h-60" | "h-80",
    onEnd?: () => void;
}

export default function InfinityScrollTable({
    children,
    onEnd,
    offset = 20,
    header,
    height = "h-72",
    className,
    fallback
    }:InfinityScrollTableProps){

    const reference = createRef<HTMLTableSectionElement>();

    useDivInfinityScroll({
        ref: reference,
        handleOnEnd: () => {
            onEnd && onEnd();
        },
        fromEnd_px: offset,
    });

    return <table className={clsx("flex flex-col w-full relative",
        "border border-gray-200 rounded-md shadow-sm table-auto",
        className)}>

        {header}

        <Suspense fallback={fallback??<InfinityScrollBodyPlaceholder height={height}/>}>
            {children}
        </Suspense>

    </table>
}