import React from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';
import { colors } from '../theme/colors';
export default function EnergySliders({ energy, setEnergy, mood, setMood }: any){
  return (<View style={s.w}><Text style={s.l}>Energy: {energy}</Text>{/* @ts-ignore */}<Slider minimumValue={0} maximumValue={100} value={energy} onValueChange={setEnergy} />
  <Text style={s.l}>Mood: {mood}</Text>{/* @ts-ignore */}<Slider minimumValue={-3} maximumValue={3} step={1} value={mood} onValueChange={setMood} /></View>);
}
const s = StyleSheet.create({ w:{ padding:12 }, l:{ color: colors.text, marginBottom:6 } });