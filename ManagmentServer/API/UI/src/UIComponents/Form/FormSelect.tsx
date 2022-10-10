import clsx from "clsx"

type FormSelectProps = {
 label:string
 error?:string 
 children?:React.ReactNode
} & React.DetailedHTMLProps<
React.SelectHTMLAttributes<HTMLSelectElement>,
HTMLSelectElement
>;

export default function FormSelect({label,error,children, ...rest}:FormSelectProps){

  return <div className="flex flex-col">
    <label className="font-semibold text-base">{label}</label>

    <select {...rest} className={clsx("bg-gray-50 border",
    "rounded-md block w-full p-1 my-2 text-gray-600 h-10",
    "focus:text-gray-700 shadow-sm",
    "focus:bg-white focus-within:bg-white text-base font-semibold",
    error 
      ? "border-red-500"
      : clsx("border-gray-300 focus-within:border-blue-500",
        "hover:border-blue-500")
    )}>
      {children}
    </select>
</div>
}

export type FormSelectOptionProps = {
  disabled?: boolean | undefined;
  selected?: boolean | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
  children?:React.ReactNode|string;
}

export function FormSelectOption({disabled,selected,value,children}:FormSelectOptionProps){
  return <option
    disabled={disabled}
    selected={selected}
    value={value}>
    {children}
  </option>
}