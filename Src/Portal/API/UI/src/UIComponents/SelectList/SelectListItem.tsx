import clsx from "clsx";
import React from "react";
import { Listbox } from "@headlessui/react";
import { SelectItemType } from "./SelectList";


type SelectListItemProps<T> = {
  value:SelectItemType<T>
  disable?:boolean,
  isDefault?:boolean
}

export default React.memo(SelectListItem)

function SelectListItem<T>({value,disable=false,isDefault = false}:SelectListItemProps<T>){
  return <Listbox.Option
    value={value}
    disabled={disable}>
      <div className={clsx("font-semibold text-sm hover:bg-gray-100",
      "h-12 items-center justify-center flex px-1",
      !disable && "cursor-pointer",
      isDefault && "font-bold")}>
        <div className="truncate">
         {value.displayName}
        </div>
      </div>
  </Listbox.Option>
}
