import clsx from "clsx"
import { useCallback } from "react";
import { Switch } from "@headlessui/react";

type FormInput = {
  label:string
  checked:boolean
  id?:string
  value?:string
  name?:string
  error?:string
  onChange: (id:string|undefined, checked:boolean, value:string|undefined, name:string|undefined)=>void
  flexOrientation?: "flex-row" | "flex-col"
}

export function FormSwitch({label, onChange,value,id,name,checked,error,flexOrientation = "flex-col"} : FormInput){

  const handleOnChange = useCallback(
    (checked:boolean) => {
      onChange(id,checked,value,name)
    },
    [value,name,id,onChange],
  )
  
  return <div className={clsx("flex",
    flexOrientation === "flex-row"?"space-x-2 items-center":"flex-col space-y-2")}>
    <label className="font-semibold text-base">{label}</label>
    <Switch
      id={id}
      value={value}
      name={name}
      checked={checked}
      onChange={handleOnChange}
      className={clsx("relative inline-flex h-6 w-11",
      "rounded-full items-center border border-gray-200",
      "shadow-sm",
      checked ? "bg-blue-500":"bg-gray-200")}
    >
      <span className="sr-only">Select group</span>
      <span className={clsx("inline-block h-4 w-4 transform",
        "rounded-full bg-white transition-all",
        checked ? "translate-x-6" : "translate-x-1"
      )}/>
    </Switch>
</div>
}