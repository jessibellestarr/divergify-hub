import * as AV from 'expo-av';
export async function recordAudio(durationMs=4000): Promise<string|null>{
  await AV.Audio.requestPermissionsAsync();
  const recording = new AV.Audio.Recording();
  await recording.prepareToRecordAsync(AV.Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
  await recording.startAsync();
  setTimeout(async ()=> { try{ await recording.stopAndUnloadAsync(); }catch{} }, durationMs);
  return new Promise((resolve)=> setTimeout(()=>{ try{ const uri = recording.getURI(); resolve(uri||null);}catch{ resolve(null);} }, durationMs+200));
}