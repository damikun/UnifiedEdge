import clsx from "clsx"

type BodyContainerProps={
    children: React.ReactNode,
    footer?: React.ReactNode
    fullHeight?:boolean,
    reservefooterSpace?:boolean
}

export default function PageContainer({
    children,footer,fullHeight,reservefooterSpace}:BodyContainerProps){

    return <div className={clsx("flex flex-col w-full",
    "space-y-5 px-5 md:px-10 pt-24",
    fullHeight && "h-full",
    !fullHeight && "pb-10")}>
        {children}

        {
           footer ?footer:reservefooterSpace?<FooterSpace/>:<></>
        }
    </div>
}


function FooterSpace(){
    return <div id="page_footer" className="flex whitespace-pre-line py-2"/>
  }