import React, { useState } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../types';
import { resources } from '../data/resources';
import { colors, styles as s } from '../theme';
import { Back, Button, Hero, Page, Title, reportError } from '../components/UI';
import { gridItemWidth, layoutMetrics } from '../utils/layout';
import { useApp } from '../store/AppStore';
export function LibraryScreen({
  navigation,
}: NativeStackScreenProps<RootStackParams, 'Library'>) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [width, setWidth] = useState(280);
  const { fontScale } = useWindowDimensions();
  const { savedResources, toggleResource } = useApp();
  const columns = layoutMetrics(width + 40, fontScale, true).columns;
  const matches = resources.filter(
    item =>
      (filter === 'All' ||
        filter === item.kind ||
        (filter === 'Saved' && savedResources.includes(item.id))) &&
      `${item.title} ${item.topic} ${item.publisher}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const open = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        'Unable to open this resource',
        'Check your internet connection and try again.',
      );
    }
  };
  return (
    <Page wide>
      <Back onPress={() => navigation.goBack()} />
      <Title
        title="Learning Library"
        subtitle="English articles and videos from PADI and Divers Alert Network."
      />
      <TextInput
        accessibilityLabel="Search learning resources"
        value={query}
        onChangeText={setQuery}
        placeholder="Search topics, titles or publishers"
        placeholderTextColor={colors.muted}
        style={[s.panel, s.text, { padding: 14, minHeight: 52 }]}
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ gap: 8 }}
      >
        {['All', 'Article', 'Video', 'Saved'].map(value => (
          <Button
            key={value}
            title={
              value === 'Article'
                ? 'Articles'
                : value === 'Video'
                ? 'Videos'
                : value
            }
            secondary={filter !== value}
            onPress={() => setFilter(value)}
          />
        ))}
      </ScrollView>
      <Text style={s.muted}>
        Resources open in your browser or video app and need internet access.
        Supplement your instructor-led training with these materials.
      </Text>
      <View
        onLayout={event => setWidth(event.nativeEvent.layout.width)}
        style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}
      >
        {matches.map(item => (
          <View
            key={item.id}
            style={[s.card, { width: gridItemWidth(width, columns) }]}
          >
            <Hero image={item.image} />
            <Text style={s.badge}>
              {item.kind === 'Video' ? '▶ VIDEO' : 'ARTICLE'} · ENGLISH
            </Text>
            <Text style={s.heading}>{item.title}</Text>
            <Text style={s.muted}>
              {item.publisher} · {item.topic}
            </Text>
            <Text style={s.text}>{item.description}</Text>
            <View style={{ flex: 1 }} />
            <Button
              title={item.kind === 'Video' ? 'Watch Video ↗' : 'Read Article ↗'}
              onPress={() => {
                open(item.url);
              }}
            />
            <Button
              secondary
              title={
                savedResources.includes(item.id)
                  ? '✓ Saved · Remove'
                  : 'Save for Later'
              }
              onPress={() => {
                toggleResource(item.id).catch(reportError);
              }}
            />
          </View>
        ))}
      </View>
      {matches.length === 0 && (
        <View style={s.panel}>
          <Text style={s.heading}>
            {filter === 'Saved' && !query
              ? 'Your reading list is empty'
              : 'No matching resources'}
          </Text>
          <Text style={s.text}>Save a resource or try a different search.</Text>
          <Button
            secondary
            title="Show All"
            onPress={() => {
              setQuery('');
              setFilter('All');
            }}
          />
        </View>
      )}
    </Page>
  );
}
