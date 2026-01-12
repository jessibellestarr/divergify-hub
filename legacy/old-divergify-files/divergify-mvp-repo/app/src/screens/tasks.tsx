import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { colors } from '../theme/colors';
import TaskCard from '../components/TaskCard';
import { useStore } from '../state/store';
export default function Tasks(){ const tasks = useStore(s=>s.tasks); const addTask = useStore(s=>s.addTask); const toggle = useStore(s=>s.toggleTask); const [text,setText] = useState('');
function add(){ const t=text.trim(); if(!t) return; addTask(t, ['Sprintable']); setText(''); }
return (<View style={s.c}><View style={s.row}><TextInput style={s.input} value={text} onChangeText={setText} placeholder='Sprintable Task' placeholderTextColor={colors.textDim} onSubmitEditing={add} /><TouchableOpacity onPress={add} style={s.add}><Text style={s.addText}>Add</Text></TouchableOpacity></View><FlatList data={tasks} keyExtractor={t=>t.id} renderItem={({item})=> <TaskCard task={item} onToggle={toggle} />} /></View>); }
const s = StyleSheet.create({ c:{ flex:1, backgroundColor: colors.bg, padding:12 }, row:{ flexDirection:'row', marginBottom:10 }, input:{ flex:1, backgroundColor:'#0f1e16', borderColor: colors.accent, borderWidth:1, color: colors.text, borderRadius:10, paddingHorizontal:12, height:44 }, add:{ backgroundColor: colors.accent, marginLeft:8, borderRadius:10, alignItems:'center', justifyContent:'center', paddingHorizontal:16 }, addText:{ color: colors.darkInk, fontWeight:'900' } });