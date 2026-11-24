import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  useWindowDimensions,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, styles as s } from '../theme';
import { Icon } from './Icon';
import { useIsFocused } from '@react-navigation/native';
import { OceanMotion, ScreenEntrance } from './OceanMotion';
import {
  floatingNavigation,
  layoutMetrics,
  usesSideNavigation,
} from '../utils/layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMotion } from '../hooks/useMotion';
export function reportError(error: unknown) {
  Alert.alert(
    'Unable to save',
    error instanceof Error ? error.message : 'Please try again.',
  );
}
export function Page({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  const focused = useIsFocused();
  const [width, setWidth] = useState(320);
  const {
    fontScale,
    width: windowWidth,
    height: windowHeight,
  } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const rail = usesSideNavigation(
    windowWidth - insets.left - insets.right,
    windowHeight - insets.top - insets.bottom,
  );
  const layout = layoutMetrics(width, fontScale, wide);
  return (
    <View
      style={s.page}
      onLayout={event => setWidth(event.nativeEvent.layout.width)}
    >
      <OceanMotion enabled={focused} />
      <ScreenEntrance>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            s.content,
            {
              padding: layout.padding,
              paddingBottom: rail
                ? 28
                : floatingNavigation.height + floatingNavigation.bottom + 24,
              maxWidth: wide ? 1080 : 760,
            },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </ScreenEntrance>
    </View>
  );
}
export function Title({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={{ gap: 7 }}>
      <Text accessibilityRole="header" style={s.title}>
        {title}
      </Text>
      {subtitle && <Text style={s.muted}>{subtitle}</Text>}
    </View>
  );
}
export function Button({
  title,
  onPress,
  disabled = false,
  secondary = false,
  danger = false,
  style,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  secondary?: boolean;
  danger?: boolean;
  style?: ViewStyle;
}) {
  const motion = useMotion();
  const scale = useRef(new Animated.Value(1)).current;
  const press = (value: number) => {
    Animated.spring(scale, {
      toValue: motion ? value : 1,
      speed: 30,
      bounciness: 3,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Pressable
      onPressIn={() => press(0.97)}
      onPressOut={() => press(1)}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          opacity: disabled ? 0.45 : 1,
          borderRadius: 5,
          overflow: 'hidden',
          minHeight: 48,
          flexShrink: 0,
        },
        style,
      ]}
    >
      <Animated.View
        collapsable={false}
        style={{
          transform: [{ scale }],
          minHeight: 48,
          paddingHorizontal: 12,
          paddingVertical: 12,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          overflow: 'hidden',
          borderWidth: secondary ? 1 : 0,
          borderColor: danger ? colors.red : colors.border,
        }}
      >
        <LinearGradient
          pointerEvents="none"
          colors={
            secondary
              ? [colors.panel, colors.card]
              : [colors.accent, colors.accentEnd]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Text
          style={{
            color: secondary ? colors.text : colors.dark,
            fontSize: 15,
            lineHeight: 22,
            fontWeight: '600',
            textAlign: 'center',
            flexShrink: 1,
          }}
        >
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
export function Back({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      style={[s.row, { minHeight: 44, alignSelf: 'flex-start' }]}
    >
      <Icon name="back" size={18} />
      <Text style={s.text}>Back</Text>
    </Pressable>
  );
}
export function Hero({
  image,
  square = false,
}: {
  image: ImageSourcePropType;
  square?: boolean;
}) {
  return (
    <View style={[s.imageFrame, { aspectRatio: square ? 1 : 1.5 }]}>
      <Image
        source={image}
        style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]}
        resizeMode="cover"
      />
    </View>
  );
}
export function Option({
  title,
  detail,
  selected,
  onPress,
  disabled = false,
}: {
  title: string;
  detail?: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[
        s.panel,
        s.row,
        { padding: 12, minHeight: 50 },
        selected && {
          backgroundColor: colors.selected,
          borderColor: colors.accent,
        },
        disabled && { opacity: 0.4 },
      ]}
    >
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={s.text}>{title}</Text>
        {detail && <Text style={s.muted}>{detail}</Text>}
      </View>
      <Text style={{ fontSize: 22, color: colors.accent }}>
        {selected ? '✓' : '○'}
      </Text>
    </Pressable>
  );
}
export function Stepper({
  label,
  value,
  min = 1,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <View style={[s.panel, s.row, { flexWrap: 'wrap', padding: 12 }]}>
      <Text style={[s.text, { flex: 1, minWidth: 100 }]}>{label}</Text>
      <View style={s.row}>
        <Button
          title="−"
          disabled={value <= min}
          onPress={() => onChange(value - 1)}
          style={{ width: 44 }}
        />
        <Text
          accessibilityLabel={`${label}: ${value}`}
          style={[s.heading, { minWidth: 20, textAlign: 'center' }]}
        >
          {value}
        </Text>
        <Button
          title="+"
          disabled={value >= max}
          onPress={() => onChange(value + 1)}
          style={{ width: 44 }}
        />
      </View>
    </View>
  );
}
export function Stats({ items }: { items: [string, string][] }) {
  return (
    <View style={[s.row, { alignItems: 'stretch', flexWrap: 'wrap' }]}>
      {items.map(([label, value]) => (
        <View key={label} style={[s.card, { flex: 1, minWidth: 85, gap: 6 }]}>
          <Text style={[s.muted, { fontSize: 12 }]}>{label}</Text>
          <Text style={[s.text, { fontWeight: '600', fontSize: 14 }]}>
            {value}
          </Text>
        </View>
      ))}
    </View>
  );
}
export function Countdown({ date }: { date: string }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const seconds = Math.max(0, Math.floor((Date.parse(date) - now) / 1000));
  if (!seconds) {
    return <Text style={s.muted}>Scheduled time reached</Text>;
  }
  return (
    <View style={[s.row, { gap: 6 }]}>
      {[
        Math.floor(seconds / 86400),
        Math.floor(seconds / 3600) % 24,
        Math.floor(seconds / 60) % 60,
        seconds % 60,
      ].map((v, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: colors.background,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 3,
            paddingVertical: 10,
          }}
        >
          <Text style={s.heading}>{String(v).padStart(2, '0')}</Text>
          <Text style={[s.muted, { fontSize: 11 }]}>
            {['days', 'hours', 'min', 'sec'][i]}
          </Text>
        </View>
      ))}
    </View>
  );
}
export function Stars({ count }: { count: number }) {
  return (
    <Text
      accessibilityLabel={`Caution indicator ${count} of 5`}
      style={{ color: colors.red, fontSize: 22 }}
    >
      {'★'.repeat(count)}
      <Text style={{ color: colors.border }}>{'☆'.repeat(5 - count)}</Text>
    </Text>
  );
}
