import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useSearchParamHandler(param_name:string):[
    boolean,
    (id:string | undefined) => void,
    () => void,
    ] {

    const [searchParams, setSearchParams] = useSearchParams();
  
    const write = useCallback(
        (client_id: string | null | undefined) => {
        searchParams.delete(param_name);
        if (client_id) {
            searchParams.append(param_name, client_id);
        }
        setSearchParams(searchParams);
        },
        [searchParams, setSearchParams, param_name]
    );
  
    const exist = useMemo(() => 
    searchParams.get(param_name)!== null, [param_name,searchParams]
  );

    const remove = useCallback(() => {
        searchParams.delete(param_name);
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams, param_name]);

    return [exist, write, remove];
}