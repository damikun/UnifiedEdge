import clsx from "clsx"
import Body from "./Body"
import Header from "./Header"

type BodyContainerProps={
    state: boolean
}

export default function BodyContainer({state}:BodyContainerProps){

    return <div className={clsx("flex-1 transition-none w-full h-full",
        "overflow-x-hidden overflow-y-scroll",
        state ? "w-0 md:w-full": "w-full")}>
        <Header/>
        <Body/>
    </div>
}