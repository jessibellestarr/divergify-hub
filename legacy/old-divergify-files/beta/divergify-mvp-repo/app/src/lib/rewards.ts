const pool = ['Neurons did a high five.','Anchor secured. The ship stops wobbling.','Focus Flux → Focus Flex.','Dopamine Breadcrumb gobbled. Next.','You moved the needle. Loudly.'];
const history: { [userId:string]: Array<[number,string]> } = {};
export function pickRewardCopy(userId:string){
  const now = Date.now();
  const recents = (history[userId]||[]).filter(([ts]) => now-ts < 72*3600*1000).map(([,copy])=>copy);
  const candidates = pool.filter(x=> !recents.includes(x));
  const arr = candidates.length? candidates : pool;
  const pick = arr[Math.floor(Math.random()*arr.length)];
  history[userId] = [...(history[userId]||[]), [now, pick]].slice(-200);
  return pick;
}