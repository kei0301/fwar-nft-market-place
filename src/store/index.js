import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import customizationReducer from './customizationSlice';
import metamaskReducer from './metamaskSlice';
import nftReducer from './nftData';
const store = configureStore({
  reducer: {
    customization: customizationReducer,
    metamask: metamaskReducer,
    user: userReducer,
    nftdata: nftReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
