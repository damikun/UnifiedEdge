
type SectionProps = {
    name?: string;
    component: React.ReactNode;
}

export default function Section({name,component}:SectionProps){

    return <div className="flex flex-col w-full">

        {name && <h3 className="font-semibold pb-2 text-lg text-gray-700 justify-center my-auto">{name}</h3>}

        <div className="flex flex-row space-x-3 xl:space-x-5 w-full">
            {component}
        </div>
    </div>
}