import clsx from "clsx";

type SideBarProps = {
    children: React.ReactNode;
}

export default function SideBar({children}:SideBarProps){
    return <div className={clsx("bg-gray-800 z-30 w-16 p-2 text-center shadow-lg",
    "border-r border-l-gray-500 text-white font-bold")}>
       {children}
    </div>
}
