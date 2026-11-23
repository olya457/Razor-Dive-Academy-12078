import React, { useState } from 'react';
import { Modal, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMotion } from '../hooks/useMotion';
import { Trip } from '../types';
import { locations } from '../data/locations';
import { equipment } from '../data/equipment';
import { styles as s } from '../theme';
import { Button, Option, Stepper } from './UI';
import { calculate, money } from '../utils/booking';
export function LocationPicker({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const motion = useMotion();
  const location = locations.find(l => l.id === value);
  return (
    <>
      <Button
        secondary
        title={
          location
            ? `${location.name}  ·  ${money(location.price)}  ⌄`
            : 'Select a dive location  ⌄'
        }
        onPress={() => setOpen(true)}
      />
      <Modal
        visible={open}
        animationType={motion ? 'slide' : 'none'}
        onRequestClose={() => setOpen(false)}
      >
        <SafeAreaView style={s.page}>
          <ScrollView contentContainerStyle={s.content}>
            <Text style={s.title}>Dive Location</Text>
            {locations.map(l => (
              <Option
                key={l.id}
                title={l.name}
                detail={`${l.category} · ${money(
                  l.price,
                )} per person, per dive`}
                selected={value === l.id}
                onPress={() => {
                  onChange(l.id);
                  setOpen(false);
                }}
              />
            ))}
            <Button title="Close" onPress={() => setOpen(false)} />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
}
export function TripForm({
  trip,
  onChange,
  chooseLocation = false,
}: {
  trip: Trip;
  onChange: (trip: Trip) => void;
  chooseLocation?: boolean;
}) {
  const change = (patch: Partial<Trip>) => onChange({ ...trip, ...patch });
  return (
    <>
      {chooseLocation && (
        <>
          <Text style={s.label}>DIVE LOCATION</Text>
          <LocationPicker
            value={trip.locationId}
            onChange={locationId => change({ locationId })}
          />
        </>
      )}
      <Text style={s.label}>GROUP</Text>
      <Stepper
        label="Participants"
        value={trip.participants}
        max={8}
        onChange={participants =>
          change({
            participants,
            rentalSets:
              trip.rentalSets === trip.participants
                ? participants
                : Math.min(trip.rentalSets, participants),
          })
        }
      />
      <Stepper
        label="Dives per person"
        value={trip.dives}
        max={3}
        onChange={dives => change({ dives })}
      />
      <Text style={s.label}>TRANSFER</Text>
      <Option
        title="Without Transfer"
        detail="€0"
        selected={!trip.transfer}
        onPress={() => change({ transfer: false })}
      />
      <Option
        title="Club Transfer"
        detail="€15 per person · round trip"
        selected={trip.transfer}
        onPress={() => change({ transfer: true })}
      />
      <Text style={s.label}>EQUIPMENT RENTAL</Text>
      <Option
        title="No Rental"
        selected={!trip.equipmentId}
        onPress={() => change({ equipmentId: null })}
      />
      {equipment.map(e => (
        <Option
          key={e.id}
          title={e.name}
          detail={`${money(e.price)} per set, per dive`}
          selected={trip.equipmentId === e.id}
          onPress={() => change({ equipmentId: e.id })}
        />
      ))}
      {trip.equipmentId && (
        <Stepper
          label="Rental sets"
          value={trip.rentalSets}
          max={trip.participants}
          onChange={rentalSets => change({ rentalSets })}
        />
      )}
      <Text style={s.label}>INSTRUCTOR SERVICES</Text>
      <Option
        title="Included Guide"
        detail="Group guide included in the location price"
        selected={!trip.instructor}
        onPress={() => change({ instructor: false })}
      />
      <Option
        title="Dedicated Instructor"
        detail="€40 per group, per dive"
        selected={trip.instructor}
        onPress={() => change({ instructor: true })}
      />
    </>
  );
}
export function CostSummary({ trip }: { trip: Trip }) {
  const cost = calculate(trip);
  const location = locations.find(l => l.id === trip.locationId);
  const gear = equipment.find(e => e.id === trip.equipmentId);
  if (!location) {
    return (
      <View style={s.panel}>
        <Text style={s.text}>Select a location to calculate your trip</Text>
      </View>
    );
  }
  return (
    <View style={s.panel}>
      {[
        [
          'Diving',
          `${money(location.price)} × ${trip.participants} people × ${
            trip.dives
          } dives`,
          cost.diving,
        ],
        [
          'Transfer',
          trip.transfer ? `€15 × ${trip.participants} people` : 'Not selected',
          cost.transfer,
        ],
        [
          'Equipment',
          gear
            ? `${gear.name} · ${money(gear.price)} × ${
                trip.rentalSets
              } sets × ${trip.dives} dives`
            : 'Not selected',
          cost.rental,
        ],
        [
          'Instructor',
          trip.instructor ? `€40 × ${trip.dives} dives` : 'Guide included',
          cost.instructor,
        ],
      ].map(([label, detail, value]) => (
        <View key={String(label)} style={[s.line, { gap: 4 }]}>
          <View style={s.between}>
            <Text style={s.text}>{label}</Text>
            <Text style={s.heading}>{money(Number(value))}</Text>
          </View>
          <Text style={s.muted}>{detail}</Text>
        </View>
      ))}
      <View style={s.between}>
        <Text style={s.heading}>Total cost</Text>
        <Text style={s.title}>{money(cost.total)}</Text>
      </View>
      <View style={s.between}>
        <Text style={s.text}>Average per person</Text>
        <Text style={s.heading}>{money(cost.average)}</Text>
      </View>
      {trip.equipmentId && trip.rentalSets < trip.participants && (
        <Text style={s.muted}>
          This is a group average, not an individual bill.
        </Text>
      )}
    </View>
  );
}
