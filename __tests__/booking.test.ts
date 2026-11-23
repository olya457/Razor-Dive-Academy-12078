import {
  bookingError,
  calculate,
  conflicts,
  emptyTrip,
  schedule,
} from '../src/utils/booking';
import { Booking } from '../src/types';
import { locations } from '../src/data/locations';
import { courses } from '../src/data/courses';
import { creatures } from '../src/data/creatures';
import { equipment } from '../src/data/equipment';
import { rules } from '../src/data/rules';
const trip = {
  ...emptyTrip(),
  locationId: 'coralgarden',
  participants: 2,
  dives: 2,
  transfer: true,
  equipmentId: 'reef',
  rentalSets: 2,
  instructor: true,
};
const booking: Booking = {
  id: 'one',
  kind: 'dive',
  itemId: 'coralgarden',
  dates: schedule('2099-05-10', '08:30', 2),
  trip,
  createdAt: new Date().toISOString(),
};
test('matches the supplied €470 group example', () => {
  expect(calculate(trip)).toEqual({
    diving: 260,
    transfer: 30,
    rental: 100,
    instructor: 80,
    total: 470,
    average: 235,
  });
});
test('charges only selected rental sets and charges transfer once', () => {
  expect(calculate({ ...trip, rentalSets: 1 }).total).toBe(420);
  expect(
    calculate({
      ...trip,
      equipmentId: null,
      instructor: false,
      transfer: false,
    }).total,
  ).toBe(260);
  expect(calculate(emptyTrip()).total).toBe(0);
});
test('builds all dives and rejects overlapping personal schedules', () => {
  expect(booking.dates).toHaveLength(2);
  expect(Date.parse(booking.dates[1]) - Date.parse(booking.dates[0])).toBe(
    3 * 3600000,
  );
  expect(conflicts(schedule('2099-05-10', '10:30', 1), [booking])).toBe(true);
  expect(conflicts(booking.dates, [booking], 'one')).toBe(false);
  expect(conflicts(schedule('2099-05-11', '08:30', 1), [booking])).toBe(false);
});
test('validates dates, quantities and schedule length', () => {
  expect(bookingError(booking, [])).toBeNull();
  expect(
    bookingError({ ...booking, dates: ['2001-01-01T00:00:00Z'] }, []),
  ).toBeTruthy();
  expect(
    bookingError({ ...booking, trip: { ...trip, rentalSets: 3 } }, []),
  ).toBeTruthy();
  expect(
    bookingError({ ...booking, dates: booking.dates.slice(0, 1) }, []),
  ).toBeTruthy();
});
test('includes complete supplied catalogues and two questions per creature', () => {
  expect([
    locations.length,
    courses.length,
    creatures.length,
    equipment.length,
    rules.length,
  ]).toEqual([12, 8, 8, 4, 20]);
  expect(creatures.every(c => c.quiz.length === 2)).toBe(true);
  expect(
    [...locations, ...courses, ...creatures].every(
      item => item.description.length === 2,
    ),
  ).toBe(true);
});
