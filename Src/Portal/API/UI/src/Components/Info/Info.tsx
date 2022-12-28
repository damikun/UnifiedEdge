import clsx from "clsx";
import { ReactComponent as GithubSvg } from "../../Images/GithubLogo.svg";

//todo Dynamicaly load version

const RepoUrl = "https://github.com/damikun/UnifiedEdge"

export default function Help(){
    return <div className="flex h-full w-full items-center justify-center">
        <div className="p-3 lg:p-5 max-w-2xl space-y-3">
            <VersionInfo version="v0.1-beta"/>

            <h2>Unified-Edge is open-source software (OSS) available under MIT license.</h2>

            <div className="flex flex-row">
                <NavItem name="Github" href={RepoUrl} icon={<GithubSvg/>} />
            </div>
      
            <LineDivider/>

            <CopyRight/>
        </div>
    </div>
}


type NavItemProps = {
    icon: React.ReactNode
    name:string
    href:string
}

function NavItem({icon,name,href}:NavItemProps){
    return <a href={href}
    target="_blank"
    rel="noreferrer"
    className={clsx("flex flex-nowrap flex-row w-40 h-12",
    "bg-blue-100 space-x-2 rounded-lg shadow-sm",
    "items-center cursor-pointer my-2 mr-2")}>
        <div className="flex w-8 h-8 p-0.5 items-center mx-5">
            {icon}
        </div>
        
        <div className={clsx("text-blue-600 font-semibold",
            "px-2 items-center text-center")}>
            {name}
        </div>
    </a>
}

type VersionInfoProps ={
    version:string
}

function VersionInfo({version}:VersionInfoProps){
    return <div className="flex flex-row space-x-2 font-semibold text-lg">
        <span>Version:</span>
        <span>{version}</span>
    </div>
}


function CopyRight(){
    return <div>©2022 Dalibor Kundrat</div>
}


function LineDivider(){
    return <div className={clsx("flex w-full border-b border-gray-300",
    "py-2 whitespace-pre")}/>
}