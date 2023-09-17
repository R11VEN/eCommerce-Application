import { createSlice } from '@reduxjs/toolkit';

import { BasketState } from '../interfaces/state.interface.ts';

const initialState: BasketState = {
  goods: [],
  id: '',
  anonymousId: '',
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload.id;
    },
    setAnonymousId: (state, action) => {
      state.anonymousId = action.payload.anonymousId;
    },
    addGood: (state, action) => {
      state.goods = [...state.goods, action.payload];
    },
    removeGood: (state, action) => {
      const id = action.payload.id;
      state.goods = state.goods.filter((good) => good.id !== id);
    },
  },
});

export const { setId, setAnonymousId, addGood, removeGood } = basketSlice.actions;

export default basketSlice.reducer;
