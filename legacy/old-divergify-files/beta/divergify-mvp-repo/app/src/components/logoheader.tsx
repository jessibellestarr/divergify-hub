import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
export default function LogoHeader({ variant='green', size=56 }){
  const source = variant==='green' ? require('../../assets/logo_green.png') : require('../../assets/logo_transparent.png');
  return (<View style={s.c}><Image source={source} style={{ width:size*2, height:size*2, ...s.logo }} resizeMode='contain' /></View>);
}
const s = StyleSheet.create({ c:{ alignItems:'center', justifyContent:'center', paddingVertical:8 }, logo:{ shadowColor:'#fff', shadowOpacity:0.65, shadowRadius:8, shadowOffset:{width:0,height:0} } });