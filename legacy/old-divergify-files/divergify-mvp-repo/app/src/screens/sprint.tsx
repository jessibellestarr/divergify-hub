import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../theme/colors';
import { useStore } from '../state/store';
import { startDriftWatcher } from '../lib/nudge';
import { pickRewardCopy } from '../lib/rewards';
export default function Sprint(){ const [seconds,setSeconds]=useState(25*60); const [running,setRunning]=useState(false); const addPoints = useStore(s=>s.addPoints); const timer = useRef<any>(null);
useEffect(()=>{ const stop = startDriftWatcher(()=>{ if(running) Alert.alert('Intentional Interrupt?','You drifted. Pause or continue?'); }); return ()=> stop&&stop(); },[running]);
useEffect(()=>{ if(running){ timer.current = setInterval(()=> setSeconds(s=> Math.max(0, s-1)), 1000); } return ()=> timer.current && clearInterval(timer.current); },[running]);
useEffect(()=>{ if(seconds===0 && running){ setRunning(false); addPoints(15); const copy = pickRewardCopy('local'); Alert.alert('Sprint Complete', copy); } },[seconds,running]);
const mm = String(Math.floor(seconds/60)).padStart(2,'0'); const ss = String(seconds%60).padStart(2,'0');
return (<View style={s.c}><Text style={s.t}>{mm}:{ss}</Text><View style={s.row}><Btn title={running?'Pause':'Start'} onPress={()=> setRunning(r=>!r)} /><Btn title='Reset' onPress={()=>{ setSeconds(25*60); setRunning(false); }} /></View><Text style={s.h}>Beat your baseline. Rewards escalate with streak.</Text></View>); }
function Btn({ title, onPress }: any){ return <TouchableOpacity onPress={onPress} style={s.btn}><Text style={s.btnText}>{title}</Text></TouchableOpacity>; }
const s = StyleSheet.create({ c:{ flex:1, backgroundColor: colors.bg, alignItems:'center', justifyContent:'center' }, t:{ color: colors.text, fontSize:72, fontWeight:'900', letterSpacing:2 }, row:{ flexDirection:'row', marginTop:16 }, btn:{ backgroundColor: colors.accent, paddingVertical:12, paddingHorizontal:16, borderRadius:12, marginHorizontal:8 }, btnText:{ color: colors.darkInk, fontWeight:'900' }, h:{ color: colors.textDim, marginTop:10 } });