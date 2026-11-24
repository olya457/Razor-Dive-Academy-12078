import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, styles as s } from '../theme';
import { Button, reportError } from '../components/UI';
import { Entrance, OceanMotion } from '../components/OceanMotion';
import { useApp } from '../store/AppStore';
const slides = [
  {
    title: 'Discover Your Next Dive',
    text: 'Explore 12 dive locations, from colourful reefs to caves and shipwrecks. Find a site that matches your experience.',
    image: require('../assets/onboarding-discover.png'),
  },
  {
    title: 'Book Your Underwater Adventure',
    text: 'Choose a date and time for your dive, arrange your transfer and follow the countdown to your next adventure.',
    image: require('../assets/onboarding-adventure.png'),
  },
  {
    title: 'Learn and Gear Up',
    text: 'Explore eight training sessions and choose from four equipment sets. Add your gear directly to your dive booking.',
    image: require('../assets/onboarding-training.png'),
  },
  {
    title: 'Prepare Before You Dive',
    text: 'Learn about marine creatures, review underwater rules and calculate your trip cost before booking.',
    image: require('../assets/onboarding-prepare.png'),
  },
];
export function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const [viewport, setViewport] = useState({ width: 280, height: 300 });
  const { fontScale } = useWindowDimensions();
  const split = viewport.width >= 620 && fontScale < 1.6;
  const { finishOnboarding } = useApp();
  const slide = slides[index];
  const finish = () => {
    finishOnboarding().catch(reportError);
  };
  const imageHeight = split
    ? Math.max(120, Math.min(viewport.height - 40, 420))
    : Math.max(100, Math.min(viewport.height * 0.52, viewport.width, 360));
  return (
    <SafeAreaView style={s.page}>
      <OceanMotion />
      <View
        style={{
          flex: 1,
          width: '100%',
          maxWidth: 1080,
          alignSelf: 'center',
          paddingHorizontal: 16,
        }}
      >
        <View
          style={[
            s.between,
            { paddingTop: 12, paddingBottom: 8, flexShrink: 0 },
          ]}
        >
          {index > 0 ? (
            <Button
              title="‹ Back"
              secondary
              onPress={() => setIndex(index - 1)}
            />
          ) : (
            <View />
          )}
          <Button title="Skip" secondary onPress={finish} />
        </View>
        <ScrollView
          style={{ flex: 1, minHeight: 0 }}
          contentContainerStyle={{ paddingTop: 12, paddingBottom: 24 }}
          onLayout={event => {
            const { width, height } = event.nativeEvent.layout;
            setViewport({ width, height });
          }}
          showsVerticalScrollIndicator={false}
        >
          <Entrance key={index} fill={false}>
            <View
              style={{
                flexDirection: split ? 'row' : 'column',
                gap: split ? 28 : 20,
                alignItems: split ? 'center' : 'stretch',
              }}
            >
              <Image
                source={slide.image}
                style={{
                  width: split ? '46%' : '100%',
                  height: imageHeight,
                  borderRadius: 12,
                  flexShrink: 0,
                }}
                resizeMode="cover"
              />
              <View style={{ flex: split ? 1 : undefined, gap: 18 }}>
                <View style={s.row}>
                  {slides.map((_, i) => (
                    <View
                      key={i}
                      style={{
                        width: 32,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor:
                          i === index ? colors.accent : colors.border,
                      }}
                    />
                  ))}
                </View>
                <Text
                  style={[
                    s.title,
                    {
                      fontSize: viewport.width < 360 ? 26 : 30,
                      lineHeight: 37,
                    },
                  ]}
                >
                  {slide.title}
                </Text>
                <Text style={[s.text, { fontSize: 17, lineHeight: 28 }]}>
                  {slide.text}
                </Text>
              </View>
            </View>
          </Entrance>
        </ScrollView>
        <View style={{ flexShrink: 0, paddingTop: 12, paddingBottom: 20 }}>
          <Button
            title={index === 3 ? 'Explore Dives' : 'Next'}
            onPress={() => (index === 3 ? finish() : setIndex(index + 1))}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
