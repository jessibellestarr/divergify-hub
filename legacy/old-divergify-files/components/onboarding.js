import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";
import personas from "../data/personas";

export default function Onboarding({ onComplete }) {
  const [language, setLanguage] = useState("en");
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [allowProfanity, setAllowProfanity] = useState(false);
  const [lowStimMode, setLowStimMode] = useState(false);

  const handleSpeak = (text) => {
    Speech.speak(text, { language });
  };

  return (
    <LinearGradient
      colors={
        lowStimMode
          ? ["#E0E0E0", "#FAFAFA"]
          : ["#A3E635", "#3B82F6", "#EC4899"]
      }
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image
          source={require("../assets/divergify_logo.png")}
          style={styles.logo}
        />
        <Text style={styles.header}>Welcome to Divergify</Text>
        <Text style={styles.sub}>
          Let's tune your Sidekick to match your brain’s wavelength.
        </Text>

        <Text style={styles.sectionTitle}>🌐 Choose your language</Text>
        <View style={styles.row}>
          {["en", "es", "fr", "hi"].map((lng) => (
            <TouchableOpacity
              key={lng}
              onPress={() => setLanguage(lng)}
              style={[
                styles.option,
                language === lng && styles.optionSelected,
              ]}
            >
              <Text style={styles.optionText}>
                {lng === "en"
                  ? "English"
                  : lng === "es"
                  ? "Español"
                  : lng === "fr"
                  ? "Français"
                  : "हिन्दी"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>🧠 Pick your Sidekick</Text>
        <View style={styles.row}>
          {personas.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[
                styles.personaCard,
                selectedPersona === p.id && styles.personaSelected,
              ]}
              onPress={() => {
                setSelectedPersona(p.id);
                handleSpeak(p.greeting[language]);
              }}
            >
              <Text style={styles.personaName}>{p.name}</Text>
              <Text style={styles.personaRole}>{p.role}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Allow profanity</Text>
          <Switch
            value={allowProfanity}
            onValueChange={setAllowProfanity}
            trackColor={{ false: "#ccc", true: "#EC4899" }}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Low-stimulation mode</Text>
          <Switch
            value={lowStimMode}
            onValueChange={setLowStimMode}
            trackColor={{ false: "#ccc", true: "#3B82F6" }}
          />
        </View>

        <TouchableOpacity
          style={styles.continue}
          onPress={() => {
            if (selectedPersona) onComplete();
          }}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { alignItems: "center", padding: 20 },
  logo: { width: 200, height: 200, resizeMode: "contain", marginBottom: 20 },
  header: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  sub: { color: "white", textAlign: "center", marginBottom: 30 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginVertical: 10,
  },
  row: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  option: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    margin: 5,
  },
  optionSelected: { backgroundColor: "#10B981" },
  optionText: { color: "white", fontWeight: "600" },
  personaCard: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    width: 130,
    alignItems: "center",
  },
  personaSelected: { backgroundColor: "#F59E0B" },
  personaName: { color: "white", fontWeight: "bold" },
  personaRole: { color: "#FAFAFA", fontSize: 12 },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 15,
  },
  toggleLabel: { color: "white", fontWeight: "600" },
  continue: {
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 20,
    marginTop: 30,
  },
  continueText: { color: "white", fontWeight: "bold", fontSize: 18 },
});

