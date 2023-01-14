import clsx from "clsx";
import { useCallback} from "react"
import { Listbox } from "@headlessui/react";
import SelectListItem from "./SelectListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type DropDownProps<T> = {
  label?:string,
  disabled?:boolean
  value:SelectItemType<T>,
  defaultValue?:SelectItemType<T>,
  options:SelectItemType<T>[],
  onChange: (data:SelectItemType<T>)=>void
}

export type SelectItemType<T> = {
  id:string | undefined
  data:T,
  displayName:string,
}

export default function SelectList<T>({
  label,
  value,
  onChange,
  disabled = false,
  options,
  defaultValue
}:DropDownProps<T>){

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
      <div className="relative z-10">
        <Listbox value={value} onChange={onChangeCallback}> 
        {
          opt=> <>
           <Listbox.Button className={clsx("flex flex-col",
            "font-semibold border transition border-s rounded-lg",
            "px-1 py-1.5 bg-gray-50 focus:outline-none relative w-full",
            "rounded-lg shadow-sm outline-1 outline-gray-100 border-2",
            "border-gray-200 w-36",
            disabled && "cursor-not-allowed")}>

            <div className={clsx("flex flex-row p-1 m-auto space-x-2 max-w-full",
              "justify-items-center leading-none")}>
              <div className="truncate">
                {value.displayName}
              </div>     
              <div className={"font-bold text-xs justify-items-cente flex"}>
                <FontAwesomeIcon 
                  className={clsx(
                    "flex my-auto transition duration-150",
                    opt?.open && "rotate-180")} 
                  icon={faChevronDown}
                />    
              </div>   
            </div>
          </Listbox.Button>

          <Listbox.Options className={clsx("flex flex-col origin-top-right",
            "absolute w-max max-w-sm lg:max-w-md 2xl:max-w-lg z-10",
            "right-0 bg-gray-50 border-2 rounded-lg",
            "p-1 border-gray-200 shadow-sm mt-1")}>
              {
                defaultValue && value.id !== defaultValue.id && <>
                  <SelectListItem
                    isDefault
                    key={"default"}
                    value={defaultValue} 
                  />
                </>
              }

              {
                options.length>0 && options
                .filter(e=>e.id !== value.id)
                .map((e,i)=>{
                  return <SelectListItem
                    key={i.toString()}
                    value={e} 
                  />
                })
              }

              {
                options.length === 0 && <EmptyOptionIndicator />
              }
          </Listbox.Options>
          </>
        }
         
        </Listbox>
      </div>   
    </div>
}


function EmptyOptionIndicator(){
  return <Listbox.Option
  value={"Empty"}
  disabled={true}>
    <div className={clsx("font-semibold text-sm hover:bg-gray-100",
    "h-12 items-center justify-center flex select-none px-1")}>
      <div className="truncate">
        No options
      </div>
    </div>
</Listbox.Option>
}