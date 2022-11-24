import clsx from "clsx"

type ModalHeaderProps = {
    label?:string
}
  
export default function ModalHeader({label}:ModalHeaderProps){
    return <div className={clsx("w-full bg-gray-200 overflow-hidden",
    "px-5 py-2 font-bold text-gray-500 shadow-sm")}>
      {label}
    </div>
}