import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";

export type ScrollEndProps = {
  className?: string;
  fromend_px?: number;
  children: React.ReactNode;
  onEnd?: () => void;
};

export function InfinityScrollContainer({
  children,
  className,
  onEnd,
  fromend_px,
}: ScrollEndProps) {
  const [state, setstate] = useState(false);

  const scrollContainter = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleScrollCallback();
  });

  const handleScrollCallback = useCallback(
    () => {
      if (
        scrollContainter.current?.scrollTop! +
        scrollContainter.current?.offsetHeight! >=
        scrollContainter.current?.scrollHeight! -
          (fromend_px && fromend_px > 0 ? fromend_px : 0)
      ) {
        if (!state) {
          setstate(true);
  
          onEnd && onEnd();
        }
      } else {
        state && setstate(false);
      }
    },
    [scrollContainter,state,fromend_px,onEnd],
  )
  

  return (
    <div
      ref={scrollContainter}
      onScroll={handleScrollCallback}
      className={clsx("overflow-y-auto", className)}
    >
      {children}
    </div>
  );
}

export default React.memo(InfinityScrollContainer);
