import clsx from "clsx"
import { AnimatePresence } from "framer-motion";
import LoadingBar from "../LoadingBar/LoadingBar"
//@ts-ignore
import React, { createRef, Suspense, SuspenseList } from "react";
import useDivInfinityScroll from "../../Hooks/useDivInfinityScroll";


type InfinityScrollBodyProps = {
    children: React.ReactNode
    className?:string
    isEmpty?: boolean;
    offset?: number;
    isLoading?: boolean;
    isLoadingMore?: boolean;
    fallback?:React.ReactNode;
    height?: "h-96" | "h-72" |"h-60" | "h-80" | "h-full",
    onEnd?: () => void;
}

export default function HorizontalInfinityScrollBody({
    children,
    onEnd,
    offset = 20,
    isEmpty,
    height = "h-96",
    fallback,
    isLoadingMore = undefined,
    isLoading = undefined,
    }:InfinityScrollBodyProps){

    const reference = createRef<HTMLDivElement>();

    useDivInfinityScroll({
        ref: reference,
        handleOnEnd: () => {
            onEnd && onEnd();
        },
        fromEnd_px: offset,
    });

    return <div ref={reference}
        className={clsx("relative max-w-full items-center",
        "grid grid-rows-2 grid-flow-col overflow-x-scroll px-2",
        "scrollbarwidth scrollbarhide2 scrollbarhide",
        height)}>
        
            {/* {
                isLoading && <div className="flex w-full">
                    <div>
                        <LoadingBar isloading={isLoading} />
                    </div>
                </div>
            } */}

            {
                isEmpty && <div className={clsx("flex w-full h-full justify-center",
                "items-center")}>
                    <div></div>
                </div>
            }

            {
                !isEmpty && <SuspenseList revealOrder="together">
                    <Suspense fallback={fallback}>
                        <AnimatePresence>
                            {children}
                        </AnimatePresence>
                    </Suspense>
                </SuspenseList>
            }

            {
                isLoadingMore &&<tr className="flex w-full">
                    <td>
                        {/* <IsLoading isloading={isLoadingMore} /> */}
                    </td>
                </tr>
            }
        </div>
}