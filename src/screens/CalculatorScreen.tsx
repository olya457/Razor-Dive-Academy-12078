import React from 'react';
import { Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../types';
import { Button, Page, Title, reportError } from '../components/UI';
import { CostSummary, TripForm } from '../components/TripForm';
import { useApp } from '../store/AppStore';
import { emptyTrip } from '../utils/booking';
import { styles as s } from '../theme';
export function CalculatorScreen({
  navigation,
}: NativeStackScreenProps<RootStackParams, 'Catalog'>) {
  const { calculator, setCalculator } = useApp();
  return (
    <Page>
      <Title
        title="Trip Cost Calculator"
        subtitle="Plan your group trip. All prices are in euros."
      />
      <TripForm
        trip={calculator}
        chooseLocation
        onChange={trip => {
          setCalculator(trip).catch(reportError);
        }}
      />
      <Text style={s.label}>COST BREAKDOWN</Text>
      <CostSummary trip={calculator} />
      <Button
        title="Continue to Booking"
        disabled={!calculator.locationId}
        onPress={() => {
          if (calculator.locationId) {
            navigation.navigate('Booking', {
              kind: 'dive',
              id: calculator.locationId,
              trip: calculator,
            });
          }
        }}
      />
      <Button
        title="Reset"
        secondary
        onPress={() => {
          setCalculator(emptyTrip()).catch(reportError);
        }}
      />
    </Page>
  );
}
