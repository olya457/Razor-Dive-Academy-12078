import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles as s } from '../theme';
import { Button } from './UI';
import { dateKey } from '../utils/booking';
export function DatePicker({
  date,
  time,
  onDate,
  onTime,
  unavailable,
  night = false,
}: {
  date: string;
  time: string;
  onDate: (date: string) => void;
  onTime: (time: string) => void;
  unavailable: (date: string, time: string) => boolean;
  night?: boolean;
}) {
  const [week, setWeek] = useState(0);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + week * 7 + i);
    return d;
  });
  return (
    <>
      <View style={s.between}>
        <Text style={s.text}>Select a date</Text>
        <View style={s.row}>
          <Button
            title="‹"
            secondary
            disabled={week === 0}
            onPress={() => setWeek(week - 1)}
          />
          <Button
            title="›"
            secondary
            disabled={week === 51}
            onPress={() => setWeek(week + 1)}
          />
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        {days.map(d => (
          <Button
            key={dateKey(d)}
            secondary={date !== dateKey(d)}
            title={`${d.toLocaleDateString('en-GB', {
              weekday: 'short',
            })}\n${d.getDate()}\n${d.toLocaleDateString('en-GB', {
              month: 'short',
            })}`}
            onPress={() => onDate(dateKey(d))}
            style={{ minWidth: 58 }}
          />
        ))}
      </ScrollView>
      <Text style={s.text}>Available time slots</Text>
      {!date ? (
        <Text style={s.muted}>Choose a date to see available times.</Text>
      ) : (
        <View style={[s.row, { flexWrap: 'wrap' }]}>
          {(night
            ? ['18:30', '20:30']
            : ['08:30', '10:30', '13:00', '15:30']
          ).map(t => (
            <Button
              key={t}
              title={t}
              secondary={time !== t}
              disabled={unavailable(date, t)}
              onPress={() => onTime(t)}
              style={{ width: '47%' }}
            />
          ))}
        </View>
      )}
    </>
  );
}
