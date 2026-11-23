import React, { createContext, useContext, useEffect, useState } from 'react';
import { AccessibilityInfo, AppState } from 'react-native';
function useMotionPreference() {
  const [reduced, setReduced] = useState(true);
  const [active, setActive] = useState(AppState.currentState === 'active');
  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then(value => {
        if (mounted) {
          setReduced(value);
        }
      })
      .catch(() => {});
    const motion = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduced,
    );
    const state = AppState.addEventListener('change', value =>
      setActive(value === 'active'),
    );
    return () => {
      mounted = false;
      motion.remove();
      state.remove();
    };
  }, []);
  return !reduced && active;
}

const MotionContext = createContext(false);
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const motion = useMotionPreference();
  return (
    <MotionContext.Provider value={motion}>{children}</MotionContext.Provider>
  );
}
export function useMotion() {
  return useContext(MotionContext);
}
