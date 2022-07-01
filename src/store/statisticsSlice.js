import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openState: false
};
const customizationReducer = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.openState = true;
    }
  }
});
const { reducer, actions } = customizationReducer;
export const { openDrawer, closeDrawer } = actions;
export default reducer;
