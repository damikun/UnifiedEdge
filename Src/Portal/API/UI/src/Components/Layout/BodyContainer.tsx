import clsx from "clsx"
import React from "react"
import Body from "./Body"
import Header from "./Header"

export default React.memo(BodyContainer)

function BodyContainer(){

    return <div className={clsx("flex-1 relative transition-none w-full h-full",
        "overflow-x-hidden overflow-y-scroll z-0 w-full")}>
        <Header/>
        
        <div className="h-full max-h-fit relative z-0 -mt-16">
            <Body/>
        </div>
 
    </div>
}