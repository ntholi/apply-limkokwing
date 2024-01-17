import { db } from '@/lib/config/firebase';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { addDoc, collection, setDoc, doc } from 'firebase/firestore/lite';

export interface StepState {
  value: number;
  userId: string;
}

const initialState: StepState = {
  value: 0,
  userId: '',
};

interface Payload {
  value: number;
  userId: string;
}

export const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      state.value += 1;
      state.userId = action.payload;
      addToFirestore(action.payload, state.value);
    },
    decrement: (state, action: PayloadAction<string>) => {
      state.value -= 1;
      state.userId = action.payload;
      addToFirestore(action.payload, state.value);
    },
    setStep: (state, action: PayloadAction<Payload>) => {
      state.value = action.payload.value;
      state.userId = action.payload.userId;
      addToFirestore(action.payload.userId, state.value);
    },
  },
});

export const { increment, decrement, setStep } = stepSlice.actions;

export default stepSlice.reducer;

async function addToFirestore(userId: string, value: number) {
  const docRef = await setDoc(
    doc(db, 'users', userId),
    {
      step: value,
    },
    { merge: true }
  );
}
