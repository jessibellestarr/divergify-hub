import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../constants/colors';

const PrimaryButton = ({ label, onPress, disabled, style }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabled, style]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.85}
  >
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.sm,
    borderRadius: 999,
  },
  label: {
    color: '#05141a',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default PrimaryButton;
