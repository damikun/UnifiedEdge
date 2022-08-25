import clsx from "clsx"

type MenuListProps={
    state: boolean
    children:React.ReactNode
}

export default function MenuList({state, children}:MenuListProps){
    return (
        <div className={clsx("flex h-full shadow-md z-50 overflow-hidden",
        "transition-all duration-200",
         !state ? "w-0":"w-full md:w-80")}>

            <div className={clsx("flex to-slate-100 via-gray-100 from-gray-200",
                "bg-gradient-to-t shadow-md overflow-hidden w-full h-full")}>
                <div className={clsx(state ? "blur-none" : "blur-md",
                    "w-full space-y-1 p-2 flex-1 border-gray-200",
                    "delay-75 duration-200")}>
                    {children}
                </div>
            </div>
        </div>
        )
}
