import React, { useEffect, useRef } from 'react';

/**
 * Custom hook that returns whether the component is currently mounted
 * Useful for preventing state updates on unmounted components
 * @returns A function that returns true if the component is mounted, false otherwise
 */
export function useIsMounted(): () => boolean {
  const isMountedRef = useRef<boolean>(false);

  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return () => isMountedRef.current;
}

/**
 * Custom hook that provides a safe setState function that only updates if component is mounted
 * @param initialState - The initial state value
 * @returns A tuple with the state value and a safe setState function
 */
export function useSafeState<T>(initialState: T): [T, (newState: T | ((prev: T) => T)) => void] {
  const [state, setState] = React.useState<T>(initialState);
  const isMounted = useIsMounted();

  const safeSetState = React.useCallback((newState: T | ((prev: T) => T)) => {
    if (isMounted()) {
      setState(newState);
    }
  }, [isMounted]);

  return [state, safeSetState];
}