import clsx from "clsx"

type ModalHeaderProps = {
    label?:string
}
  
export default function ModalHeader({label}:ModalHeaderProps){
    return <div className={clsx("w-full bg-gray-200 overflow-hidden",
    "px-2 py-1 font-semibold text-gray-800 shadow-sm")}>
        {label}
    </div>
}