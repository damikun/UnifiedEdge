import { Listbox } from "@headlessui/react";

type SelectListItemProps = {
    key?:string
    value:string
}

export default function SelectListItem({value,key}:SelectListItemProps){
    
    return <Listbox.Option
    key={key}
    value={value}
    disabled={false}>
      <div className="font-semibold text-sm hover:bg-gray-50">{value}</div>
  </Listbox.Option>
}
