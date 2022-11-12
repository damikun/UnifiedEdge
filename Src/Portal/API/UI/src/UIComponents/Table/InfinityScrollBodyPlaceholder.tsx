import clsx from "clsx"
import LoadingBar from "../LoadingBar/LoadingBar"
//@ts-ignore
import { createRef, useEffect, useState } from "react";


type InfinityScrollBodyPlaceholderProps = {
    height?: "h-96" | "h-72" |"h-60" | "h-80",
}

export default function InfinityScrollBodyPlaceholder({
    height = "h-96",
    }:InfinityScrollBodyPlaceholderProps){

    const reference = createRef<HTMLTableSectionElement>();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true)
    }, [])
    

    return <tbody ref={reference} className={clsx("relative min-h-9rem max-w-full",
        "overflow-y-scroll divide-y divide-gray-200",
        "divide-opacity-50 bg-gray-100 delay-300 animate-pulse",
        "scrollbarwidth scrollbarhide2 scrollbarhide",
        height)}>
        
            {
                <tr className="flex w-full h-3">
                    <td className="w-full">
                        <LoadingBar isloading={loading} />
                    </td>
                </tr>
            }

            {/* <tr className="h-full w-full bg-gray-100 animate-pulse whitespace-pre">

            </tr> */}
        </tbody>
}