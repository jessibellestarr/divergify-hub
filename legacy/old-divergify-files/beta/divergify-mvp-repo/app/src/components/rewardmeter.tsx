import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
export default function RewardMeter({ points=0 }){
  const tier = points < 30 ? 1 : points < 70 ? 2 : 3;
  return (<View style={[s.w, tier===3 && s.t3]}><View style={[s.m, {width: `${Math.min(points,100)}%`}]} /><Text style={s.t}>Micro Win Parade: {points} pts</Text></View>);
}
const s = StyleSheet.create({ w:{ width:'100%', height:18, backgroundColor:'#0e1b24', borderRadius:12, overflow:'hidden', marginVertical:8 }, m:{ height:'100%', backgroundColor: colors.accent }, t:{ position:'absolute', width:'100%', textAlign:'center', color: colors.darkInk, fontWeight:'800' }, t3:{ shadowColor:'#8cffd1', shadowOpacity:0.9, shadowRadius:18 } });