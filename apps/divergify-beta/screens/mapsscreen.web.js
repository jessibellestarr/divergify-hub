import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import SectionCard from '../components/sectioncard';
import PrimaryButton from '../components/primarybutton';
import usePersistentState from '../hooks/usepersistentstate';
import { colors, spacing } from '../constants/colors';

export default function MapsScreen() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [label, setLabel] = useState('');
  const [savedRoutes, setSavedRoutes] = usePersistentState('savedRoutes', []);

  const handleSaveRoute = () => {
    if (!origin || !destination) return;
    const route = {
      id: Date.now().toString(),
      origin,
      destination,
      label: label || `Route ${savedRoutes.length + 1}`,
      createdAt: Date.now(),
    };
    setSavedRoutes((prev) => [route, ...prev].slice(0, 8));
    setLabel('');
  };

  const handleUseRoute = (route) => {
    setOrigin(route.origin);
    setDestination(route.destination);
  };

  return (
    <View style={styles.container}>
      <SectionCard>
        <Text style={styles.heading}>Route Planner</Text>
        <Text style={styles.helper}>
          Web preview keeps the planning flow. Native builds unlock the full map view.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Origin (e.g., Home, 123 Main)"
          placeholderTextColor={colors.muted}
          value={origin}
          onChangeText={setOrigin}
        />
        <TextInput
          style={styles.input}
          placeholder="Destination (e.g., Therapy, Grocery)"
          placeholderTextColor={colors.muted}
          value={destination}
          onChangeText={setDestination}
        />
        <TextInput
          style={styles.input}
          placeholder="Optional label (e.g., Tuesday focus run)"
          placeholderTextColor={colors.muted}
          value={label}
          onChangeText={setLabel}
        />
        <PrimaryButton
          label="Save favorite route"
          onPress={handleSaveRoute}
          disabled={!origin || !destination}
        />
      </SectionCard>

      <SectionCard>
        <View style={styles.webMapPlaceholder}>
          <Text style={styles.placeholderTitle}>Map Preview (Web)</Text>
          <Text style={styles.placeholderText}>
            The live map renders only on iOS/Android builds. Keep planning here, then switch to
            mobile when you want directions.
          </Text>
        </View>
      </SectionCard>

      <SectionCard>
        <Text style={styles.subheading}>Saved Runs</Text>
        {savedRoutes.length === 0 ? (
          <Text style={styles.helper}>No favorites yet. Tap save after planning a run.</Text>
        ) : (
          <FlatList
            data={savedRoutes}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleUseRoute(item)} style={styles.routeRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.routeLabel}>{item.label}</Text>
                  <Text style={styles.routeText}>
                    {item.origin} ➜ {item.destination}
                  </Text>
                </View>
                <Text style={styles.useText}>Use</Text>
              </TouchableOpacity>
            )}
          />
        )}
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
  subheading: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  helper: {
    color: colors.muted,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: '#0f0f15',
    color: colors.text,
    borderRadius: 12,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: '#1f1f29',
    marginBottom: spacing.sm,
  },
  webMapPlaceholder: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1f1f29',
    padding: spacing.md,
    backgroundColor: '#0c0c12',
  },
  placeholderTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  placeholderText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f29',
  },
  routeLabel: {
    color: colors.text,
    fontWeight: '600',
    marginBottom: 4,
  },
  routeText: {
    color: colors.muted,
    fontSize: 12,
  },
  useText: {
    color: colors.accent,
    fontWeight: '700',
  },
});
