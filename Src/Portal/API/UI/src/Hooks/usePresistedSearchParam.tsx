import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function usePresistedSearchParam(param_name:string):string {

    const [searchParams] = useSearchParams();

    const [param] = useState(searchParams.get(param_name) as string)
  
    return param;
}