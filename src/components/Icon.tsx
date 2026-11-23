import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { colors } from '../theme';
export type IconName =
  | 'pin'
  | 'training'
  | 'equipment'
  | 'fish'
  | 'calculator'
  | 'shield'
  | 'share'
  | 'back';
export function Icon({
  name,
  color = colors.muted,
  size = 24,
}: {
  name: IconName;
  color?: string;
  size?: number;
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === 'pin' && (
        <>
          <Path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
          <Circle cx="12" cy="10" r="3" />
        </>
      )}
      {name === 'training' && (
        <Path d="m2 8 10-5 10 5-10 5L2 8Zm4 3v6c4 3 8 3 12 0v-6M22 8v8" />
      )}
      {name === 'equipment' && (
        <>
          <Rect x="6" y="6" width="10" height="16" rx="4" />
          <Path d="M9 6V3h4v3M8 3h6M6 12h10M6 17h10M13 4h4a3 3 0 0 1 3 3v6" />
          <Circle cx="20" cy="15" r="2" />
        </>
      )}
      {name === 'fish' && (
        <>
          <Path d="M21 12c-4-7-11-7-15 0 4 7 11 7 15 0ZM6 12 2 8v8l4-4M15 7c-2 3-2 7 0 10M9 7l3-3 3 3M9 17l3 3 3-3" />
          <Circle cx="17" cy="11" r="0.7" />
        </>
      )}
      {name === 'calculator' && (
        <>
          <Rect x="5" y="2" width="14" height="20" rx="2" />
          <Path d="M8 6h8M8 10h1m3 0h1m3 0h.1M8 14h1m3 0h1m3 0h.1M8 18h1m3 0h1m3 0h.1" />
        </>
      )}
      {name === 'shield' && (
        <>
          <Path d="m12 2 8 4v7c0 5-8 9-8 9s-8-4-8-9V6l8-4Z" />
          <Path d="m8 12 3 3 5-6" />
        </>
      )}
      {name === 'share' && (
        <>
          <Circle cx="18" cy="4" r="3" />
          <Circle cx="5" cy="12" r="3" />
          <Circle cx="18" cy="20" r="3" />
          <Path d="m8 10 7-4M8 14l7 4" />
        </>
      )}
      {name === 'back' && <Path d="m15 5-7 7 7 7" />}
    </Svg>
  );
}
