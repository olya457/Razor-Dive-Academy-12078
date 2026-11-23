import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../types';
import { locations } from '../data/locations';
import { courses } from '../data/courses';
import { styles as s } from '../theme';
import { Back, Button, Page, Title, reportError } from '../components/UI';
import { CostSummary, TripForm } from '../components/TripForm';
import { DatePicker } from '../components/DatePicker';
import { useApp } from '../store/AppStore';
import {
  conflicts,
  dateKey,
  dateLabel,
  emptyTrip,
  money,
  schedule,
} from '../utils/booking';
export function BookingScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParams, 'Booking'>) {
  const { kind, id, bookingId } = route.params;
  const { bookings, saveBooking } = useApp();
  const existing = bookings.find(b => b.id === bookingId);
  const item = (kind === 'dive' ? locations : courses).find(l => l.id === id);
  const first =
    existing && Date.parse(existing.dates[0]) > Date.now()
      ? new Date(existing.dates[0])
      : null;
  const [trip, setTrip] = useState(
    existing?.trip ??
      route.params.trip ?? {
        ...emptyTrip(),
        locationId: kind === 'dive' ? id : null,
      },
  );
  const [date, setDate] = useState(first ? dateKey(first) : '');
  const [time, setTime] = useState(
    first
      ? `${String(first.getHours()).padStart(2, '0')}:${String(
          first.getMinutes(),
        ).padStart(2, '0')}`
      : '',
  );
  const [saving, setSaving] = useState(false);
  const unavailable = (day: string, slot: string) => {
    const dates = schedule(day, slot, kind === 'dive' ? trip.dives : 1);
    return (
      Date.parse(dates[0]) <= Date.now() ||
      dates.some(
        d =>
          dateKey(new Date(d)) !== day ||
          (kind === 'dive' && new Date(d).getHours() >= 19),
      ) ||
      conflicts(dates, bookings, bookingId)
    );
  };
  const valid = !!date && !!time && !unavailable(date, time);
  const confirm = async () => {
    if (!valid || saving || !item) {
      return;
    }
    setSaving(true);
    try {
      await saveBooking({
        id:
          bookingId ??
          `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        kind,
        itemId: id,
        dates: schedule(date, time, kind === 'dive' ? trip.dives : 1),
        trip,
        createdAt: existing?.createdAt ?? new Date().toISOString(),
      });
      navigation.replace('Detail', { kind, id });
      Alert.alert(
        'Booking saved',
        `${item.name} · ${dateLabel(
          schedule(date, time, 1)[0],
        )}\nSaved on this device. Contact the club to confirm availability.`,
      );
    } catch (error) {
      reportError(error);
    } finally {
      setSaving(false);
    }
  };
  return (
    <Page>
      <Back onPress={() => navigation.goBack()} />
      <Title
        title={
          existing
            ? 'Edit Booking'
            : kind === 'dive'
            ? 'Book Dive'
            : 'Book Session'
        }
        subtitle={item?.name}
      />
      <DatePicker
        date={date}
        time={time}
        onDate={d => {
          setDate(d);
          setTime('');
        }}
        onTime={setTime}
        unavailable={unavailable}
        night={id === 'nightdivingskills'}
      />
      {kind === 'dive' && (
        <TripForm
          trip={trip}
          onChange={next => {
            setTrip(next);
            if (next.dives !== trip.dives) {
              setTime('');
            }
          }}
        />
      )}
      {valid && (
        <View style={s.panel}>
          <Text style={s.heading}>Your schedule</Text>
          {schedule(date, time, kind === 'dive' ? trip.dives : 1).map(
            (d, i) => (
              <Text key={d} style={s.text}>
                {kind === 'dive' ? `Dive ${i + 1} · ` : ''}
                {dateLabel(d)}
              </Text>
            ),
          )}
        </View>
      )}
      <Text style={s.label}>PRICE SUMMARY</Text>
      {kind === 'dive' ? (
        <CostSummary trip={trip} />
      ) : (
        <View style={[s.panel, s.between]}>
          <Text style={s.text}>Session total</Text>
          <Text style={s.heading}>{money(item?.price ?? 0)}</Text>
        </View>
      )}
      <Text style={s.muted}>
        Bookings are stored on this device. Location, equipment and instructor
        availability must be confirmed with the club. Your existing bookings are
        checked for schedule conflicts.
      </Text>
      {!valid && (
        <Text style={s.muted}>
          Select an available date and time to confirm.
        </Text>
      )}
      <Button
        title={saving ? 'Saving…' : 'Confirm Booking'}
        disabled={!valid || saving}
        onPress={() => {
          confirm();
        }}
      />
    </Page>
  );
}
