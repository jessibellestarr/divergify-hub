import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";

export default function FocusTimer({ persona, onFinish }) {
  const [secondsLeft, setSecondsLeft] = useState(22 * 60); // research-based 22 min focus
  const [active, setActive] = useState(false);

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            Vibration.vibrate(1000);
            Speech.speak(persona.endMessage || "Session complete. You beat your baseline.");
            onFinish && onFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [active]);

  const toggleTimer = () => {
    setActive(!active);
    if (!active) {
      Speech.speak(persona.startMessage || "Focus session initiated. Let’s dominate distraction.");
    } else {
      Speech.speak(persona.pauseMessage || "Pause. Reflect. Reengage when ready.");
    }
  };

  const resetTimer = () => {
    setSecondsLeft(22 * 60);
    setActive(false);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <LinearGradient
      colors={persona.lowStim ? ["#E0E0E0", "#FAFAFA"] : ["#A3E635", "#3B82F6", "#EC4899"]}
      style={styles.container}
    >
      <Text style={styles.header}>Beat your baseline</Text>
      <Text style={styles.timer}>{formatTime(secondsLeft)}</Text>
      <TouchableOpacity style={styles.button} onPress={toggleTimer}>
        <Text style={styles.buttonText}>{active ? "Pause" : "Start"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.reset} onPress={resetTimer}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>
        {persona.nudge || "Short bursts build long-term control. One step closer to balance."}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  timer: {
    fontSize: 64,
    color: "white",
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#10B981",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  reset: {
    marginTop: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  resetText: {
    color: "white",
    fontSize: 16,
  },
  subtitle: {
    color: "white",
    marginTop: 25,
    textAlign: "center",
    fontSize: 16,
  },
});

