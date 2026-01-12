import React from 'react';
import { View, Text, StyleSheet, Linking, Alert } from 'react-native';
import SectionCard from '../components/sectioncard';
import PrimaryButton from '../components/primarybutton';
import BrandBadge from '../components/brandbadge';
import { colors, spacing } from '../constants/colors';

const HUB_URL = 'https://divergify.app/hub.html';

async function openHub() {
  try {
    const supported = await Linking.canOpenURL(HUB_URL);
    if (!supported) {
      Alert.alert('Unable to open The Hub', 'Please try again from your browser.');
      return;
    }
    await Linking.openURL(HUB_URL);
  } catch (err) {
    Alert.alert('Unable to open The Hub', 'Please try again from your browser.');
  }
}

export default function HubScreen() {
  return (
    <View style={styles.container}>
      <SectionCard>
        <BrandBadge tagline="Control center for the Divergify ecosystem" />
        <Text style={styles.heading}>The Hub</Text>
        <Text style={styles.helper}>
          Divergify helps neurodivergent brains turn chaos into momentum with adaptive tools, honest support, and AI that works the way you think.
        </Text>
        <Text style={styles.helper}>
          Opens in your browser to keep the beta stable.
        </Text>
        <PrimaryButton label="Open The Hub" onPress={openHub} />
      </SectionCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  heading: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  helper: {
    color: colors.muted,
    marginBottom: spacing.sm,
  },
});
