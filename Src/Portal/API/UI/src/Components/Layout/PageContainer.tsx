import clsx from "clsx"

type BodyContainerProps={
    children: React.ReactNode,
    footer?: React.ReactNode
}

export default function PageContainer({children,footer}:BodyContainerProps){

    return <div className={clsx("flex flex-col w-full",
    "space-y-5 px-5 md:px-10 pt-24 pb-10")}>
        {children}

        {
           footer &&footer
        }
    </div>
}