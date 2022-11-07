import { createPath, State, To } from "history";
import React, { useTransition, useEffect } from "react";
import {
  useHref,
  useLocation,
  useNavigate,
  useResolvedPath,
} from "react-router";

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  replace?: boolean;
  state?: State;
  to: To;
  transitionTime?: number;
  onTransitionStateChange?: (state: boolean) => void;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function LinkWithRef(
    {
      onClick,
      onTransitionStateChange,
      replace: replaceProp = false,
      state,
      target,
      to,
      transitionTime = 2000,
      ...rest
    },
    ref
  ) {
    let href = useHref(to);
    let navigate = useNavigate();
    let location = useLocation();
    let path = useResolvedPath(to);

    //@ts-ignore
    const [isPending, startTransition] = useTransition({
      busyDelayMs: transitionTime,
    });

    useEffect(() => {
      onTransitionStateChange && onTransitionStateChange(isPending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPending]);

    function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
      isPending && event.preventDefault();

      !isPending &&
        startTransition(() => {
          if (onClick) onClick(event);

          if (
            !event.defaultPrevented && // onClick prevented default
            event.button === 0 && // Ignore everything but left clicks
            (!target || target === "_self") && 
            !isModifiedEvent(event) // Ignore clicks with modifier keys
          ) {
            event.preventDefault();

            // If the URL hasn't changed, a regular <a> will do a replace instead of
            // a push, so do the same here.
            let replace =
              !!replaceProp || createPath(location) === createPath(path);

            navigate(to, { replace, state });
          }
        });
    }

    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        {...rest}
        href={href}
        onClick={handleClick}
        ref={ref}
        target={target}
      />
    );
  }
);

function isModifiedEvent(event: React.MouseEvent) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
