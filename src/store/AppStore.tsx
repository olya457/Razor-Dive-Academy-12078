import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Booking, Trip } from '../types';
import { bookingError, emptyTrip } from '../utils/booking';

type State = {
  onboarded: boolean;
  savedResources: string[];
  bookings: Booking[];
  answers: Record<string, Record<string, boolean>>;
  calculator: Trip;
};
type Store = State & {
  toggleResource: (id: string) => Promise<void>;
  ready: boolean;
  error: string | null;
  finishOnboarding: () => Promise<void>;
  saveBooking: (booking: Booking) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
  answer: (id: string, index: number, value: boolean) => Promise<void>;
  resetQuiz: (id: string) => Promise<void>;
  setCalculator: (trip: Trip) => Promise<void>;
};
const Context = createContext<Store | null>(null);
const key = '@razor-dive/state/v1';
const initial = (): State => ({
  onboarded: false,
  savedResources: [],
  bookings: [],
  answers: {},
  calculator: emptyTrip(),
});
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(initial);
  const current = useRef(state);
  const queue = useRef(Promise.resolve());
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    AsyncStorage.getItem(key)
      .then(raw => {
        if (raw) {
          const data = JSON.parse(raw);
          if (
            !Array.isArray(data.bookings) ||
            typeof data.onboarded !== 'boolean' ||
            !data.answers ||
            !data.calculator
          ) {
            throw new Error('Invalid saved data');
          }
          const restored = {
            ...data,
            savedResources: Array.isArray(data.savedResources)
              ? data.savedResources.filter(
                  (id: unknown) => typeof id === 'string',
                )
              : [],
          };
          current.current = restored;
          setState(restored);
        }
      })
      .catch(() =>
        setError(
          'Saved data could not be loaded. Restart the app before making changes.',
        ),
      )
      .finally(() => setReady(true));
  }, []);
  const update = (fn: (previous: State) => State) => {
    const action = queue.current.then(async () => {
      if (error) {
        throw new Error(error);
      }
      const next = fn(current.current);
      await AsyncStorage.setItem(key, JSON.stringify(next));
      current.current = next;
      setState(next);
    });
    queue.current = action.catch(() => {});
    return action;
  };
  return (
    <Context.Provider
      value={{
        ...state,
        ready,
        error,
        toggleResource: id =>
          update(s => ({
            ...s,
            savedResources: s.savedResources.includes(id)
              ? s.savedResources.filter(value => value !== id)
              : [...s.savedResources, id],
          })),
        finishOnboarding: () => update(s => ({ ...s, onboarded: true })),
        saveBooking: booking =>
          update(s => {
            const problem = bookingError(booking, s.bookings);
            if (problem) {
              throw new Error(problem);
            }
            return {
              ...s,
              bookings: [
                ...s.bookings.filter(b => b.id !== booking.id),
                booking,
              ],
            };
          }),
        cancelBooking: id =>
          update(s => ({
            ...s,
            bookings: s.bookings.filter(b => b.id !== id),
          })),
        answer: (id, index, value) =>
          update(s => ({
            ...s,
            answers: {
              ...s.answers,
              [id]: { ...s.answers[id], [index]: value },
            },
          })),
        resetQuiz: id =>
          update(s => ({ ...s, answers: { ...s.answers, [id]: {} } })),
        setCalculator: calculator => update(s => ({ ...s, calculator })),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useApp() {
  const store = useContext(Context);
  if (!store) {
    throw new Error('AppProvider is missing');
  }
  return store;
}
