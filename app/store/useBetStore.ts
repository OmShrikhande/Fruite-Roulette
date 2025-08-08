import { create } from 'zustand';

interface Bet {
  fruit: string;
  amount: number;
}

interface BetState {
  bets: Bet[];
  totalBet: number;
  placeBet: (bet: Bet) => void;
  clearBets: () => void;
}

export const useBetStore = create<BetState>((set, get) => ({
  bets: [],
  totalBet: 0,
  placeBet: (bet) => set((state) => ({ bets: [...state.bets, bet], totalBet: state.totalBet + bet.amount })),
  clearBets: () => set({ bets: [], totalBet: 0 }),
}));
