import { create } from 'zustand';

interface GameState {
  roundId: string | null;
  timer: number;
  winningFruit: string | null;
  status: 'betting' | 'spinning' | 'result' | 'idle';
  setRound: (roundId: string, timer: number, status: GameState['status']) => void;
  setWinningFruit: (fruit: string) => void;
  setTimer: (timer: number) => void;
  setStatus: (status: GameState['status']) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  roundId: null,
  timer: 0,
  winningFruit: null,
  status: 'idle',
  setRound: (roundId, timer, status) => set({ roundId, timer, status }),
  setWinningFruit: (fruit) => set({ winningFruit: fruit, status: 'result' }),
  setTimer: (timer) => set({ timer }),
  setStatus: (status) => set({ status }),
  resetGame: () => set({ roundId: null, timer: 0, winningFruit: null, status: 'idle' }),
}));
