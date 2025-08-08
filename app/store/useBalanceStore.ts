import { create } from 'zustand';

interface BalanceState {
  balance: number;
  setBalance: (balance: number) => void;
  incrementBalance: (amount: number) => void;
  decrementBalance: (amount: number) => void;
}

export const useBalanceStore = create<BalanceState>((set) => ({
  balance: 0,
  setBalance: (balance) => set({ balance }),
  incrementBalance: (amount) => set((state) => ({ balance: state.balance + amount })),
  decrementBalance: (amount) => set((state) => ({ balance: state.balance - amount })),
}));
