import { classNames } from "@/utils/classNames"

export const Card = ({children, classNames} : { children: React.ReactNode, classNames:string}) => {
    return (
        <div className={(classNames + " border rounded-xl border-black-400 border-10 overflow-hidden")}>
            {children}
        </div>
    )
}