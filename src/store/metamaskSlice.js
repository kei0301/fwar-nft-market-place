import { createSlice } from '@reduxjs/toolkit';
// import MetaMaskOnboarding from '@metamask/onboarding';

// export const existMetamask = createAsyncThunk(
//   'metamask/existMetamask',
//   async (userId, thunkAPI) => {
//     return MetaMaskOnboarding.isMetaMaskInstalled();
//   }
// );

const initialState = {
  isOpenModalWallet: false
};
const customizationReducer = createSlice({
  name: 'metamask',
  initialState,
  reducers: {
    openModalWalletConnect: (state, action) => {
      state.isOpenModalWallet = true;
    },
    closeModalWalletConnect: (state, action) => {
      state.isOpenModalWallet = false;
    }
  }
});
const { reducer, actions } = customizationReducer;
export const { openModalWalletConnect, closeModalWalletConnect } = actions;
export default reducer;
