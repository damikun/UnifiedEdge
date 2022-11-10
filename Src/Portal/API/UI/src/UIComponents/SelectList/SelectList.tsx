import clsx from "clsx";
import { useCallback} from "react"
import { Listbox } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SelectListItem from "./SelectListItem";

type DropDownProps<T> = {
    disabled?:boolean
    label?:string
    onChange: (data:SelectItemType<T>)=>void
    options:SelectItemType<T>[],
    value:SelectItemType<T>,
}

type SelectItemType<T> =  {
  id:string | undefined
  data:T,
  displayName:string,
}

// export type ListBoxData<T> = 

export default function SelectList<T>({label,value,onChange, disabled = false,options}:DropDownProps<T>){

    var onChangeCallback = useCallback(
      (e:SelectItemType<T>) => {
        onChange(e)
      },
      [onChange],
    )
    
    return <div className="my-2 space-y-2">
      {
        label && <label className="font-semibold text-sm">{label}</label>
      }
      <div className="relative">
        <Listbox value={value} onChange={onChangeCallback}>   
          <Listbox.Button className={clsx("flex flex-col",
            "font-semibold border transition border-s rounded-md",
            "px-1 py-1.5 bg-gray-100 focus:outline-none relative w-full",
            "rounded-sm shadow-sm outline-1 outline-gray-100 border-2",
            "border-gray-200",
            disabled && "cursor-not-allowed")}>

            <div className={clsx("flex flex-row p-1 m-auto space-x-2",
              "justify-items-center leading-none")}>
              <div>{value.displayName}</div>     
              <div className={"font-bold text-xs justify-items-cente flex"}>
                  <FontAwesomeIcon className="flex my-auto" icon={faChevronDown}/>    
              </div>   
            </div>
          </Listbox.Button>

          <Listbox.Options className={clsx("flex flex-col origin-top-right absolute",
            "right-0 bg-gray-50 border-2 rounded-md",
            "p-1 border-gray-200 w-full shadow-sm mt-1")}>
              {options.map(e=>{
                return <SelectListItem key={e.id} value={e.displayName} />
              })}
          </Listbox.Options>
        </Listbox>
      </div>   
    </div>
   
}
