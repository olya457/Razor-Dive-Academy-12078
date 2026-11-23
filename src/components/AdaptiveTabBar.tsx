import React from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, IconName } from './Icon';
import { colors } from '../theme';
import { usesSideNavigation } from '../utils/layout';

export function AdaptiveTabBar({
  icons,
  ...props
}: BottomTabBarProps & { icons: Record<string, IconName> }) {
  const { width, height, fontScale } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const availableWidth = width - insets.left - insets.right;
  const availableHeight = height - insets.top - insets.bottom;
  if (!usesSideNavigation(availableWidth, availableHeight)) {
    return <BottomTabBar {...props} />;
  }
  const showLabels =
    availableWidth >= 900 && availableHeight >= 500 && fontScale < 1.6;
  return (
    <View
      style={{
        width: showLabels ? 180 : 80,
        backgroundColor: '#17596B',
        borderRightWidth: 1,
        borderRightColor: '#73BFCB',
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 12,
          gap: 8,
          flexGrow: 1,
          justifyContent: availableHeight >= 400 ? 'center' : 'flex-start',
        }}
      >
        {props.state.routes.map((route, index) => {
          const focused = index === props.state.index;
          const options = props.descriptors[route.key].options;
          const label = options.title ?? route.name;
          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
              accessibilityState={{ selected: focused }}
              onPress={() => {
                const event = props.navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!focused && !event.defaultPrevented) {
                  props.navigation.navigate(route.name, route.params);
                }
              }}
              onLongPress={() =>
                props.navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                })
              }
              style={({ pressed }) => ({
                minHeight: 48,
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: showLabels ? 'flex-start' : 'center',
                gap: 10,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: focused ? '#C5F6F8' : 'transparent',
                backgroundColor: focused ? colors.accent : 'transparent',
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Icon
                name={icons[route.name]}
                color={focused ? colors.dark : '#BDDFE6'}
                size={24}
              />
              {showLabels && (
                <Text
                  style={{
                    flexShrink: 1,
                    fontSize: 14,
                    fontWeight: focused ? '600' : '400',
                    color: focused ? colors.dark : colors.text,
                  }}
                >
                  {label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
