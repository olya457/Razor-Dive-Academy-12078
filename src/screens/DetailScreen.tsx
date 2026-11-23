import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Course, RootStackParams } from '../types';
import { CourseReservation } from '../components/CourseReservation';
import { locations } from '../data/locations';
import { courses } from '../data/courses';
import { creatures } from '../data/creatures';
import { colors, styles as s } from '../theme';
import {
  Back,
  Button,
  Hero,
  Page,
  Stars,
  Stats,
  Title,
  reportError,
} from '../components/UI';
import { BookingCard } from '../components/BookingCard';
import { useApp } from '../store/AppStore';
import { money } from '../utils/booking';
export function DetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParams, 'Detail'>) {
  const { kind, id } = route.params;
  const { bookings, answers, answer, resetQuiz } = useApp();
  const item = (
    kind === 'dive' ? locations : kind === 'course' ? courses : creatures
  ).find(i => i.id === id);
  if (!item) {
    return (
      <Page>
        <Back onPress={() => navigation.goBack()} />
        <Title title="Item not found" />
      </Page>
    );
  }
  const reserved = bookings.filter(b => b.kind === kind && b.itemId === id);
  return (
    <Page>
      <Back onPress={() => navigation.goBack()} />
      <Title title={item.name} />
      <Hero image={item.image} />
      {'price' in item && (
        <Stats
          items={
            kind === 'dive' && 'duration' in item
              ? [
                  ['Price', `${money(item.price)} pp`],
                  ['Duration', `${item.duration} min`],
                  ['Difficulty', item.level],
                ]
              : [
                  ['Level', item.level],
                  ['Price', money(item.price)],
                  ['Format', 'Guided'],
                ]
          }
        />
      )}
      {reserved.map(b => (
        <BookingCard
          key={b.id}
          booking={b}
          onEdit={() =>
            navigation.navigate('Booking', {
              kind: b.kind,
              id,
              bookingId: b.id,
            })
          }
          onEquipment={() => navigation.getParent()?.navigate('Equipment')}
        />
      ))}
      {'danger' in item && (
        <>
          <Stars count={item.danger} />
          <Text style={s.muted}>
            Caution indicator {item.danger} of 5 · Educational guide only.
          </Text>
        </>
      )}
      {'summary' in item && kind === 'course' && (
        <Text style={[s.text, { fontWeight: '600' }]}>{item.summary}</Text>
      )}
      {item.description.map(p => (
        <Text key={p} style={[s.text, { lineHeight: 27 }]}>
          {p}
        </Text>
      ))}
      {'quiz' in item ? (
        <>
          <Text style={s.label}>TRUE OR FALSE</Text>
          {item.quiz.map((q, i) => {
            const response = answers[id]?.[i];
            return (
              <View key={q.statement} style={s.card}>
                <Text style={s.text}>
                  {i + 1}. {q.statement}
                </Text>
                <View style={s.row}>
                  {[true, false].map(v => (
                    <Button
                      key={String(v)}
                      title={v ? 'True' : 'False'}
                      secondary={response !== v}
                      disabled={response !== undefined}
                      style={{ flex: 1 }}
                      onPress={() => {
                        answer(id, i, v).catch(reportError);
                      }}
                    />
                  ))}
                </View>
                {response !== undefined && (
                  <View
                    style={[
                      s.panel,
                      {
                        borderColor:
                          response === q.answer ? colors.accent : colors.red,
                      },
                    ]}
                  >
                    <Text style={s.heading}>
                      {response === q.answer ? '✓ Correct' : '⊗ Incorrect'}
                    </Text>
                    <Text style={s.text}>
                      Correct answer: {q.answer ? 'True' : 'False'}
                    </Text>
                    <Text style={s.muted}>{q.explanation}</Text>
                  </View>
                )}
              </View>
            );
          })}
          <Button
            title="Try Again"
            secondary
            onPress={() => {
              resetQuiz(id).catch(reportError);
            }}
          />
        </>
      ) : kind === 'course' ? (
        reserved.some(b =>
          b.dates.some(d => Date.parse(d) > Date.now()),
        ) ? null : (
          <CourseReservation course={item as Course} />
        )
      ) : (
        <Button
          title="Book Dive"
          onPress={() =>
            navigation.navigate('Booking', {
              kind: kind === 'dive' ? 'dive' : 'course',
              id,
            })
          }
        />
      )}
    </Page>
  );
}
