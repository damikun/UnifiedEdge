import clsx from "clsx"
import { useCallback, useTransition } from "react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom"

type MenuItemProps={
    name: string
    to: string
    pattern?: string;
    icon?: IconProp
}

export default function MenuItem({name,to,pattern,icon}:MenuItemProps){

    const navigate = useNavigate();

    //@ts-ignore
    const [_, startTransition] = useTransition({
        busyDelayMs: 2000,
    });

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

            e.preventDefault();
            e.stopPropagation();
            
            startTransition(() => {
                navigate(to)
            });
        },
        [to, navigate],
      )

    const resolver = useResolvedPath(pattern ? pattern : to);

    const match = useMatch({ path: resolver.pathname });

    return (
        <Link onClick={handleClick} to={to}
            className={clsx("flex space-x-3 flex-row w-full",
            "p-1 px-3 hover:bg-gray-200 cursor-pointer",
            "rounded-md transition duration-200 select-none",
            match && "text-blue-600 bg-gray-200 font-semibold")}>

            <div className={clsx("flex w-8 h-8 cursor-pointer",
            "whitespace-pre transition-none")}>
                {icon && <FontAwesomeIcon className="mx-auto my-auto" icon={icon} />}
            </div>
            
            <div className={clsx("flex justify-center my-auto truncate break-all",
            "leading-none transition-none")}>
                {name}
            </div>
        </Link>
    )
}

