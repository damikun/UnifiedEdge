import clsx from "clsx"
import { motion } from "framer-motion"
import { useMemo } from "react"

type MenuListProps={
    state: boolean
    children:React.ReactNode
}

export default function MenuList({state, children}:MenuListProps){

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const child  = useMemo(() => children, [])

    return (
        <motion.div
        initial={{
            width: state? "100%":"0%",
          }}
        animate={{
            width: state? "100%":"0%",
          }}
        transition={{ duration: 0.5, delay:0}}
        className={clsx("flex h-full shadow-md overflow-hidden z-10",
        "md:max-w-xs animate-none")}>

            <div className={clsx("flex to-slate-100 via-gray-100 from-gray-200",
                "bg-gradient-to-t shadow-md overflow-hidden w-full h-full")}>
                <div
                    className={clsx(
                    !state && "blur-sm",
                    "w-full space-y-1 p-2 flex-1 border-gray-200",
                    "duration-300 delay-75 overflow-hidden")}>
                    {child}
                </div>
            </div>
        </motion.div>
        )
}
