import { useState, useEffect } from "react";
import * as Speech from "expo-speech";

export function useBehaviorProtocol(persona, tone, onComplete) {
  const [step, setStep] = useState(0);
  const [protocol, setProtocol] = useState(null);
  const [active, setActive] = useState(false);

  const speak = (text) => {
    if (persona?.voice) {
      Speech.speak(text, { language: persona.language || "en", pitch: 1.05 });
    }
  };

  const startProtocol = (p) => {
    setProtocol(p);
    setStep(0);
    setActive(true);
    speak(`${tone.intro} ${p.title}`);
  };

  const nextStep = () => {
    if (!protocol) return;
    if (step < protocol.steps.length - 1) {
      const next = step + 1;
      setStep(next);
      speak(protocol.steps[next]);
    } else {
      speak(tone.complete);
      setActive(false);
      onComplete && onComplete(protocol.id);
    }
  };

  useEffect(() => {
    if (active && protocol && step === 0) {
      speak(protocol.steps[0]);
    }
  }, [active]);

  return {
    protocol,
    step,
    active,
    startProtocol,
    nextStep,
  };
}

