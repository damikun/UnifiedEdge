import { useEffect, useState } from "react";

function getLocalStorage<T>(key:string, defaultValue:T) {
    const value = localStorage.getItem(key);
    
    if(!value){
        return defaultValue;
    }

    const parsedValue = JSON.parse(value);

    return (parsedValue ?? defaultValue) as T
}

export function useLocalStorage<T>(key:string, defaultValue:T):[value:T,setValue:React.Dispatch<React.SetStateAction<T>>]{
    const [value, setValue] = useState<T>(() => {
        return getLocalStorage(key, defaultValue);
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    })

    return [value, setValue];
}