import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../constants/colors';

const SectionCard = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#1f1f29',
  },
});

export default SectionCard;
