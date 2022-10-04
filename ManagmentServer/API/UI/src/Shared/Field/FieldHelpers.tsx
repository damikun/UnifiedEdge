import clsx from "clsx"

type FieldGroupProps = {
    name:string
    children: React.ReactNode
}

export function FieldGroup({name,children}:FieldGroupProps) {
    return <div className="flex flex-col">
        <div className="font-semibold capitalize mb-2">{name}:</div>
        <div className="pl-5">{children}</div>
    </div>
}

// ---------------------

type FieldSectionProps = {
    name:string
    children: React.ReactNode
    variant?: "flex-row" | "flex-col"
    multiline?:boolean
    className?:string
}

export function FieldSection({name,children,multiline,className,variant = "flex-row"}:FieldSectionProps) {
    return <div className={clsx("flex flex-row align-middle w-full",variant)}>
        <div className="font-semibold capitalize mr-2">{name}:</div>
        <div className={clsx(multiline?"overflow-y-auto overflow-x-hidden break-words max-w-full max-h-60":"truncate",className)}>{children}</div>
    </div>
}

// ---------------------

export function FieldDivider() {
    return <div className="py-2">
        <div className="w-full whitespace-pre h-0.5 bg-gray-200" />
    </div>
}