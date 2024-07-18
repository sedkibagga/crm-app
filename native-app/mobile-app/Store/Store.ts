import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../features/auth/authSlice';
import stateReducer from '../features/states/stateSlice';
import apiReducer from '../features/apis/apisSlice';
const store = configureStore({
  reducer: {
    auth: authReducer, 
    state: stateReducer,
    api: apiReducer
  },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;