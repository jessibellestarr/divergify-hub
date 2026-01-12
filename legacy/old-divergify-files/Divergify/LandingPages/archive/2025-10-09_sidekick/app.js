import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  AppState,
  FlatList,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useWindowDimensions,
  View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import ConfettiCannon from 'react-native-confetti-cannon';

const TASKS_KEY = 'divergify.tasks.v1';
const STREAK_KEY = 'divergify.streak.v1';
const PHRASES_KEY = 'divergify.phrases.v1';
const SETTINGS_KEY = 'divergify.settings.v1';
const STREAK_GOAL = 10;
const dopamineLines = [
  'Graffiti bomb deployed. You just painted progress.',
  'Confetti unlocked. Your brain: mildly impressed.',
  'Tiny win, big ripple. Keep rolling.',
  'You did the thing. You monster (in a nice way).',
  'Momentum > motivation. You built both.',
  'Gold star energy. Not reusable for 72 hours.'
];

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const initialNudge = 'I\u2019m your seatbelt for the brain. Let\u2019s roll.';

const todayKey = () => {
  const now = new Date();
  return [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');
};

const normalizeUrl = (value) => {
  if (!value) return '';
  if (!/^https?:\/\//i.test(value)) {
    return `https://${value}`;
  }
  return value;
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [streak, setStreak] = useState({ day: todayKey(), count: 0 });
  const [nudge, setNudge] = useState(initialNudge);
  const [usedPhrases, setUsedPhrases] = useState([]);
  const [tinFoil, setTinFoil] = useState(false);
  const [merchUrl, setMerchUrl] = useState('');
  const [editingMerch, setEditingMerch] = useState(false);
  const [merchDraft, setMerchDraft] = useState('');
  const [focusMode, setFocusMode] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const confettiRef = useRef(null);
  const gradientAnim = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientAnim, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true
        }),
        Animated.timing(gradientAnim, {
          toValue: 0,
          duration: 8000,
          useNativeDriver: true
        })
      ])
    ).start();
  }, [gradientAnim]);

  useEffect(() => {
    const load = async () => {
      try {
        const [tasksRaw, streakRaw, phrasesRaw, settingsRaw] = await Promise.all([
          AsyncStorage.getItem(TASKS_KEY),
          AsyncStorage.getItem(STREAK_KEY),
          AsyncStorage.getItem(PHRASES_KEY),
          AsyncStorage.getItem(SETTINGS_KEY)
        ]);

        if (tasksRaw) {
          try {
            const parsed = JSON.parse(tasksRaw);
            if (Array.isArray(parsed)) {
              setTasks(parsed);
            }
          } catch (_) {
            // ignore corrupted payloads
          }
        }

        if (streakRaw) {
          try {
            const parsed = JSON.parse(streakRaw);
            if (parsed && typeof parsed === 'object') {
              setStreak({
                day: parsed.day || todayKey(),
                count: typeof parsed.count === 'number' ? parsed.count : 0
              });
            }
          } catch (_) {
            // ignore corrupted payloads
          }
        }

        if (phrasesRaw) {
          try {
            const parsed = JSON.parse(phrasesRaw);
            if (Array.isArray(parsed)) {
              setUsedPhrases(parsed);
            }
          } catch (_) {
            // ignore corrupted payloads
          }
        }

        if (settingsRaw) {
          try {
            const parsed = JSON.parse(settingsRaw);
            if (parsed && typeof parsed === 'object') {
              if (typeof parsed.tinFoil === 'boolean') {
                setTinFoil(parsed.tinFoil);
              }
              if (typeof parsed.merchUrl === 'string') {
                setMerchUrl(parsed.merchUrl);
              }
            }
          } catch (_) {
            // ignore corrupted payloads
          }
        }
      } finally {
        setInitialized(true);
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!initialized) return;
    AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks)).catch(() => {});
  }, [initialized, tasks]);

  useEffect(() => {
    if (!initialized) return;
    AsyncStorage.setItem(STREAK_KEY, JSON.stringify(streak)).catch(() => {});
  }, [initialized, streak]);

  useEffect(() => {
    if (!initialized) return;
    AsyncStorage.setItem(PHRASES_KEY, JSON.stringify(usedPhrases)).catch(() => {});
  }, [initialized, usedPhrases]);

  useEffect(() => {
    if (!initialized) return;
    AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({ tinFoil, merchUrl })).catch(() => {});
  }, [initialized, tinFoil, merchUrl]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        setNudge('Did you just switch tasks? Worth it or nah?');
      }
    });
    return () => subscription.remove();
  }, []);

  const uniqueDopamineLine = useCallback(() => {
    const now = Date.now();
    const windowMs = 72 * 60 * 60 * 1000;
    let choice = dopamineLines[0];

    setUsedPhrases((prev) => {
      const recent = prev.filter((entry) => now - entry.ts < windowMs);
      const recentSet = new Set(recent.map((entry) => entry.text));
      const pool = dopamineLines.filter((line) => !recentSet.has(line));
      const source = pool.length > 0 ? pool : dopamineLines;
      choice = source[Math.floor(Math.random() * source.length)];
      const updated = [...recent, { text: choice, ts: now }];
      return updated.length > 200 ? updated.slice(updated.length - 200) : updated;
    });

    return choice;
  }, []);

  const incrementStreak = useCallback(() => {
    setStreak((prev) => {
      const day = todayKey();
      if (prev.day !== day) {
        return { day, count: 1 };
      }
      return { ...prev, count: prev.count + 1 };
    });
  }, []);

  const celebrate = useCallback(() => {
    const line = uniqueDopamineLine();
    setNudge(line);
    confettiRef.current?.start();
  }, [uniqueDopamineLine]);

  const onAddTask = useCallback(() => {
    const trimmed = taskInput.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      { id: `${Date.now()}`, text: trimmed, done: false, createdAt: Date.now() },
      ...prev
    ]);
    setTaskInput('');
  }, [taskInput]);

  const removeTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const toggleTask = useCallback(
    (id) => {
      let celebrateNow = false;
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== id) return task;
          const next = { ...task, done: !task.done };
          if (!task.done && next.done) {
            celebrateNow = true;
          }
          return next;
        })
      );
      if (celebrateNow) {
        incrementStreak();
        celebrate();
      }
    },
    [celebrate, incrementStreak]
  );

  const toggleTinFoil = useCallback((value) => {
    setTinFoil(value);
    setNudge(
      value
        ? 'Tin Foil Hat is on. Data stays on your device.'
        : 'Tin Foil Hat is off. Still no trackers here.'
    );
  }, []);

  const enterFocusMode = useCallback(() => {
    setFocusMode(true);
    setNudge('Focus Bubble ON. Shields up. (Tap exit to bail)');
  }, []);

  const exitFocusMode = useCallback(() => {
    setFocusMode(false);
    setNudge('Focus Bubble released. Re-entry successful.');
  }, []);

  const openLink = useCallback(async (url, fallbackMessage) => {
    if (!url) {
      setNudge(fallbackMessage);
      return;
    }
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        setNudge('That link looks off. Double-check it?');
      }
    } catch (err) {
      setNudge('Couldn\'t open that link. Maybe try again?');
    }
  }, []);

  const openTipJar = useCallback(() => {
    openLink('https://buymeacoffee.com/divergify', 'Tip jar link is misbehaving.');
  }, [openLink]);

  const openMerch = useCallback(() => {
    openLink(merchUrl, 'Set a merch link first.');
  }, [merchUrl, openLink]);

  const showMerchEditor = useCallback(() => {
    setMerchDraft(merchUrl);
    setEditingMerch(true);
  }, [merchUrl]);

  const saveMerchUrl = useCallback(() => {
    const trimmed = merchDraft.trim();
    const normalized = normalizeUrl(trimmed);
    setMerchUrl(normalized);
    setEditingMerch(false);
    if (trimmed) {
      setNudge('Merch link locked in. Shine on.');
    }
  }, [merchDraft]);

  const streakPercent = useMemo(() => {
    return Math.min(100, Math.round((streak.count / STREAK_GOAL) * 100));
  }, [streak.count]);

  const animatedOpacity = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.45, 0.8]
  });
  const animatedRotation = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '25deg']
  });
  const animatedScale = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2]
  });

  if (loading) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color="#2af598" />
        <Text style={styles.loadingText}>Booting your sidekick...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ExpoStatusBar style="light" />

      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={['#04141a', '#052026', '#0b1220']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.9, y: 0.9 }}
        />
        <AnimatedLinearGradient
          colors={['rgba(18,194,233,0.7)', 'rgba(0,179,179,0.7)', 'rgba(42,245,152,0.7)']}
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: animatedOpacity,
              transform: [
                { rotate: animatedRotation },
                { scale: animatedScale },
                { translateX: gradientAnim.interpolate({ inputRange: [0, 1], outputRange: [-40, 40] }) },
                { translateY: gradientAnim.interpolate({ inputRange: [0, 1], outputRange: [-30, 30] }) }
              ]
            }
          ]}
          start={{ x: 0.2, y: 0.1 }}
          end={{ x: 0.8, y: 0.9 }}
        />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={[styles.header, styles.sectionSpacing]}>
              <View style={styles.logo}>
                <View style={styles.logoGlow} />
                <Image
                  source={require('./assets/transparentlogo.png')}
                  resizeMode="contain"
                  style={styles.logoImage}
                />
              </View>
              <Text style={styles.title}>For brains that zig when the world zags.</Text>
              <Text style={styles.subtitle}>
                Managing mental traffic jams, dodging shiny objects, and rerouting creative genius.
              </Text>
            </View>

            <View style={[styles.controlsRow, styles.sectionSpacing]}>
              <Pressable style={[styles.primaryButton, styles.controlButtonSpacing]} onPress={enterFocusMode}>
                <Text style={styles.primaryButtonText}>Focus Bubble</Text>
              </Pressable>
              <View style={styles.toggleWrap}>
                <Switch
                  value={tinFoil}
                  onValueChange={toggleTinFoil}
                  trackColor={{ false: 'rgba(255,255,255,0.2)', true: '#2af598' }}
                  thumbColor={tinFoil ? '#04141a' : '#f4f3f4'}
                  ios_backgroundColor="rgba(255,255,255,0.2)"
                />
                <Text style={styles.toggleLabel}>Tin Foil Hat Mode</Text>
              </View>
            </View>

            <View style={[styles.controlsRow, styles.sectionSpacing]}>
              <Pressable style={[styles.ghostButton, styles.controlButtonSpacing]} onPress={openTipJar}>
                <Text style={styles.ghostButtonText}>Tip Jar</Text>
              </Pressable>
              <Pressable style={[styles.ghostButton, styles.controlButtonSpacing]} onPress={openMerch}>
                <Text style={styles.ghostButtonText}>Merch</Text>
              </Pressable>
              <Pressable style={[styles.setMerchButton, styles.controlButtonSpacing]} onPress={showMerchEditor}>
                <Text style={styles.setMerchText}>Set Merch Link</Text>
              </Pressable>
            </View>

            <View style={[styles.card, styles.sectionSpacing]}>
              <Text style={styles.cardTitle}>Task Blitz</Text>
              <View style={styles.taskForm}>
                <TextInput
                  style={styles.taskInput}
                  placeholder="What’s the one thing right now?"
                  placeholderTextColor="rgba(234,255,255,0.6)"
                  value={taskInput}
                  onChangeText={setTaskInput}
                  onSubmitEditing={onAddTask}
                  returnKeyType="done"
                />
                <Pressable style={styles.primaryButton} onPress={onAddTask}>
                  <Text style={styles.primaryButtonText}>Add</Text>
                </Pressable>
              </View>
              <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View style={styles.taskRow}>
                    <Pressable
                      onPress={() => toggleTask(item.id)}
                      style={[styles.checkbox, item.done && styles.checkboxDone]}
                    >
                      {item.done ? <Text style={styles.checkboxMark}>✓</Text> : null}
                    </Pressable>
                    <Pressable style={styles.taskTextWrap} onPress={() => toggleTask(item.id)}>
                      <Text style={[styles.taskText, item.done && styles.taskTextDone]}>
                        {item.text}
                      </Text>
                    </Pressable>
                    <Pressable style={styles.killButton} onPress={() => removeTask(item.id)}>
                      <Text style={styles.killButtonText}>✕</Text>
                    </Pressable>
                  </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyState}>Add a task. Small win, big dopamine.</Text>}
              />
            </View>

            <View style={[styles.card, styles.smallCard, styles.sectionSpacing]}>
              <Text style={styles.cardSubtitle}>Dopamine Meter</Text>
              <View style={styles.streakWrap}>
                <View style={[styles.streakBar, { width: `${streakPercent}%` }]} />
              </View>
              <Text style={styles.streakText}>{streak.count} wins today</Text>
            </View>

            <View style={[styles.card, styles.smallCard, styles.sectionSpacing]}>
              <Text style={styles.cardSubtitle}>Nudges</Text>
              <Text style={styles.nudgeText}>{nudge}</Text>
            </View>

            <Text style={[styles.footerText, styles.sectionSpacingSmall]}>
              © {new Date().getFullYear()} Divergify. “Tin Foil Hat Mode” keeps your data local. No trackers. No
              cloud. Just vibes.
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <ConfettiCannon
        ref={confettiRef}
        count={160}
        origin={{ x: width / 2, y: -20 }}
        autoStart={false}
        fadeOut
        explosionSpeed={350}
        fallSpeed={2000}
      />

      <Modal visible={focusMode} transparent animationType="fade" onRequestClose={exitFocusMode}>
        <Pressable style={styles.focusOverlay} onPress={exitFocusMode}>
          <View style={styles.focusCard}>
            <Text style={styles.focusTitle}>Focus Bubble</Text>
            <Text style={styles.focusBody}>
              You\'re in the bubble. Hide the chaos, tackle the one thing, tap anywhere to exit.
            </Text>
            <Text style={styles.focusHint}>(Tap to exit)</Text>
          </View>
        </Pressable>
      </Modal>

      <Modal visible={editingMerch} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Set Merch Link</Text>
            <TextInput
              style={styles.modalInput}
              value={merchDraft}
              onChangeText={setMerchDraft}
              placeholder="https://your.printify.store/url"
              placeholderTextColor="rgba(255,255,255,0.4)"
              autoCapitalize="none"
              keyboardType="url"
            />
            <View style={styles.modalActions}>
              <Pressable style={styles.modalGhost} onPress={() => setEditingMerch(false)}>
                <Text style={styles.modalGhostText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.modalPrimary} onPress={saveMerchUrl}>
                <Text style={styles.modalPrimaryText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061a20'
  },
  safeArea: {
    flex: 1
  },
  flex: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40
  },
  sectionSpacing: {
    marginBottom: 24
  },
  sectionSpacingSmall: {
    marginBottom: 12
  },
  header: {
    alignItems: 'center',
    paddingTop: 12
  },
  logo: {
    width: 120,
    height: 120,
    position: 'relative'
  },
  logoGlow: {
    position: 'absolute',
    backgroundColor: 'rgba(18,194,233,0.4)',
    width: '100%',
    height: '100%',
    borderRadius: 999,
    opacity: 0.8,
    shadowColor: '#12c2e9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30
  },
  logoImage: {
    width: '100%',
    height: '100%'
  },
  title: {
    color: '#f2fbff',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 12
  },
  subtitle: {
    color: 'rgba(242,251,255,0.82)',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6
  },
  controlsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlButtonSpacing: {
    marginRight: 12,
    marginBottom: 12
  },
  primaryButton: {
    backgroundColor: 'rgba(18,194,233,0.9)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4
  },
  primaryButtonText: {
    color: '#04141a',
    fontWeight: '700'
  },
  ghostButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)'
  },
  ghostButtonText: {
    color: '#eaffff',
    fontWeight: '600'
  },
  setMerchButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  setMerchText: {
    color: 'rgba(234,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600'
  },
  toggleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    marginTop: 12
  },
  toggleLabel: {
    color: '#eaffff',
    fontWeight: '600',
    marginLeft: 8
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 6
  },
  cardTitle: {
    color: '#f2fbff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8
  },
  cardSubtitle: {
    color: '#f2fbff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10
  },
  taskForm: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14
  },
  taskInput: {
    flex: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: Platform.select({ ios: 14, default: 10 }),
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    color: '#eaffff',
    marginRight: 12
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 10
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  checkboxDone: {
    backgroundColor: '#2af598',
    borderColor: '#2af598'
  },
  checkboxMark: {
    color: '#04141a',
    fontWeight: '800'
  },
  taskTextWrap: {
    flex: 1
  },
  taskText: {
    color: '#f2fbff',
    fontSize: 16
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: 'rgba(242,251,255,0.6)'
  },
  killButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,209,209,0.35)',
    marginLeft: 8
  },
  killButtonText: {
    color: '#ffd1d1',
    fontWeight: '700'
  },
  emptyState: {
    color: 'rgba(234,255,255,0.75)',
    textAlign: 'center',
    marginTop: 6
  },
  streakWrap: {
    height: 12,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 8
  },
  streakBar: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#2af598'
  },
  streakText: {
    color: 'rgba(242,251,255,0.85)',
    marginTop: 6
  },
  nudgeText: {
    color: '#f2fbff',
    lineHeight: 20,
    marginTop: 8
  },
  footerText: {
    textAlign: 'center',
    color: 'rgba(199,247,255,0.8)',
    paddingVertical: 16,
    fontSize: 13
  },
  focusOverlay: {
    flex: 1,
    backgroundColor: 'rgba(4,17,26,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  focusCard: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  focusTitle: {
    color: '#2af598',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12
  },
  focusBody: {
    color: '#f2fbff',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8
  },
  focusHint: {
    color: 'rgba(242,251,255,0.7)',
    textAlign: 'center',
    fontSize: 12
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  modalCard: {
    backgroundColor: 'rgba(6,26,32,0.95)',
    padding: 24,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    width: '100%',
    maxWidth: 420
  },
  modalTitle: {
    color: '#f2fbff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12
  },
  modalInput: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.select({ ios: 14, default: 10 }),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(0,0,0,0.25)',
    color: '#eaffff',
    marginBottom: 18
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  modalGhost: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    marginRight: 12
  },
  modalGhostText: {
    color: '#eaffff',
    fontWeight: '600'
  },
  modalPrimary: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#2af598'
  },
  modalPrimaryText: {
    color: '#04141a',
    fontWeight: '700'
  },
  loadingWrap: {
    flex: 1,
    backgroundColor: '#061a20',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    color: '#f2fbff',
    fontSize: 16,
    marginTop: 12
  }
});
