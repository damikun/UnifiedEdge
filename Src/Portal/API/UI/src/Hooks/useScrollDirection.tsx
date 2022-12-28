import { useCallback, useEffect, useState } from "react";

var oldScrollY = 0

export default function useScrollDirection(
  elemetref: React.RefObject<
    HTMLDivElement | HTMLTextAreaElement | null | undefined
  >,
  def: "up"|"down" = "down"
) :["up" | "down",()=>void]{

  useEffect(() => {
    oldScrollY = 0
  }, [])

  const [direction, setDirection] = useState(def);
  // const [prev,setPrev] = useState(0);

  const controlDirection = useCallback(
    () => {
      if(elemetref?.current?.scrollTop){
        if(elemetref?.current?.scrollTop > oldScrollY) {
            setDirection('down');
        } else {
            setDirection('up');
        }
        oldScrollY = elemetref?.current?.scrollTop;
        // setPrev(elemetref?.current?.scrollTop)
      }
    },
    [elemetref],
  )

  return [direction, controlDirection]
}
