import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../types';
import { locations } from '../data/locations';
import { courses } from '../data/courses';
import { creatures } from '../data/creatures';
import { colors, styles as s } from '../theme';
import { Button, Countdown, Hero, Page, Stars, Title } from '../components/UI';
import { useApp } from '../store/AppStore';
import { gridItemWidth, layoutMetrics } from '../utils/layout';
import { dateLabel, money } from '../utils/booking';
type Props = NativeStackScreenProps<RootStackParams, 'Catalog'> & {
  kind: 'dive' | 'course' | 'creature';
};
export function CatalogScreen({ navigation, kind }: Props) {
  const [gridWidth, setGridWidth] = useState(280);
  const { fontScale } = useWindowDimensions();
  const columns =
    kind === 'creature' && fontScale < 1.4
      ? Math.max(1, Math.min(4, Math.floor((gridWidth + 16) / 170)))
      : layoutMetrics(gridWidth + 40, fontScale, true).columns;
  const [filter, setFilter] = useState('All');
  const { bookings } = useApp();
  const heading =
    kind === 'dive'
      ? ['Dive Locations', 'Twelve sites across reefs, caves and shipwrecks.']
      : kind === 'course'
      ? [
          'Diver Training',
          'Eight sessions from first breaths to rescue skills.',
        ]
      : ['Marine Creatures', 'Eight animals to be cautious around.'];
  const items =
    kind === 'dive'
      ? locations.filter(l => filter === 'All' || l.category === filter)
      : kind === 'course'
      ? courses
      : creatures;
  return (
    <Page wide>
      <Title title={heading[0]} subtitle={heading[1]} />
      {kind === 'course' && (
        <Button
          title="Explore the Learning Library ↗"
          onPress={() => navigation.navigate('Library')}
        />
      )}
      {kind === 'dive' && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {['All', 'Reefs', 'Caves', 'Shipwrecks'].map(f => (
            <Button
              key={f}
              title={f}
              secondary={filter !== f}
              onPress={() => setFilter(f)}
            />
          ))}
        </ScrollView>
      )}
      {kind === 'creature' && (
        <View style={s.panel}>
          <Text style={s.muted}>
            Red stars are an educational caution indicator only. More stars
            suggest greater care is needed around the animal.
          </Text>
        </View>
      )}
      <View
        onLayout={event => setGridWidth(event.nativeEvent.layout.width)}
        style={{
          gap: 16,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'stretch',
        }}
      >
        {items.map(item => {
          const booking = bookings.find(
            b =>
              b.kind === kind &&
              b.itemId === item.id &&
              b.dates.some(d => Date.parse(d) > Date.now()),
          );
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={item.name}
              key={item.id}
              onPress={() =>
                navigation.navigate('Detail', { kind, id: item.id })
              }
              style={[
                s.card,
                { width: gridItemWidth(gridWidth, columns) },
                booking && {
                  borderColor: colors.accent,
                  borderWidth: 2,
                  backgroundColor: '#469FAC',
                },
              ]}
            >
              <Hero image={item.image} square={kind === 'dive'} />
              <View style={s.between}>
                <Text
                  style={[s.heading, kind === 'creature' && { fontSize: 15 }]}
                >
                  {item.name}
                </Text>
                {'price' in item && (
                  <Text style={s.heading}>{money(item.price)}</Text>
                )}
              </View>
              {'category' in item && (
                <Text style={s.muted}>
                  ◷ {item.duration} min · {item.level} · {item.category}
                </Text>
              )}
              {'summary' in item && kind === 'course' && (
                <>
                  <Text style={s.badge}>
                    {'level' in item ? item.level : ''}
                  </Text>
                  <Text style={s.text}>{item.summary}</Text>
                </>
              )}
              {'danger' in item && <Stars count={item.danger} />}
              {booking && (
                <>
                  <Text style={s.text}>
                    ✓ Booked · {dateLabel(booking.dates[0])}
                  </Text>
                  {kind === 'dive' && (
                    <Countdown
                      date={
                        booking.dates.find(d => Date.parse(d) > Date.now()) ??
                        booking.dates[0]
                      }
                    />
                  )}
                </>
              )}
            </Pressable>
          );
        })}
      </View>
    </Page>
  );
}
