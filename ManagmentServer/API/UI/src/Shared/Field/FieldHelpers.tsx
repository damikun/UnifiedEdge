import clsx from "clsx"
import _ from "cypress/types/lodash"

type FieldGroupProps = {
    name?:string
    children: React.ReactNode
    className?:string
}

export function FieldGroup({name,className,children}:FieldGroupProps) {
    return <div className={clsx("flex flex-col",className)}>
        {
            name && <div className="font-bold capitalize mb-2 underline">{name}:</div>
        }
       
        <div className={clsx(name && "", "space-y-1")}>{children}</div>
    </div>
}

// ---------------------

type FieldSectionProps = {
    name?:string
    children: React.ReactNode
    variant?: "flex-row" | "flex-col"
    multiline?:boolean
    className?:string
}

export function FieldSection({name,children,multiline,className,variant = "flex-row"}:FieldSectionProps) {
    return <div className={clsx("flex flex-row align-middle w-full py-0.5",variant)}>
        <FieldLabel name={name}/>
        <div className={clsx(multiline?"overflow-y-auto pb-0.5 overflow-x-hidden break-words max-w-full max-h-60":"flex truncate",className)}>{children}</div>
    </div>
}

// ---------------------

type FieldLableProps = {
    name?:string
}

export function FieldLabel({name}:FieldLableProps){
    return <>
        {name && <div className="font-semibold capitalize w-36">{name}:</div>}
    </>
}

// ---------------------

export function FieldDivider() {
    return <div className="py-2">
        <div className="w-full whitespace-pre h-0.5 bg-gray-200" />
    </div>
}