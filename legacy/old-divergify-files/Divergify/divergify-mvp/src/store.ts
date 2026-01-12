import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Task = { id: string; text: string; done: boolean; createdAt: number };
type State = {
  tasks: Task[];
  newTask: string;
  setNewTask: (s: string) => void;
  addTask: (t: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  resetDailyIfNeeded: () => void;
  completedTodayCount: () => number;
};

const STORAGE_KEY = 'divergify.tasks.v1';
const DAY_KEY = 'divergify.day';

const save = async (tasks: Task[]) => {
  try { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch {}
};
const load = async (): Promise<Task[]> => {
  try {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : [];
  } catch { return []; }
};

const todayStr = () => {
  const d = new Date();
  return d.toISOString().slice(0,10);
};

const useStore = create<State>((set, get) => ({
  tasks: [],
  newTask: '',
  setNewTask: (s) => set({ newTask: s }),
  addTask: (text) => {
    const t = { id: Math.random().toString(36).slice(2), text, done: false, createdAt: Date.now() };
    const tasks = [t, ...get().tasks];
    set({ tasks });
    save(tasks);
  },
  toggleTask: (id) => {
    const tasks = get().tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    set({ tasks });
    save(tasks);
  },
  removeTask: (id) => {
    const tasks = get().tasks.filter(t => t.id !== id);
    set({ tasks });
    save(tasks);
  },
  resetDailyIfNeeded: async () => {
    const last = await AsyncStorage.getItem(DAY_KEY);
    const t = todayStr();
    if (last !== t) {
      await AsyncStorage.setItem(DAY_KEY, t);
      // daily reset logic could go here (e.g., streaks, rewards reset)
    }
    // initial load once
    if (get().tasks.length === 0) {
      const loaded = await load();
      set({ tasks: loaded });
    }
  },
  completedTodayCount: () => get().tasks.filter(t => t.done).length,
}));

export default useStore;
