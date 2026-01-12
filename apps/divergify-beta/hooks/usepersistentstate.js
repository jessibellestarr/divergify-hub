import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tiny helper to hydrate + persist local state without servers.
export default function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem(key)
      .then((stored) => {
        if (stored && isMounted) {
          setValue(JSON.parse(stored));
        }
      })
      .finally(() => isMounted && setIsHydrated(true));
    return () => {
      isMounted = false;
    };
  }, [key]);

  const updateValue = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        AsyncStorage.setItem(key, JSON.stringify(resolved)).catch(() => {});
        return resolved;
      });
    },
    [key]
  );

  return [value, updateValue, isHydrated];
}
