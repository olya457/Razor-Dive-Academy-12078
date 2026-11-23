import React from 'react';
import { Text } from 'react-native';
import TestRenderer, { act } from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppProvider, useApp } from '../src/store/AppStore';
import { emptyTrip, schedule } from '../src/utils/booking';
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockResolvedValue(null),
  setItem: jest.fn().mockResolvedValue(undefined),
}));
let store: ReturnType<typeof useApp>;
function Probe() {
  store = useApp();
  return <Text>{store.bookings.length}</Text>;
}
beforeEach(() => {
  jest.clearAllMocks();
});
test('starts empty, persists user bookings and removes their equipment on cancellation', async () => {
  let tree: TestRenderer.ReactTestRenderer;
  await act(async () => {
    tree = TestRenderer.create(
      <AppProvider>
        <Probe />
      </AppProvider>,
    );
  });
  expect(store!.ready).toBe(true);
  expect(store!.bookings).toEqual([]);
  const booking = {
    id: 'user-booking',
    kind: 'dive' as const,
    itemId: 'coralgarden',
    dates: schedule('2099-06-01', '08:30', 1),
    trip: { ...emptyTrip(), locationId: 'coralgarden', equipmentId: 'reef' },
    createdAt: new Date().toISOString(),
  };
  await act(async () => {
    await store.saveBooking(booking);
  });
  expect(store!.bookings[0].trip.equipmentId).toBe('reef');
  expect(
    JSON.parse((AsyncStorage.setItem as jest.Mock).mock.calls.at(-1)[1])
      .bookings,
  ).toHaveLength(1);
  await act(async () => {
    await store.cancelBooking(booking.id);
  });
  expect(store!.bookings).toEqual([]);
  await act(async () => {
    tree!.unmount();
  });
});
test('does not report a booking as saved when storage fails', async () => {
  let tree: TestRenderer.ReactTestRenderer;
  await act(async () => {
    tree = TestRenderer.create(
      <AppProvider>
        <Probe />
      </AppProvider>,
    );
  });
  (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(
    new Error('Disk full'),
  );
  await act(async () => {
    await expect(store.finishOnboarding()).rejects.toThrow('Disk full');
  });
  expect(store!.onboarded).toBe(false);
  await act(async () => {
    tree!.unmount();
  });
});

test('restores user selections and quiz answers after remounting', async () => {
  const saved = {
    onboarded: true,
    bookings: [],
    answers: { lionfish: { 0: true } },
    calculator: {
      ...emptyTrip(),
      locationId: 'coralgarden',
      participants: 3,
      rentalSets: 3,
    },
  };
  (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
    JSON.stringify(saved),
  );
  let tree: TestRenderer.ReactTestRenderer;
  await act(async () => {
    tree = TestRenderer.create(
      <AppProvider>
        <Probe />
      </AppProvider>,
    );
  });
  expect(store!.onboarded).toBe(true);
  expect(store!.calculator.participants).toBe(3);
  expect(store!.answers.lionfish[0]).toBe(true);
  await act(async () => {
    await store.resetQuiz('lionfish');
  });
  expect(store!.answers.lionfish).toEqual({});
  await act(async () => {
    tree!.unmount();
  });
});

test('migrates older saved state and persists resource bookmarks', async () => {
  (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
    JSON.stringify({
      onboarded: true,
      bookings: [],
      answers: {},
      calculator: emptyTrip(),
    }),
  );
  let tree: TestRenderer.ReactTestRenderer;
  await act(async () => {
    tree = TestRenderer.create(
      <AppProvider>
        <Probe />
      </AppProvider>,
    );
  });
  expect(store!.savedResources).toEqual([]);
  await act(async () => {
    await store.toggleResource('first-steps');
  });
  expect(
    JSON.parse((AsyncStorage.setItem as jest.Mock).mock.calls.at(-1)[1])
      .savedResources,
  ).toEqual(['first-steps']);
  await act(async () => {
    await store.toggleResource('first-steps');
  });
  expect(store!.savedResources).toEqual([]);
  await act(async () => {
    tree!.unmount();
  });
});
