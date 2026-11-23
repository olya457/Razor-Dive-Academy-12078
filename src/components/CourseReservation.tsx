import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import { styles } from '../theme';
import { Course } from '../types';
import { useApp } from '../store/AppStore';
import { conflicts, dateLabel, emptyTrip, schedule } from '../utils/booking';
import { DatePicker } from './DatePicker';
import { Button, reportError } from './UI';

export function CourseReservation({ course }: { course: Course }) {
  const { bookings, saveBooking } = useApp();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [busy, setBusy] = useState(false);
  const unavailable = (day: string, slot: string) => {
    const dates = schedule(day, slot, 1);
    return Date.parse(dates[0]) <= Date.now() || conflicts(dates, bookings);
  };
  const valid = !!date && !!time && !unavailable(date, time);
  const confirm = async () => {
    if (!valid || busy) {
      return;
    }
    setBusy(true);
    try {
      const dates = schedule(date, time, 1);
      await saveBooking({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        kind: 'course',
        itemId: course.id,
        dates,
        trip: emptyTrip(),
        createdAt: new Date().toISOString(),
      });
      Alert.alert(
        'Session saved',
        `${course.name} · ${dateLabel(
          dates[0],
        )}\nSaved on this device. Contact the club to confirm availability.`,
      );
    } catch (error) {
      reportError(error);
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <DatePicker
        date={date}
        time={time}
        onDate={day => {
          setDate(day);
          setTime('');
        }}
        onTime={setTime}
        unavailable={unavailable}
        night={course.id === 'nightdivingskills'}
      />
      <Text style={styles.muted}>
        Saved on this device. Confirm session availability with the club.
      </Text>
      <Button
        title={busy ? 'Saving…' : 'Book Session'}
        disabled={!valid || busy}
        onPress={() => {
          confirm();
        }}
      />
    </>
  );
}
