import { useCallback, useMemo, useSyncExternalStore } from "react";

export const mediaQuery = {
  sp: "(width < 768px)",
  tablet: "(768px <= width < 1024px)",
  pc: "(1024px <= width)",
};

export function useMatchMedia(
  mediaQuery: string,
  initialState = false
): boolean {
  const matchMediaList = useMemo(
    () =>
      typeof window === "undefined" ? undefined : window.matchMedia(mediaQuery),
    [mediaQuery]
  );

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      matchMediaList?.addEventListener("change", onStoreChange);
      return () => matchMediaList?.removeEventListener("change", onStoreChange);
    },
    [matchMediaList]
  );

  return useSyncExternalStore(
    subscribe,
    () => matchMediaList?.matches ?? initialState,
    () => initialState
  );
}
