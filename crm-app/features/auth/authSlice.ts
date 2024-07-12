// authSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authservice from "./authService";
import { loginUserType } from "../../Types/DataTypes";

export interface AuthState {
    user: any;
    isError: boolean;
    isSuccess: boolean;
    message: string;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    isError: false,
    isSuccess: false,
    message: '',
    isLoading: false,
};

export const loadUserFromStorage = createAsyncThunk(
    'auth/loadUserFromStorage',
    async () => {
        try { 
            const userString = await AsyncStorage.getItem('user');
            return userString ? JSON.parse(userString) : null;
        } catch (error) {
            console.error('Error loading user from AsyncStorage:', error);
            return null;
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (loginData: loginUserType, thunkAPI) => {
        try {
            const response = await authservice.register(loginData);
            await AsyncStorage.setItem("user", JSON.stringify(response)); 
            return response;
        } catch (error:any) {
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async () => {
        await AsyncStorage.removeItem("user");
    }
);

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
    extraReducers: (builder) => {
        builder
            .addCase(loadUserFromStorage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadUserFromStorage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loadUserFromStorage.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                console.error('Failed to load user from AsyncStorage:', action.error);
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
                state.user = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const { reset } = authSlice.actions;
export const authReducer = authSlice.reducer;
