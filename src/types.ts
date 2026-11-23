import { ImageSourcePropType } from 'react-native';

export type Category = 'Reefs' | 'Caves' | 'Shipwrecks';
export type DiveLocation = {
  id: string;
  name: string;
  category: Category;
  price: number;
  duration: number;
  level: string;
  image: ImageSourcePropType;
  description: string[];
};
export type Course = {
  id: string;
  name: string;
  price: number;
  level: string;
  summary: string;
  image: ImageSourcePropType;
  description: string[];
};
export type Creature = {
  id: string;
  name: string;
  danger: number;
  summary: string;
  image: ImageSourcePropType;
  description: string[];
  quiz: { statement: string; answer: boolean; explanation: string }[];
};
export type Equipment = {
  id: string;
  name: string;
  price: number;
  image: ImageSourcePropType;
  summary: string;
  specs: [string, string][];
  description: string;
};
export type Trip = {
  locationId: string | null;
  participants: number;
  dives: number;
  transfer: boolean;
  equipmentId: string | null;
  rentalSets: number;
  instructor: boolean;
};
export type Booking = {
  id: string;
  kind: 'dive' | 'course';
  itemId: string;
  dates: string[];
  trip: Trip;
  createdAt: string;
};
export type RootStackParams = {
  Catalog: undefined;
  Library: undefined;
  Detail: { kind: 'dive' | 'course' | 'creature'; id: string };
  Booking: {
    kind: 'dive' | 'course';
    id: string;
    trip?: Trip;
    bookingId?: string;
  };
};
