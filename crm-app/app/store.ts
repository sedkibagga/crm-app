import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../features/auth/authSlice';
import stateReducer from '../features/states/stateSlice';
const store = configureStore({
  reducer: {
    auth: authReducer, 
    state: stateReducer
  },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;