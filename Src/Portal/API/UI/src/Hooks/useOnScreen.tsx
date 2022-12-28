import { useCallback, useEffect, useState } from "react";

export function useOnScreen(ref:React.RefObject<Element>,threshold?:number): [boolean,() => void] {

    const [isIntersecting, setIntersecting] = useState(false);

    const [observer] = useState( new IntersectionObserver(
        ([enity]) => setIntersecting(enity.isIntersecting),{threshold:threshold ?? 0.9}
    ))

    useEffect(() => {

        if(ref !=null && ref.current != null){
            observer.observe(ref.current)
        }

        return () => {
            observer.disconnect();
        }

    }, [ref,observer])

    const dispose = useCallback(
      () => {
        observer.disconnect();
      },
      [observer],
    )
    

    return [isIntersecting, dispose];
}