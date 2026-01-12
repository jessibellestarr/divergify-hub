import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import LogoHeader from '../components/LogoHeader';
import RewardMeter from '../components/RewardMeter';
import { useStore } from '../state/store';
export default function Home({ navigation }: any){ const points = useStore(s=>s.prefs.points); return (
<View style={s.c}><LogoHeader /><Text style={s.tag}>For brains that zig when the world zags.</Text><RewardMeter points={points} />
<View style={s.row}><Btn title='Capture' onPress={()=>navigation.navigate('Chat')} /><Btn title='Sprint' onPress={()=>navigation.navigate('Sprint')} /><Btn title='Tasks' onPress={()=>navigation.navigate('Tasks')} /></View></View> ); }
function Btn({ title, onPress }: any){ return <TouchableOpacity onPress={onPress} style={s.btn}><Text style={s.btnText}>{title}</Text></TouchableOpacity>; }
const s = StyleSheet.create({ c:{ flex:1, backgroundColor: colors.bg, alignItems:'center', justifyContent:'center', padding:16 }, tag:{ color: colors.text, opacity:0.9, marginVertical:10 }, row:{ flexDirection:'row', marginTop:10 }, btn:{ backgroundColor: colors.accent, paddingVertical:12, paddingHorizontal:16, borderRadius:12, marginHorizontal:6 }, btnText:{ color: colors.darkInk, fontWeight:'900' } });