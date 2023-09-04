import { createSlice } from '@reduxjs/toolkit';

export interface UserProfileState {
  editMode: boolean;
  userEditForm: { [key: string]: string | number | boolean };
  isChanged: boolean;
}

const initialState: UserProfileState = {
  editMode: false,
  userEditForm: {},
  isChanged: false,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    changedSuccess: (state) => {
      state.editMode = false;
      state.isChanged = true;
      state.userEditForm = initialState.userEditForm;
    },
    setEditMode: (state) => {
      state.editMode = true;
    },
    removeEditMode: (state) => {
      state.editMode = false;
      state.isChanged = false;
      state.userEditForm = initialState.userEditForm;
    },
    saveEditForm: (state, action) => {
      state.userEditForm = { ...state.userEditForm, ...action.payload.field };
    },
    resetEditForm: (state) => {
      state.userEditForm = initialState.userEditForm;
      state.isChanged = false;
    },
  },
});

export const { changedSuccess, setEditMode, removeEditMode, saveEditForm, resetEditForm } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;
