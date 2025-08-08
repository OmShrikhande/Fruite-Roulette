import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import gameReducer from './gameSlice';
import betReducer from './betSlice';
import balanceReducer from './balanceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    bet: betReducer,
    balance: balanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
