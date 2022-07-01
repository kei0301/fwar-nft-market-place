import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserApi from 'apis/UserApi';

export const existUser = createAsyncThunk('user/existUser', async (account, thunkAPI) => {
  const { data: dataUser } = await UserApi.find(account);
  let user;
  // console.log('dataUser', dataUser);
  if (!dataUser) {
    const { data: newUser } = await UserApi.signup({ address: account });
    user = newUser;
  } else {
    user = dataUser;
  }
  return user;
});
const initialState = {
  isLogin: false,
  user: null
};
const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(existUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  }
});
const { reducer, actions } = userReducer;
export const { login, logout } = actions;
export default reducer;
