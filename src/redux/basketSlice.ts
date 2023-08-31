import { createSlice } from '@reduxjs/toolkit';

import { BasketState } from '../interfaces/state.interface.ts';

const initialState: BasketState = {
  goods: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addGood: (state, action) => {
      state.goods = [...state.goods, action.payload];
    },
    removeGood: (state, action) => {
      const id = action.payload.id;
      state.goods = state.goods.filter((good) => good.id !== id);
    },
  },
});

export const { addGood, removeGood } = basketSlice.actions;

export default basketSlice.reducer;
