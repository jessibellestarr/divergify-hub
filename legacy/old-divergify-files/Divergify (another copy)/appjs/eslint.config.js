import React, { useState } from "react";
import { SafeAreaView, StatusBar, ImageBackground, StyleSheet } from "react-native";
import Onboarding from "./components/Onboarding";
import HomeScreen from "./components/HomeScreen";

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);

  return (
    <ImageBackground
      source={require("./assets/divergify_logo.png")}
      resizeMode="cover"
      style={styles.bg}
    >
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />
        {isOnboarded ? (
          <HomeScreen />
        ) : (
          <Onboarding onComplete={() => setIsOnboarded(true)} />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  bg: { flex: 1, justifyContent: "center" },
});

