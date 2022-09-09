import clsx from "clsx"
import { useEffect, useRef } from "react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type FormInput = {
 icon?: IconProp
 label:string
 error?:string
 focusOnMount?: Boolean
} & React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
>;

export function FormInput({icon,label,error,focusOnMount = false, ...rest}:FormInput){
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    focusOnMount && ref.current && setTimeout(() => {
      if (ref.current) {
        ref.current?.focus();
      }
    }, 50);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return <div className="flex flex-col">
    <label className="font-semibold text-sm">{label}</label>
    <div
      className={clsx(
        "flex flex-row my-auto justify-start align-middle",
        "content-center p-1 my-2 border-2 rounded-md",
        "transition duration-200 focus:bg-white",
        "focus-within:bg-white",
        error
          ? " border-red-500 "
          : clsx(
              "border-gray-500 focus-within:border-blue-500",
              "hover:border-blue-500"
            ),
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
      <input
        ref={ref}
        {...rest}
        value={rest.value == null ? "" : rest.value}
        className={clsx(
          "mx-1 w-full text-gray-500 focus:text-gray-700",
          "my-auto placeholder-gray-500",
          "outline-none border-transparent",
          "bg-transparent font-semibold",
          rest.disabled ? "cursor-not-allowed" : "cursor-pointer"
        )}
      />
    </div>

</div>
}