import React from 'react';
import { Alert, Text, View } from 'react-native';
import { Booking } from '../types';
import { styles as s } from '../theme';
import { Button, Countdown, reportError } from './UI';
import { dateLabel, money } from '../utils/booking';
import { CostSummary } from './TripForm';
import { useApp } from '../store/AppStore';
import { courses } from '../data/courses';
import { equipment } from '../data/equipment';
export function BookingCard({
  booking,
  onEdit,
  onEquipment,
}: {
  booking: Booking;
  onEdit: () => void;
  onEquipment: () => void;
}) {
  const { cancelBooking } = useApp();
  const future = booking.dates.find(d => Date.parse(d) > Date.now());
  return (
    <View style={s.panel}>
      <Text style={s.heading}>✓ {future ? 'Booked' : 'Past booking'}</Text>
      {booking.dates.map((d, i) => (
        <Text key={d} style={s.text}>
          {booking.dates.length > 1 ? `Dive ${i + 1} · ` : ''}
          {dateLabel(d)}
        </Text>
      ))}
      {future && <Countdown date={future} />}
      {booking.kind === 'dive' ? (
        <>
          <Text style={s.muted}>
            {booking.trip.participants} participants · {booking.trip.dives}{' '}
            dives per person
          </Text>
          <Text style={s.text}>
            Equipment:{' '}
            {equipment.find(e => e.id === booking.trip.equipmentId)?.name ??
              'No rental'}
          </Text>
          <CostSummary trip={booking.trip} />
          {future && <Button title="Add Equipment" onPress={onEquipment} />}
        </>
      ) : (
        <Text style={s.heading}>
          {money(courses.find(c => c.id === booking.itemId)?.price ?? 0)}
        </Text>
      )}
      <View style={s.row}>
        <Button
          secondary
          title={future ? 'Edit' : 'Book Again'}
          onPress={onEdit}
          style={{ flex: 1 }}
        />
        <Button
          secondary
          danger
          title="Cancel"
          style={{ flex: 1 }}
          onPress={() =>
            Alert.alert(
              'Cancel this booking?',
              'The countdown and reserved equipment will be removed.',
              [
                { text: 'Keep', style: 'cancel' },
                {
                  text: 'Cancel booking',
                  style: 'destructive',
                  onPress: () => {
                    cancelBooking(booking.id).catch(reportError);
                  },
                },
              ],
            )
          }
        />
      </View>
    </View>
  );
}
