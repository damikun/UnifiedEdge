import clsx from "clsx";
import ModalHeader from "./ModalHeader";

type ModalContainerProps = {
    children: React.ReactNode;
    label?:string
  }
  
export default function ModalContainer({children,label}:ModalContainerProps){
    return <div className={clsx("flex flex-col w-full h-full",
        "bg-gray-50 z-50 rounded-md shadow-sm overflow-hidden")}>
        <ModalHeader label={label}/>
        <div className="p-5 xl:p-7">
        {children}
        </div>
    </div>
}
  
