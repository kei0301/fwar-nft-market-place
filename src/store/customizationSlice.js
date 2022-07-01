import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openState: false
};
const customizationReducer = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.openState = true;
    },
    closeDrawer: (state) => {
      state.openState = false;
    }
  }
});
const { reducer, actions } = customizationReducer;
export const { openDrawer, closeDrawer } = actions;
export default reducer;
