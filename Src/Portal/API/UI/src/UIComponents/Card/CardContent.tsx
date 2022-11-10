import clsx from "clsx";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CardContentProps = {
    icon: IconProp;
    title:string;
    value?:string | null | undefined | React.ReactNode
    className?:string,
    inocnClassName?:string,
    children?:React.ReactNode
}

export default function CardContent({icon,title,value,className,children}:CardContentProps){
    
    if(children === undefined && value === undefined){
        throw "Children or Value must be provided";
    }

    return <div className={clsx("flex flex-row w-full justify-between",
        "space-x-2 items-center")}>

        <div className={clsx("p-2 h-10 w-10 lg:w-12 lg:h-12 rounded-full",
            "bg-gray-50 m-2 justify-cente flex")}>
            <FontAwesomeIcon
                className="mx-auto my-auto text-xl lg:text-2xl text-blue-500"
                icon={icon} 
            />
        </div>

        <div className="flex flex-col space-y-1 justify-end p-2 overflow-hidden">
            <div className="font-semibold text-base capitalize text-end truncate">
                {title}
            </div>
            <div className={clsx("text-gray-600 text-sm w-full justify-end",
            " truncate capitalize text-end whitespace-pre", className)}>
                {children?children:value}
            </div>
        </div>

    </div>
}