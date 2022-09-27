import clsx from "clsx";
//@ts-ignore
import React, { createRef, SuspenseList } from "react";
import IsLoading from "./IsLoading";
import LoadingBar from "../LoadingBar/LoadingBar";
import useDivInfinityScroll from "../../Hooks/useDivInfinityScroll";

export type ScrollEndProps = {
  className?: string;
  children: React.ReactNode;
  onEnd?: () => void;
  offset?: number;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  divide?: boolean;
  header?:React.ReactNode;
  isEmpty?: boolean;
};

export default function StayledInfinityScrollContainer({
  children,
  className,
  onEnd,
  offset = 20,
  isLoadingMore = undefined,
  isLoading = undefined,
  isEmpty,
  header,
  divide = false,
}: ScrollEndProps) {
  const reference = createRef<HTMLDivElement>();

  useDivInfinityScroll({
    ref: reference,
    handleOnEnd: () => {
      onEnd && onEnd();
    },
    fromEnd_px: offset,
  });

  return (
    <div
      className={clsx(
        "flex flex-col max-h-full",
        "h-full w-full max-w-full",
        "bg-gray-100"
      )}
    >
      {header}
      {isLoading && <LoadingBar isloading={isLoading} />}

      <div
        ref={reference}
        className={clsx(
          "flex-1 rounded-b-md max-h-full overflow-hidden",
          "relative min-h-9rem max-w-full overflow-y-scroll",
          "scrollbarwidth scrollbarhide2 scrollbarhide",
          className
        )}
      >
        {isEmpty ? (
          <div className="flex w-full h-full justify-center items-center ">
            {/* <NoRecords
              visibility={isEmptyVisibility}
              size={isEmptySize}
              message={isEmptyMessage}
            /> */}

            No records
          </div>
        ) : (
          <div className="absolute w-full align-middle h-96">
 <>
              <SuspenseList revealOrder="together">
                <div className={clsx(divide && "divide-y")}>{children}</div>
              </SuspenseList>

              {isLoadingMore !== undefined && (
                <IsLoading isloading={isLoadingMore} />
              )}
          </>
          </div>
        )}
      </div>
    </div>
  );
}