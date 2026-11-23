import { Booking, Trip } from '../types';
import { locations } from '../data/locations';
import { equipment } from '../data/equipment';

export const emptyTrip = (): Trip => ({
  locationId: null,
  participants: 1,
  dives: 1,
  transfer: false,
  equipmentId: null,
  rentalSets: 1,
  instructor: false,
});
export const money = (value: number) =>
  `€${Number.isInteger(value) ? value : value.toFixed(2)}`;
export function calculate(trip: Trip) {
  const diving =
    (locations.find(l => l.id === trip.locationId)?.price ?? 0) *
    trip.participants *
    trip.dives;
  const transfer = trip.transfer ? 15 * trip.participants : 0;
  const rental =
    (equipment.find(e => e.id === trip.equipmentId)?.price ?? 0) *
    trip.rentalSets *
    trip.dives;
  const instructor = trip.instructor ? 40 * trip.dives : 0;
  const total = diving + transfer + rental + instructor;
  return {
    diving,
    transfer,
    rental,
    instructor,
    total,
    average: total / trip.participants,
  };
}
export function schedule(date: string, time: string, count: number) {
  const start = new Date(`${date}T${time}:00`);
  return Array.from({ length: count }, (_, i) =>
    new Date(start.getTime() + i * 3 * 3600000).toISOString(),
  );
}
export function conflicts(
  dates: string[],
  bookings: Booking[],
  exceptId?: string,
) {
  return bookings.some(
    b =>
      b.id !== exceptId &&
      b.dates.some(a =>
        dates.some(
          d =>
            Math.abs(new Date(d).getTime() - new Date(a).getTime()) <
            2 * 3600000,
        ),
      ),
  );
}
export function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}`;
}
export const dateLabel = (value: string) =>
  new Date(value).toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
export function bookingError(booking: Booking, bookings: Booking[]) {
  const t = booking.trip;
  if (
    !booking.dates.length ||
    booking.dates.some(
      d => !Number.isFinite(Date.parse(d)) || Date.parse(d) <= Date.now(),
    )
  ) {
    return 'Choose a future date and time.';
  }
  if (conflicts(booking.dates, bookings, booking.id)) {
    return 'This schedule overlaps another booking. Please choose a different time.';
  }
  if (
    t.participants < 1 ||
    t.participants > 8 ||
    t.dives < 1 ||
    t.dives > 3 ||
    t.rentalSets < 1 ||
    t.rentalSets > t.participants
  ) {
    return 'Please check the group and equipment quantities.';
  }
  if (booking.dates.length !== (booking.kind === 'dive' ? t.dives : 1)) {
    return 'Please check the dive schedule.';
  }
  return null;
}
