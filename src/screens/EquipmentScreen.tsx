import React, { useRef, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../types';
import { equipment } from '../data/equipment';
import { locations } from '../data/locations';
import { styles as s } from '../theme';
import {
  Button,
  Hero,
  Option,
  Page,
  Title,
  reportError,
} from '../components/UI';
import { LocationPicker } from '../components/TripForm';
import { useApp } from '../store/AppStore';
import { dateLabel, emptyTrip, money } from '../utils/booking';
export function EquipmentScreen({
  navigation,
}: NativeStackScreenProps<RootStackParams, 'Catalog'>) {
  const [cardWidth, setCardWidth] = useState(280);
  const [index, setIndex] = useState(0);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const list = useRef<FlatList>(null);
  const { bookings, saveBooking } = useApp();
  const active = bookings.filter(
    b => b.kind === 'dive' && b.dates.every(d => Date.parse(d) > Date.now()),
  );
  const selected = equipment[index];
  const move = (next: number) => {
    list.current?.scrollToOffset({ offset: next * cardWidth, animated: true });
    setIndex(next);
  };
  return (
    <Page>
      <Title
        title="Equipment Rental"
        subtitle="Swipe to compare four scuba sets."
      />
      <View style={s.between}>
        <Button
          title="‹"
          secondary
          disabled={index === 0}
          onPress={() => move(index - 1)}
        />
        <Text style={s.heading}>{index + 1} / 4</Text>
        <Button
          title="›"
          secondary
          disabled={index === 3}
          onPress={() => move(index + 1)}
        />
      </View>
      <View
        onLayout={event =>
          setCardWidth(Math.max(1, event.nativeEvent.layout.width))
        }
      >
        <FlatList
          key={cardWidth}
          ref={list}
          data={equipment}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={index}
          getItemLayout={(_, i) => ({
            length: cardWidth,
            offset: cardWidth * i,
            index: i,
          })}
          onMomentumScrollEnd={e =>
            setIndex(
              Math.max(
                0,
                Math.min(
                  3,
                  Math.round(e.nativeEvent.contentOffset.x / cardWidth),
                ),
              ),
            )
          }
          keyExtractor={e => e.id}
          renderItem={({ item }) => (
            <View style={{ width: cardWidth }}>
              <View style={s.card}>
                <Hero image={item.image} />
                <View style={s.between}>
                  <Text style={s.heading}>{item.name}</Text>
                  <Text style={s.heading}>{money(item.price)}</Text>
                </View>
                <Text style={s.muted}>per set, per dive</Text>
                <Text style={s.text}>{item.summary}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View style={s.card}>
        {selected.specs.map(([label, value]) => (
          <View key={label} style={[s.line, { gap: 5 }]}>
            <Text style={s.muted}>{label}</Text>
            <Text style={s.text}>{value}</Text>
          </View>
        ))}
        <Text style={s.text}>{selected.description}</Text>
      </View>
      {active.map(b => (
        <View key={b.id} style={s.panel}>
          <Text style={s.muted}>
            {locations.find(l => l.id === b.itemId)?.name} ·{' '}
            {dateLabel(b.dates[0])}
          </Text>
          <Option
            title="Reserve for My Dive"
            detail={`${b.trip.rentalSets} set(s) · selecting this set replaces the current rental`}
            selected={b.trip.equipmentId === selected.id}
            disabled={busy}
            onPress={() => {
              setBusy(true);
              saveBooking({
                ...b,
                trip: {
                  ...b.trip,
                  equipmentId:
                    b.trip.equipmentId === selected.id ? null : selected.id,
                },
              })
                .catch(reportError)
                .finally(() => setBusy(false));
            }}
          />
        </View>
      ))}
      <Text style={s.label}>BOOK A DIVE WITH THIS SET</Text>
      <LocationPicker value={locationId} onChange={setLocationId} />
      <Button
        title="Book a Dive with This Set"
        disabled={!locationId}
        onPress={() => {
          if (locationId) {
            navigation.navigate('Booking', {
              kind: 'dive',
              id: locationId,
              trip: { ...emptyTrip(), locationId, equipmentId: selected.id },
            });
          }
        }}
      />
    </Page>
  );
}
