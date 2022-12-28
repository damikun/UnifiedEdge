import clsx from "clsx";

type SectionProps = {
    name?: string | React.ReactNode;
    component: React.ReactNode;
    bar?: React.ReactNode;
}

export default function Section({name,component,bar}:SectionProps){

    return <div className="flex flex-col w-full h-auto">

        <div className="flex w-full flex-row space-x-5 justify-between items-center">
            {name && <h3 className={clsx("font-semibold pb-2 text-lg",
            "text-gray-700 justify-center my-auto capitalize")}>
                {name}
            </h3>}

            {bar && <div>{bar}</div>}
        </div>
    
        <div className="flex w-full h-full max-h-fit overflow-hidden">
            {component}
        </div>
    </div>
}