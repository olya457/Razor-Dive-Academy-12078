import React, { useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/store/AppStore';
import { AppNavigator } from './src/navigation/AppNavigator';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { MotionProvider } from './src/hooks/useMotion';
import { styles } from './src/theme';
function Content() {
  const [loaded, setLoaded] = useState(false);
  const { ready, onboarded, error } = useApp();
  if (!loaded || !ready) {
    return <SplashScreen onFinished={() => setLoaded(true)} />;
  }
  if (error) {
    return (
      <View style={[styles.page, { padding: 24 }]}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  }
  return onboarded ? <AppNavigator /> : <OnboardingScreen />;
}
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <MotionProvider>
        <AppProvider>
          <Content />
        </AppProvider>
      </MotionProvider>
    </SafeAreaProvider>
  );
}
