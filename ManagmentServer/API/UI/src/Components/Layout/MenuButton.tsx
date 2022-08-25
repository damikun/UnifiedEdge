import { faBars, faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx"
import { useCallback } from "react";

type MenuButtonProps={
    onClick: ()=>void;
    state: boolean
}

export default function MenuButton({onClick,state}:MenuButtonProps){

    const handleClick = useCallback(
        () => {
            onClick()
        },
        [onClick],
      )
      
    return (
        <div className={clsx("flex rounded-full w-12 h-12 hover:bg-gray-700",
            "transition duration-200 justify-center cursor-pointer p-1",
            state && "rotate-90 border-opacity-80 shadow-lg overflow-hidden")}
            onClick={handleClick}>
                <FontAwesomeIcon className="mx-auto my-auto transition-none" 
                icon={state?faCircleChevronDown:faBars} />
        </div>
        )
}
