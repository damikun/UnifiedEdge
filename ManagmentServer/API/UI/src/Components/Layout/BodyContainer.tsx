import clsx from "clsx"
import Body from "./Body"
import Header from "./Header"

type BodyContainerProps={
    state: boolean
}

export default function BodyContainer({state}:BodyContainerProps){

    return <div className={clsx("flex-1 transition-none w-full h-full",
        "overflow-x-hidden overflow-y-scroll z-0",
        state ? "w-0 md:w-full": "w-full")}>
        <Header/>
        <div className="relative z-0">
            <Body/>
        </div>
 
    </div>
}