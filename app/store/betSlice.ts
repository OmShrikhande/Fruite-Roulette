import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Bet {
  fruit: string;
  amount: number;
}

interface BetState {
  bets: Bet[];
  totalBet: number;
}

const initialState: BetState = {
  bets: [],
  totalBet: 0,
};

const betSlice = createSlice({
  name: 'bet',
  initialState,
  reducers: {
    placeBet(state, action: PayloadAction<Bet>) {
      state.bets.push(action.payload);
      state.totalBet += action.payload.amount;
    },
    clearBets(state) {
      state.bets = [];
      state.totalBet = 0;
    },
  },
});

export const { placeBet, clearBets } = betSlice.actions;
export default betSlice.reducer;
