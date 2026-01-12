import { create } from 'zustand';
export type Task = { id:string; title:string; tags?:string[]; status:'open'|'done'; createdAt:number };
export type Prefs = { tinfoil:boolean; persona:'snark'|'soft'|'deadpan'; points:number; energy:number; mood:number };

type State = { prefs: Prefs; tasks: Task[]; addTask:(title:string, tags?:string[])=>void; toggleTask:(id:string)=>void; addPoints:(n:number)=>void; setEnergy:(n:number)=>void; setMood:(n:number)=>void; setPersona:(p:Prefs['persona'])=>void; setTinFoil:(v:boolean)=>void };

export const useStore = create<State>((set,get)=>({
  prefs:{ tinfoil:false, persona:'snark', points:0, energy:60, mood:0 },
  tasks:[],
  addTask:(title, tags=[])=> set(s=>({ tasks:[{ id:String(Date.now()), title, tags, status:'open', createdAt:Date.now() }, ...s.tasks] })),
  toggleTask:(id)=> set(s=>{ const tasks = s.tasks.map(t=> t.id===id ? { ...t, status: t.status==='open'?'done':'open' } : t); const was = s.tasks.find(t=>t.id===id)?.status==='open'; return { tasks, prefs:{ ...s.prefs, points: s.prefs.points + (was?10:0) } }; }),
  addPoints:(n)=> set(s=>({ prefs:{ ...s.prefs, points: s.prefs.points + n } })),
  setEnergy:(n)=> set(s=>({ prefs:{ ...s.prefs, energy:n } })),
  setMood:(n)=> set(s=>({ prefs:{ ...s.prefs, mood:n } })),
  setPersona:(p)=> set(s=>({ prefs:{ ...s.prefs, persona:p } })),
  setTinFoil:(v)=> set(s=>({ prefs:{ ...s.prefs, tinfoil:v } }))
}));