import React, { useEffect, useRef } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { colors } from '../theme';
import { OceanMotion } from '../components/OceanMotion';
const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;background:transparent;overflow:hidden;height:100%}.loader{position:absolute;left:50%;top:50%;width:32px;height:32px;margin:-16px;border:3px solid ${colors.border};border-top-color:${colors.accent};border-right-color:${colors.accent};border-radius:50%;animation:spin 1s linear infinite,pulse 2s ease-in-out infinite}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{box-shadow:0 0 25px ${colors.accentEnd}}}@media(prefers-reduced-motion:reduce){.loader{animation:none}}</style></head><body><div class="loader"></div><script>setTimeout(function(){window.ReactNativeWebView.postMessage('finished')},4000)</script></body></html>`;
export function SplashScreen({ onFinished }: { onFinished: () => void }) {
  const { width, height } = useWindowDimensions();
  const logoSize = Math.max(80, Math.min(width - 64, height * 0.42, 340));
  const done = useRef(false);
  const callback = useRef(onFinished);
  callback.current = onFinished;
  const finish = () => {
    if (!done.current) {
      done.current = true;
      callback.current();
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!done.current) {
        done.current = true;
        callback.current();
      }
    }, 6500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View
      style={[StyleSheet.absoluteFill, { backgroundColor: colors.background }]}
    >
      <OceanMotion />
      <View style={s.brand}>
        <View style={[s.logoFrame, { width: logoSize, height: logoSize }]}>
          <Image
            source={require('../assets/aquaquest-splash-logo.png')}
            accessibilityLabel="Морская черепаха и затонувший корабль"
            style={s.logo}
            resizeMode="contain"
          />
        </View>
        <Text
          accessibilityRole="header"
          style={{
            color: colors.accent,
            fontSize: 40,
            lineHeight: 48,
            fontWeight: '700',
            textAlign: 'center',
          }}
        >
          AquaQuest Diving
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: '7%',
          width: 90,
          height: 90,
          alignSelf: 'center',
        }}
      >
        <WebView
          source={{ html }}
          style={{ backgroundColor: 'transparent' }}
          opaque={false}
          scrollEnabled={false}
          originWhitelist={['about:blank']}
          onMessage={e => {
            if (e.nativeEvent.data === 'finished') {
              finish();
            }
          }}
          onError={() => {
            setTimeout(finish, 4000);
          }}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  brand: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 150,
    gap: 28,
  },
  logoFrame: {
    borderRadius: 28,
    borderWidth: 2,
    borderColor: colors.accent,
    padding: 4,
    backgroundColor: colors.panel,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 16,
        spreadDistance: 2,
        color: 'rgba(145, 221, 182, 0.35)',
      },
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 36,
        spreadDistance: 6,
        color: 'rgba(107, 201, 154, 0.18)',
      },
    ],
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },
});
