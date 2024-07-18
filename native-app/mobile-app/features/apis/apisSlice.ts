import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apisService from "./apisService";
import { ajoute_point_de_vente, getPointDeVente } from "../../Types/DataTypes";

export interface ApisState {
    pointsDeVente: getPointDeVente[] | null;
    isError: boolean;
    isSuccess: boolean;
    message: string;
    isLoading: boolean;
    pointDeVenteAjouter : ajoute_point_de_vente | null
}

const initialState: ApisState = {
    pointsDeVente: null,
    isError: false,
    isSuccess: false,
    message: '',
    isLoading: false,
    pointDeVenteAjouter : null
};

export const getAllPointDeVente = createAsyncThunk(
    "apis/getAllPointDeVente",
    async (_, { getState }) => {
        const state: any = getState();
        const token = state.auth.user?.token;
        console.log("token:", token);
        if (!token) throw new Error("No token found");
        
        const response = await apisService.get_all_point_de_vente(token);
        return response;
    }
); 

export const ajoutePointDeVente = createAsyncThunk(
    "apis/ajoutePointDeVente",
    async (PointDeVente: ajoute_point_de_vente, { getState, rejectWithValue }) => {
        try {
            const state: any = getState();
            const token = state.auth.user?.token;
            console.log("token:", token);
            if (!token) throw new Error("No token found");
            const role = state.auth.user?.role;
            if (role !== 'commercial') throw new Error("Unauthorized");
            
            const response = await apisService.ajouter_point_de_vente(PointDeVente, token);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const apisSlice = createSlice({
    name: "apis",
    initialState,
    reducers: {
        reset: (state) => {
            state.pointsDeVente = null;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPointDeVente.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPointDeVente.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.pointsDeVente = action.payload;
            })
            .addCase(getAllPointDeVente.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message || "Something went wrong";
                state.pointsDeVente = null;
            })
            .addCase(ajoutePointDeVente.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(ajoutePointDeVente.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.pointDeVenteAjouter = action.payload;
            })
            .addCase(ajoutePointDeVente.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string || "Something went wrong";
                state.pointDeVenteAjouter = null;
            });
    },
});

export const { reset } = apisSlice.actions;

export default apisSlice.reducer;
