import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { colors } from '../theme/colors';
import { useStore } from '../state/store';
export default function Settings(){ const tinfoil = useStore(s=>s.prefs.tinfoil); const setTinFoil = useStore(s=>s.setTinFoil); const persona = useStore(s=>s.prefs.persona); const setPersona = useStore(s=>s.setPersona); return (<View style={s.c}><Row label='Tin Foil Hat Mode' value={tinfoil} onValueChange={setTinFoil} /><Text style={s.sub}>Persona: {persona}</Text><Text style={s.hint}>In Tin Foil mode, chat/transcription stay offline.</Text></View>); }
function Row({ label, value, onValueChange }: any){ return (<View style={s.row}><Text style={s.label}>{label}</Text><Switch value={value} onValueChange={onValueChange} /></View>); }
const s = StyleSheet.create({ c:{ flex:1, backgroundColor: colors.bg, padding:16 }, row:{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingVertical:12 }, label:{ color: colors.text, fontSize:16 }, sub:{ color: colors.text, marginTop:12 }, hint:{ color: colors.textDim, marginTop:8 } });