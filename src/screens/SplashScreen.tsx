import React, { useEffect, useRef } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;background:transparent;overflow:hidden;height:100%}.loader{position:absolute;left:50%;top:50%;width:32px;height:32px;margin:-16px;border:3px solid rgba(136,217,225,.25);border-top-color:#ef453c;border-right-color:#ef453c;border-radius:50%;animation:spin 1s linear infinite,pulse 2s ease-in-out infinite}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{box-shadow:0 0 25px #f34e48}}@media(prefers-reduced-motion:reduce){.loader{animation:none}}</style></head><body><div class="loader"></div><script>setTimeout(function(){window.ReactNativeWebView.postMessage('finished')},4000)</script></body></html>`;
export function SplashScreen({ onFinished }: { onFinished: () => void }) {
  const { width } = useWindowDimensions();
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
    <ImageBackground
      source={require('../assets/razor-dive-splash.png')}
      style={StyleSheet.absoluteFill}
      resizeMode="cover"
    >
      <View
        style={{
          position: 'absolute',
          top: '16%',
          alignSelf: 'center',
          width: Math.min(width - 24, 480),
          aspectRatio: 363 / 172,
        }}
      >
        <Image
          source={require('../assets/razor-dive-logo.png')}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
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
    </ImageBackground>
  );
}
