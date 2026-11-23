import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useMotion } from '../hooks/useMotion';
import { colors } from '../theme';

export function OceanMotion({ enabled = true }: { enabled?: boolean }) {
  const motion = useMotion();
  const phase = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!motion || !enabled) {
      return;
    }
    const loop = Animated.loop(
      Animated.timing(phase, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
        isInteraction: false,
      }),
    );
    loop.start();
    return () => {
      loop.stop();
      phase.setValue(0);
    };
  }, [motion, enabled, phase]);
  return (
    <View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={StyleSheet.absoluteFill}
    >
      {[0, 1, 2, 3, 4].map(i => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            left: `${8 + i * 21}%`,
            bottom: -30 + i * 35,
            width: 12 + i * 4,
            height: 12 + i * 4,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: colors.accent,
            opacity:
              motion && enabled
                ? phase.interpolate({
                    inputRange: [0, 0.15, 0.8, 1],
                    outputRange: [0, 0.14, 0.1, 0],
                  })
                : 0.06,
            transform: [
              {
                translateY: phase.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -650],
                }),
              },
              {
                translateX: phase.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, i % 2 ? 30 : -30, 0],
                }),
              },
            ],
          }}
        />
      ))}
    </View>
  );
}
export function ScreenEntrance({ children }: { children: React.ReactNode }) {
  const focused = useIsFocused();
  return <Entrance enabled={focused}>{children}</Entrance>;
}
export function Entrance({
  children,
  enabled = true,
  fill = true,
}: {
  children: React.ReactNode;
  enabled?: boolean;
  fill?: boolean;
}) {
  const motion = useMotion();
  const progress = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!motion || !enabled) {
      progress.setValue(1);
      return;
    }
    progress.setValue(0);
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: 480,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
      isInteraction: false,
    });
    animation.start();
    return () => animation.stop();
  }, [enabled, motion, progress]);
  return (
    <Animated.View
      style={{
        flex: fill ? 1 : undefined,
        opacity: progress,
        transform: [
          {
            translateY: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 0],
            }),
          },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
}
