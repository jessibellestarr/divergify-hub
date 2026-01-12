import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
export default function TaskCard({ task, onToggle }: any){
  return (<TouchableOpacity onPress={() => onToggle(task.id)} style={[s.card, task.status==='done' && s.done]}>
    <Text style={[s.title, task.status==='done' && s.doneText]}>{task.title}</Text>
    <Text style={s.tags}>{(task.tags||[]).join(' • ')}</Text>
  </TouchableOpacity>);
}
const s = StyleSheet.create({ card:{ backgroundColor:'#10252f', padding:12, borderRadius:12, marginVertical:6 }, title:{ color: colors.text, fontWeight:'700', fontSize:16 }, tags:{ color: colors.textDim, marginTop:4, fontSize:12 }, done:{ backgroundColor:'#0e1913', borderColor: colors.accent, borderWidth:1 }, doneText:{ color: colors.textDim, textDecorationLine:'line-through' } });