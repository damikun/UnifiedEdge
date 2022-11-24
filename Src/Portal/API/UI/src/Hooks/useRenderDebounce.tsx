import { useState, useEffect } from "react";

export default function useRenderDebounce(value: any | any, delay: number): any {
  const [DebouncedValue, setDebouncedValue] = useState(value);

  const [debouncing, setDebouncing] = useState(false)

  useEffect(() => {

    if(!debouncing){
      setTimeout(() => {
        setDebouncedValue(value);
        setDebouncing(false)
      }, delay);
      setDebouncing(true)
    }
  }, [value]);

  return DebouncedValue;
}
