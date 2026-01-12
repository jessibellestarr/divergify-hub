import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import useStore from './store';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const {
    tasks, addTask, toggleTask, removeTask,
    newTask, setNewTask, completedTodayCount, resetDailyIfNeeded
  } = useStore();

  useEffect(() => { resetDailyIfNeeded(); }, [resetDailyIfNeeded]);

  // Request notification perms once
  useEffect(() => {
    (async () => {
      if (Device.isDevice) {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Notification permission not granted');
        }
      }
    })();
  }, []);

  const onAdd = () => {
    if (!newTask.trim()) return;
    addTask(newTask.trim());
    setNewTask('');
    maybeCelebrate(completedTodayCount());
  };

  const maybeCelebrate = (count: number) => {
    // escalating encouragement — no profanity
    const lines = [
      'Nice start! Momentum beats perfection.',
      'Two in a row — you’re rolling.',
      'Hat trick! That’s three.',
      'Four tasks: focus mode unlocked.',
      'Five! That’s a productive groove.'
    ];
    const msg = lines[Math.min(count, lines.length - 1)];
    Notifications.scheduleNotificationAsync({
      content: { title: 'Dopamine boost', body: msg },
      trigger: null,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Today</Text>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputRow}>
          <TextInput
            placeholder="Add a tiny task..."
            value={newTask}
            onChangeText={setNewTask}
            style={styles.input}
          />
          <Pressable style={styles.btn} onPress={onAdd}>
            <Text style={styles.btnText}>Add</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable onPress={() => toggleTask(item.id)} style={[styles.checkbox, item.done && styles.checkboxOn]} />
            <Text style={[styles.itemText, item.done && styles.itemDone]}>{item.text}</Text>
            <Pressable onPress={() => removeTask(item.id)}>
              <Text style={styles.remove}>×</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nothing yet. One tiny task to start.</Text>}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      <Text style={styles.footerHelp}>Tin Foil Hat Mode and voices coming soon.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8FFE8', paddingHorizontal: 16 },
  title: { fontSize: 28, fontWeight: '700', marginVertical: 12, color: '#0b1220' },
  inputRow: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: '#c7efc7' },
  btn: { backgroundColor: '#32CD32', borderRadius: 12, paddingHorizontal: 16, justifyContent: 'center' },
  btnText: { color: '#0b1220', fontWeight: '700' },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#e6f6e6' },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#0b1220', marginRight: 10 },
  checkboxOn: { backgroundColor: '#32CD32' },
  itemText: { flex: 1, fontSize: 16 },
  itemDone: { textDecorationLine: 'line-through', opacity: 0.6 },
  remove: { fontSize: 24, paddingHorizontal: 10, color: '#0b1220' },
  empty: { textAlign: 'center', paddingVertical: 20, color: '#3b4a66' },
  footerHelp: { textAlign: 'center', paddingVertical: 10, color: '#3b4a66' }
});
