import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Onboarding() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Divergify</Text>
      <Text style={styles.subtitle}>
        Let's get to know your brain so we can tune your Sidekick.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF9F6",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3B82F6",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#7C3AED",
    textAlign: "center",
  },
});
