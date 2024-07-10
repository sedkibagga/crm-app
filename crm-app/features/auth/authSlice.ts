import { createSlice } from "@reduxjs/toolkit";
import authservice from "./authService"; 


const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    message: '',
    isLoading: false,
    
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.user = null;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
            state.isLoading = false;
            
        }
    },
}) 


export const { reset } = authSlice.actions;
export default authSlice.reducer;