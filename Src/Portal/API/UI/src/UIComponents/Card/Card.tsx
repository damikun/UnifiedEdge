import clsx from "clsx";

type CardProps = {
    children:React.ReactNode;
    className?:string
}

export default function Card({children,className}:CardProps){
    
    return <div className={
        clsx("flex w-full border border-gray-200",
        "shadow-sm p-2 px-4 rounded-sm",className)}>
        {children}
    </div>
}