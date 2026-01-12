import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import SectionCard from '../components/sectioncard';
import PrimaryButton from '../components/primarybutton';
import BrandBadge from '../components/brandbadge';
import usePersistentState from '../hooks/usepersistentstate';
import { SIDEKICKS, DEFAULT_SIDEKICK_ID, getSidekick } from '../constants/sidekicks';
import { colors, spacing } from '../constants/colors';

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function containsAny(message, words) {
  const lower = message.toLowerCase();
  return words.some((word) => lower.includes(word));
}

function nextStep(text) {
  return `Next step (60 seconds): ${text}`;
}

function stopPoint() {
  return 'Stop point: when the 60 seconds end, stop and decide.';
}

function supportDisclaimer() {
  return 'Not therapy. Not clinical. Just honest support.';
}

function wrapUpReply() {
  return [
    'Wrap-up summary (3 bullets):',
    '- What moved today?',
    '- What is the next micro-step?',
    '- What can wait without guilt?',
    '',
    nextStep('Pick one tiny task and do 60 seconds.'),
    stopPoint(),
    supportDisclaimer(),
  ].join('\n');
}

function takotaReply(message) {
  if (containsAny(message, ['overwhelm', 'overwhelmed', 'spinning', 'panic', 'too much'])) {
    return [
      'Okay. We are not fixing your whole life today.',
      'Pick one tiny thing and do 60 seconds.',
      nextStep('Open the thing and do the first micro action.'),
      stopPoint(),
    ].join('\n');
  }
  if (containsAny(message, ['plan', 'priority', 'organize', 'schedule'])) {
    return [
      'Two-step plan:',
      '1) Pick one outcome for the next 25 minutes.',
      '2) Pick one task that proves progress.',
      nextStep('Start a 10-minute sprint, then reassess.'),
      stopPoint(),
    ].join('\n');
  }
  if (containsAny(message, ['habit', 'routine', 'streak'])) {
    return [
      'Habits are not a morality contest.',
      'Shrink it until it is doable on a bad day.',
      nextStep('Name one habit and write the tiny version.'),
      stopPoint(),
      supportDisclaimer(),
    ].join('\n');
  }
  if (containsAny(message, ['focus', 'timer', 'pomodoro', 'sprint'])) {
    return [
      'One target. One timer. No side quests.',
      nextStep('Start a 10-minute focus sprint.'),
      stopPoint(),
    ].join('\n');
  }
  return [
    'What is the smallest thing you want done in the next 10 minutes?',
    nextStep('Choose the smallest option that still moves the needle.'),
    stopPoint(),
  ].join('\n');
}

function scholarReply(message) {
  const lines = [
    'Lets reduce uncertainty.',
    '1) Define done in one sentence.',
    '2) Define the first observable step.',
    '3) Timebox to 10 minutes.',
    nextStep('Write the done-definition, then do 60 seconds.'),
    stopPoint(),
    supportDisclaimer(),
  ];
  if (containsAny(message, ['research', 'study', 'learn', 'read', 'write'])) {
    lines.unshift('Academic mode: clear target, clear constraint, clear next action.');
  }
  return lines.join('\n');
}

function chaosReply() {
  return [
    'Controlled novelty time.',
    'Pick one weird-but-safe trick:',
    '- Do it for 2 minutes only.',
    '- Change the location.',
    '- Rename the task to something smaller.',
    nextStep('Set a 2-minute timer and start.'),
    stopPoint(),
  ].join('\n');
}

function drillReply() {
  return [
    'One objective.',
    '1) Choose one target.',
    '2) Start 10 minutes.',
    '3) No side quests.',
    nextStep('Begin the first tiny action.'),
    stopPoint(),
  ].join('\n');
}

function zenReply() {
  return [
    'We will keep this calm and literal.',
    'Step 1: choose one task.',
    'Step 2: set a timer for 10 minutes.',
    'Step 3: do only the first step.',
    'If stuck, reduce the step size by half.',
    stopPoint(),
    supportDisclaimer(),
  ].join('\n');
}

function systemsReply() {
  return [
    'Systems mode: literal and predictable.',
    'Answer these in order:',
    '1) What is the output?',
    '2) What is the smallest input?',
    '3) What is the first test?',
    nextStep('Write one sentence for the output.'),
    stopPoint(),
  ].join('\n');
}

function generateSidekickReply({ sidekickId, message }) {
  const trimmed = message.trim();
  if (!trimmed) return '';
  if (containsAny(trimmed, ['wrap up', 'wrap-up', 'done for today', 'exit'])) {
    return wrapUpReply();
  }
  switch (sidekickId) {
    case 'scholar':
      return scholarReply(trimmed);
    case 'chaos_buddy':
      return chaosReply();
    case 'drill_coach':
      return drillReply();
    case 'zen':
      return zenReply();
    case 'systems':
      return systemsReply();
    case 'takota':
    default:
      return takotaReply(trimmed);
  }
}

