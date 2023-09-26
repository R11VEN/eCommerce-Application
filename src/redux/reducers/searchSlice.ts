import { createSlice } from '@reduxjs/toolkit';

import { SearchState } from '../../interfaces/state.interface.ts';

const initialState: SearchState = {
  value: '',
  visible: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload.value;
    },
    setVisible: (state, action) => {
      state.visible = action.payload.visible;
    },
  },
});

export const { setSearchValue, setVisible } = searchSlice.actions;

export default searchSlice.reducer;
