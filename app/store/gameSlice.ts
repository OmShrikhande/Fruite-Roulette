import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  roundId: string | null;
  timer: number;
  winningFruit: string | null;
  status: 'betting' | 'spinning' | 'result' | 'idle';
}

const initialState: GameState = {
  roundId: null,
  timer: 0,
  winningFruit: null,
  status: 'idle',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setRound(state, action: PayloadAction<{ roundId: string; timer: number; status: GameState['status'] }>) {
      state.roundId = action.payload.roundId;
      state.timer = action.payload.timer;
      state.status = action.payload.status;
    },
    setWinningFruit(state, action: PayloadAction<string>) {
      state.winningFruit = action.payload;
      state.status = 'result';
    },
    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload;
    },
    setStatus(state, action: PayloadAction<GameState['status']>) {
      state.status = action.payload;
    },
    resetGame(state) {
      state.roundId = null;
      state.timer = 0;
      state.winningFruit = null;
      state.status = 'idle';
    },
  },
});

export const { setRound, setWinningFruit, setTimer, setStatus, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
