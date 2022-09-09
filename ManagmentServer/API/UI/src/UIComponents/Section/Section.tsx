
type SectionProps = {
    name?: string;
    component: React.ReactNode;
    bar?: React.ReactNode;
}

export default function Section({name,component,bar}:SectionProps){

    return <div className="flex flex-col w-full">

        <div className="flex w-full flex-row space-x-5 justify-between items-center">
            {name && <h3 className="font-semibold pb-2 text-lg text-gray-700 justify-center my-auto">{name}</h3>}

            {bar && <div>{bar}</div>}
        </div>
    
        <div className="flex flex-row space-x-3 xl:space-x-5 w-full">
            {component}
        </div>
    </div>
}