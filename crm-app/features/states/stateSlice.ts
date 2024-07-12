import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state interface
export interface StatesInterface {
    showModalNavigation: boolean;
    showModalProfile : boolean ; 
}

// Define initial state values
const initialState: StatesInterface = {
    showModalNavigation: false,
    showModalProfile : false ,
};

// Create the state slice using createSlice
export const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        showModal: (state) => {
            state.showModalNavigation = true;
        },
        hideModal: (state) => {
            state.showModalNavigation = false;
        },

        showModalProfile: (state) => {
            state.showModalProfile = true;
        },
        hideModalProfile: (state) => {
            state.showModalProfile = false;
        },
    },
});

export const { showModal, hideModal , showModalProfile, hideModalProfile } = stateSlice.actions;


export default stateSlice.reducer;
