import { useStore } from '../state/store';

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:8787';

export async function chatWithSidekick(message: string): Promise<string> {
  const tinfoil = useStore.getState().prefs.tinfoil;
  if (tinfoil) return 'Tin Foil Hat Mode: offline planning only. Add a Sprintable and roll.';
  try {
    const persona = useStore.getState().prefs.persona;
    const res = await fetch(`${BACKEND_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, persona, context: {} })
    });
    const data = await res.json();
    return data.reply || 'No reply.';
  } catch {
    return 'Network issue. Try again.';
  }
}

export async function transcribeAudio(localUri: string): Promise<string> {
  const tinfoil = useStore.getState().prefs.tinfoil;
  if (tinfoil) return '[local] Transcript disabled in Tin Foil Hat Mode.';
  try {
    const form = new FormData();
    // @ts-ignore: React Native FormData type
    form.append('audio', { uri: localUri, name: 'audio.webm', type: 'audio/webm' });
    const res = await fetch(`${BACKEND_URL}/transcribe`, { method: 'POST', body: form as any });
    const data = await res.json();
    return data.text || '';
  } catch {
    return '[error] Could not transcribe.';
  }
}