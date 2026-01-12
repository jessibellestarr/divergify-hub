import { useStore } from '../state/store';
export async function chatWithSidekick(message:string): Promise<string>{
  const tinfoil = useStore.getState().prefs.tinfoil;
  if(tinfoil) return 'Tin Foil Hat Mode: offline planning only. Add a Sprintable and roll.';
  return 'Plan: 1) Anchor Task 25m 2) Two Sprintables 3) Reset ritual.';
}
export async function transcribeAudio(localUri:string): Promise<string>{
  const tinfoil = useStore.getState().prefs.tinfoil;
  if(tinfoil) return '[local] Transcript disabled in Tin Foil Hat Mode.';
  return '[stub] Transcribed idea from audio.';
}