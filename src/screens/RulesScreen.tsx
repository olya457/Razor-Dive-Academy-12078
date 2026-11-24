import React from 'react';
import { Pressable, Share, Text, View } from 'react-native';
import { rules } from '../data/rules';
import { colors, styles as s } from '../theme';
import { Page, Title, Button, reportError } from '../components/UI';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../types';
import { Icon } from '../components/Icon';
export function RulesScreen({
  navigation,
}: NativeStackScreenProps<RootStackParams, 'Catalog'>) {
  return (
    <Page>
      <Title
        title="Underwater Rules"
        subtitle="Twenty conduct rules for safe, respectful diving."
      />
      <Button
        title="English Articles & Videos ↗"
        onPress={() => navigation.navigate('Library')}
      />
      {rules.map(([title, importance, description]) => {
        const color =
          importance === 'Critical'
            ? colors.red
            : importance === 'High'
            ? colors.yellow
            : colors.accent;
        return (
          <View
            key={title}
            style={[
              s.card,
              { borderColor: color, borderLeftWidth: 4, padding: 16 },
            ]}
          >
            <View style={s.between}>
              <Text style={s.heading}>{title}</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Share ${title}`}
                hitSlop={8}
                style={{
                  minHeight: 44,
                  minWidth: 44,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  Share.share({
                    title,
                    message: `${title}\nImportance: ${importance}\n\n${description}\n\nAquaQuest Diving`,
                  }).catch(reportError);
                }}
              >
                <Icon name="share" size={20} />
              </Pressable>
            </View>
            <Text style={[s.badge, { borderWidth: 1, borderColor: color }]}>
              <Text style={{ color }}>● </Text>
              {importance}
            </Text>
            <Text style={s.text}>{description}</Text>
          </View>
        );
      })}
    </Page>
  );
}
