import clsx from "clsx"
import { useCallback } from "react";
import { Switch } from "@headlessui/react";

type FormInput = {
  label?:string
  checked:boolean
  id?:string
  value?:string
  name?:string
  error?:string
  checkedColor?:"bg-blue-500" | "bg-yellow-500" | "bg-green-500"
  uncheckedColor?:"bg-gray-500" | "bg-red-500"
  onChange: (id:string|undefined, checked:boolean, value:string|undefined, name:string|undefined)=>void
  flexOrientation?: "flex-row" | "flex-col"
}

export function FormSwitch({
  label,
  onChange,
  value,
  id,
  name,
  checked,
  error,
  checkedColor,
  uncheckedColor,
  flexOrientation = "flex-col"} : FormInput){

  const handleOnChange = useCallback(
    (checked:boolean) => {
      onChange(id,checked,value,name)
    },
    [value,name,id,onChange],
  )

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation()
    },
    [],
  )
  
  return <div onClick={handleClick} className={clsx("flex",
    flexOrientation === "flex-row"?"space-x-2 items-center":"flex-col space-y-2")}>
    {
      label && <label className="font-semibold text-base">
        {label}
      </label>
    }
    <Switch
      id={id}
      value={value}
      name={name}
      checked={checked}
      onChange={handleOnChange}
      className={clsx("relative inline-flex h-6 w-11",
      "rounded-full items-center border border-gray-200",
      "shadow-sm",
      checked ? 
        checkedColor??"bg-blue-500":
        uncheckedColor ??"bg-gray-200")}
    >
      <span className="sr-only">
        Select group
      </span>
      <span className={clsx("inline-block h-4 w-4 transform",
        "rounded-full bg-white transition-all",
        checked ? "translate-x-6" : "translate-x-1"
      )}/>
    </Switch>
</div>
}