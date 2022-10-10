import clsx from "clsx"
import { useEffect, useRef } from "react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type FormInput = {
 icon?: IconProp
 label:string
 error?:string
 focusOnMount?: Boolean
 afterFieldComponent?: React.ReactNode;
 flexOrientation?:"flex-row" | "flex-col"
} & React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
>;

export function FormInput({icon,label,error,afterFieldComponent,flexOrientation = "flex-col",focusOnMount = false, ...rest}:FormInput){
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    focusOnMount && ref.current && setTimeout(() => {
      if (ref.current) {
        ref.current?.focus();
      }
    }, 50);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return <div className={clsx("flex w-full",
    flexOrientation === "flex-row"?"space-x-2 items-center":"flex-col")}>
    <label className="font-semibold text-base">{label}</label>
    <div
      className={clsx(
        "flex flex-row my-auto justify-start align-middle",
        "content-center p-1 my-2 border shadow-sm rounded-md",
        "transition duration-200 focus:bg-white",
        "focus-within:bg-white h-10",
        error
          ? " border-red-500 "
          : clsx(
              "border-gray-300 focus-within:border-blue-500",
              "hover:border-blue-500"
            )
      )}
    >
      {icon && (
        <div
          className={clsx(
            "mx-1 font-normal text-xs my-auto",
            "align-content-center"
          )}
        >
          <FontAwesomeIcon
            className="align-content-center align-content-center"
            icon={icon}
          />
        </div>
      )}
      <div className="flex flex-row space-x-2 w-full">
        <input
          ref={ref}
          {...rest}
          value={rest.value == null ? "" : rest.value}
          className={clsx(
            "mx-1 w-full text-gray-600 focus:text-gray-700",
            "my-auto placeholder-gray-600",
            "outline-none border-transparent",
            "bg-transparent font-semibold",
            rest.disabled ? "cursor-not-allowed" : "cursor-pointer"
          )}
        />
        {afterFieldComponent}
      </div>

    </div>

</div>
}