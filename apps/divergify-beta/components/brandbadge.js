import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../constants/colors';

const logo = require('../assets/logo_transparent_small.png');

const BrandBadge = ({ tagline = 'Chaos-friendly planning fuel' }) => (
  <View style={styles.container}>
    <Image source={logo} style={styles.logo} resizeMode="contain" />
    <View>
      <Text style={styles.title}>Divergify</Text>
      {tagline ? <Text style={styles.tagline}>{tagline}</Text> : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  logo: {
    width: 48,
    height: 48,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tagline: {
    color: colors.muted,
    fontSize: 12,
  },
});

export default BrandBadge;
