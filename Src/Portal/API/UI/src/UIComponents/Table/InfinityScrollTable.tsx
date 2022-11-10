import clsx from "clsx"
import IsLoading from "./IsLoading";
import LoadingBar from "../LoadingBar/LoadingBar"
//@ts-ignore
import React, { createRef, SuspenseList } from "react";
import useDivInfinityScroll from "../../Hooks/useDivInfinityScroll";


type InfinityScrollTableProps = {
    children: React.ReactNode
    className?:string
    isEmpty?: boolean;
    offset?: number;
    isLoading?: boolean;
    header?: React.ReactNode;
    isLoadingMore?: boolean;
    height?: "h-96" | "h-72" |"h-60" | "h-80",
    onEnd?: () => void;
}

export default function InfinityScrollTable({
    children,
    onEnd,
    offset = 20,
    isEmpty,
    header,
    height = "h-96",
    isLoadingMore = undefined,
    isLoading = undefined,
    className
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
        
        <tbody ref={reference} className={clsx("relative min-h-9rem max-w-full",
        "overflow-y-scroll divide-y divide-gray-200",
        "divide-opacity-50 bg-gray-50",
        "scrollbarwidth scrollbarhide2 scrollbarhide",
        height)}>
           
            {
                isLoading && <tr className="flex w-full">
                    <td>
                        <LoadingBar isloading={isLoading} />
                    </td>
                </tr>
            }

            {
                isEmpty && <tr className={clsx("flex w-full h-full justify-center",
                "items-center")}>
                    <td></td>
                </tr>
            }

            {
                !isEmpty && <SuspenseList revealOrder="together">
                    {children}
                </SuspenseList>
            }

            {
                isLoadingMore &&<tr className="flex w-full">
                    <td>
                        <IsLoading isloading={isLoadingMore} />
                    </td>
                </tr>
            }
        </tbody>
    </table>
}