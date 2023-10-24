import { createSlice } from '@reduxjs/toolkit';

import { BasketState } from '../../interfaces/state.interface.ts';

const initialState: BasketState = {
  basket: {},
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    savaBasket: (state, action) => {
      state.basket = action.payload.basket;
    },
    addToBasket: (state, action) => {
      state.basket = action.payload.basket;
    },
  },
});

export const { savaBasket } = basketSlice.actions;

export default basketSlice.reducer;
