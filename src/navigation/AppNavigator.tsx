import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParams } from '../types';
import { floatingNavigation, usesSideNavigation } from '../utils/layout';
import { AdaptiveTabBar } from '../components/AdaptiveTabBar';
import { colors } from '../theme';
import { Icon, IconName } from '../components/Icon';
import { CatalogScreen } from '../screens/CatalogScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { BookingScreen } from '../screens/BookingScreen';
import { CalculatorScreen } from '../screens/CalculatorScreen';
import { EquipmentScreen } from '../screens/EquipmentScreen';
import { LibraryScreen } from '../screens/LibraryScreen';
import { useMotion } from '../hooks/useMotion';
import { RulesScreen } from '../screens/RulesScreen';
const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParams>();
type Section =
  | 'Locations'
  | 'Training'
  | 'Equipment'
  | 'Creatures'
  | 'Calculator'
  | 'Rules';
const icons: Record<Section, IconName> = {
  Locations: 'pin',
  Training: 'training',
  Equipment: 'equipment',
  Creatures: 'fish',
  Calculator: 'calculator',
  Rules: 'shield',
};
function SectionStack({ section }: { section: Section }) {
  const motion = useMotion();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: motion ? 'slide_from_right' : 'none',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Catalog">
        {props =>
          section === 'Calculator' ? (
            <CalculatorScreen {...props} />
          ) : section === 'Equipment' ? (
            <EquipmentScreen {...props} />
          ) : section === 'Rules' ? (
            <RulesScreen {...props} />
          ) : (
            <CatalogScreen
              {...props}
              kind={
                section === 'Locations'
                  ? 'dive'
                  : section === 'Training'
                  ? 'course'
                  : 'creature'
              }
            />
          )
        }
      </Stack.Screen>
      <Stack.Screen name="Library" component={LibraryScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
    </Stack.Navigator>
  );
}
export function AppNavigator() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const rail = usesSideNavigation(
    width - insets.left - insets.right,
    height - insets.top - insets.bottom,
  );
  const motion = useMotion();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: colors.background,
      }}
    >
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: colors.background,
            card: colors.panel,
            text: colors.text,
            primary: colors.accent,
            border: colors.border,
          },
        }}
      >
        <Tabs.Navigator
          tabBar={props => <AdaptiveTabBar {...props} icons={icons} />}
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: rail,
            tabBarPosition: rail ? 'left' : 'bottom',
            tabBarLabelPosition: 'beside-icon',
            animation: motion ? 'fade' : 'none',
            tabBarActiveTintColor: colors.text,
            tabBarInactiveTintColor: colors.muted,
            tabBarAccessibilityLabel: route.name,
            tabBarItemStyle: rail ? undefined : { height: 50 },
            tabBarStyle: rail
              ? undefined
              : {
                  position: 'absolute',
                  bottom: floatingNavigation.bottom,
                  left: floatingNavigation.side,
                  right: floatingNavigation.side,
                  height: floatingNavigation.height,
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingHorizontal: 6,
                  backgroundColor: '#17596B',
                  borderRadius: 24,
                  borderWidth: 1,
                  borderTopWidth: 1,
                  borderColor: '#73BFCB',
                  borderTopColor: '#73BFCB',
                  shadowColor: '#062C3A',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 10,
                },
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: Math.min(
                    44,
                    (width -
                      insets.left -
                      insets.right -
                      floatingNavigation.side * 2 -
                      12) /
                      6,
                  ),
                  height: 44,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 14,
                  borderWidth: focused ? 1 : 0,
                  borderColor: '#C5F6F8',
                  backgroundColor: focused ? colors.accent : 'transparent',
                }}
              >
                <Icon
                  name={icons[route.name as Section]}
                  color={focused ? '#124658' : '#BDDFE6'}
                  size={24}
                />
              </View>
            ),
          })}
        >
          {(Object.keys(icons) as Section[]).map(section => (
            <Tabs.Screen key={section} name={section}>
              {() => <SectionStack section={section} />}
            </Tabs.Screen>
          ))}
        </Tabs.Navigator>
      </NavigationContainer>
    </View>
  );
}