const defaultTurn = (sidekickId) => ({
  id: uid(),
  role: 'assistant',
  sidekickId,
  content: 'Tell me what is stuck in one sentence. We will make it small.',
  ts: new Date().toISOString(),
});

export default function SidekicksScreen() {
  const [activeId, setActiveId, activeHydrated] = usePersistentState(
    'sidekickActiveId',
    DEFAULT_SIDEKICK_ID
  );
  const [chat, setChat, chatHydrated] = usePersistentState('sidekickChat', []);
  const [text, setText] = useState('');

  const active = useMemo(() => getSidekick(activeId), [activeId]);

  useEffect(() => {
    if (!chatHydrated || chat.length) return;
    setChat([defaultTurn(activeId)]);
  }, [chatHydrated, chat.length, setChat, activeId]);

  useEffect(() => {
    if (!activeHydrated || !activeId) return;
    setActiveId(activeId);
  }, [activeHydrated, activeId, setActiveId]);

  const send = (override) => {
    const message = (override ?? text).trim();
    if (!message) return;
    const userTurn = {
      id: uid(),
      role: 'user',
      sidekickId: activeId,
      content: message,
      ts: new Date().toISOString(),
    };
    const reply = generateSidekickReply({ sidekickId: activeId, message });
    const assistantTurn = {
      id: uid(),
      role: 'assistant',
      sidekickId: activeId,
      content: reply,
      ts: new Date().toISOString(),
    };
    setChat((prev) => [...prev, userTurn, assistantTurn]);
    setText('');
  };

  const clearChat = () => {
    setChat([defaultTurn(activeId)]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SectionCard>
        <BrandBadge tagline="Adaptive support, zero guilt" />
        <Text style={styles.heading}>Sidekicks</Text>
        <Text style={styles.helper}>
          Pick a personality that matches your bandwidth. Switch anytime.
        </Text>
        <View style={styles.sidekickRow}>
          {SIDEKICKS.map((sidekick) => {
            const isActive = sidekick.id === activeId;
            return (
              <TouchableOpacity
                key={sidekick.id}
                style={[styles.sidekickChip, isActive && styles.sidekickChipActive]}
                onPress={() => setActiveId(sidekick.id)}
              >
                <Text style={[styles.sidekickName, isActive && styles.sidekickNameActive]}>
                  {sidekick.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.tagline}>{active.tagline}</Text>
        <View style={styles.boundaryList}>
          {active.boundaries.map((line) => (
            <Text key={line} style={styles.boundaryItem}>• {line}</Text>
          ))}
        </View>
      </SectionCard>

      <SectionCard>
        <Text style={styles.subheading}>Chat</Text>
        <FlatList
          data={chat}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.turn, item.role === 'user' && styles.turnUser]}>
              <Text style={styles.turnBadge}>
                {item.role === 'user' ? 'You' : getSidekick(item.sidekickId).name}
              </Text>
              <Text style={styles.turnText}>{item.content}</Text>
            </View>
          )}
        />
        <View style={styles.inputRow}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Example: I am stuck. Give me one small step."
            placeholderTextColor="#6b7280"
            style={styles.input}
            multiline
          />
          <PrimaryButton label="Send" onPress={() => send()} disabled={!text.trim()} style={styles.sendButton} />
        </View>
        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={() => send('wrap up')}>
            <Text style={styles.action}>Wrap up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearChat}>
            <Text style={styles.action}>Clear</Text>
          </TouchableOpacity>
        </View>
      </SectionCard>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  heading: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  helper: {
    color: colors.muted,
    marginBottom: spacing.sm,
  },
  sidekickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  sidekickChip: {
    borderWidth: 1,
    borderColor: '#1f1f29',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
  },
  sidekickChipActive: {
    borderColor: colors.accent,
  },
  sidekickName: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  sidekickNameActive: {
    color: colors.accent,
  },
  tagline: {
    color: colors.muted,
    marginBottom: spacing.sm,
  },
  boundaryList: {
    gap: 4,
  },
  boundaryItem: {
    color: colors.text,
    fontSize: 12,
  },
  subheading: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  turn: {
    backgroundColor: '#101018',
    borderRadius: 14,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: '#1f1f29',
  },
  turnUser: {
    borderColor: colors.accentMuted,
  },
  turnBadge: {
    color: colors.muted,
    fontSize: 12,
    marginBottom: 6,
  },
  turnText: {
    color: colors.text,
    lineHeight: 20,
  },
  inputRow: {
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  input: {
    minHeight: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1f1f29',
    backgroundColor: '#0d0d13',
    color: colors.text,
    padding: spacing.sm,
    textAlignVertical: 'top',
  },
  sendButton: {
    marginTop: spacing.sm,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  action: {
    color: colors.accent,
    fontWeight: '600',
  },
});
