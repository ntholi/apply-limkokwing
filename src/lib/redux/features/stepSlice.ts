import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface StepState {
  value: number;
}

const initialState: StepState = {
  value: 0,
};

export const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, setStep } = stepSlice.actions;

export default stepSlice.reducer;
