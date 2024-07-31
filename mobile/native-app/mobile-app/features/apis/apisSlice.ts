import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apisService from "./apisService";
import { ajoute_point_de_vente, ajouteComment, getAllComments, getPointDeVente, getRendezVous, modifierComment, updatePointDeVente, UpdateRendezVous } from "../../Types/DataTypes";
export interface ApisState {
    pointsDeVente: getPointDeVente[] | null;
    isError: boolean;
    isSuccess: boolean;
    message: string;
    isLoading: boolean;
    pointDeVenteAjouter : ajoute_point_de_vente | null ;
    rendez_vous_List : getRendezVous[] | null  ; 
    Comments : getAllComments[] | null  ;
}

const initialState: ApisState = {
    pointsDeVente: null,
    isError: false,
    isSuccess: false,
    message: '',
    isLoading: false,
    pointDeVenteAjouter : null,
    rendez_vous_List : null , 
    Comments : null
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

export const getAllRendezVous = createAsyncThunk(
    "apis/getAllRendezVous",
    async (_, { getState }) => {
        const state: any = getState();
        const token = state.auth.user?.token;
        console.log("token:", token);
        if (!token) throw new Error("No token found");
        const role = state.auth.user?.role;
        if (role !== 'commercial') throw new Error("Unauthorized");
        const response = await apisService.get_rendez_vous(token);
        return response;
    }
)

export const updateRendezVous = createAsyncThunk(
    "apis/updateRendezVous",
    async ({token , id , updateRendezVous} : {token : string , id : string , updateRendezVous : UpdateRendezVous}) => {
        const response = await apisService.update_rendez_vous(token , id , updateRendezVous);
        return response;
    }
) 

export const update_Point_De_Vente = createAsyncThunk(
    "apis/update_Point_De_Vente",
    async ({token , id , updatePointDeVente} : {token : string , id : string , updatePointDeVente : updatePointDeVente}) => {
        const response = await apisService.update_Point_De_Vente(token , id , updatePointDeVente);
        return response;
    }
)

export const get_All_Comments = createAsyncThunk(
    "apis/get_All_Comments",
    async ({token , id} : {token : string , id : string}) => {
        const response = await apisService.getAllComments(token , id);
        return response;
    }
) 

export const ajouter_commentaire = createAsyncThunk(
    "apis/ajouter_commentaire",
    async ({token , id , commentaire} : {token : string , id : string , commentaire : ajouteComment}) => {
        try {
            const response = await apisService.ajouterComment(token , id , commentaire);
            return response;
        } catch(error:any) {
            console.log(error.response?.data?.message || error.message || "An error occurred while adding the point of sale");
        }
    }
);

export const supprimer_commentaire = createAsyncThunk(
    "apis/supprimer_commentaire",
    async ({token , id , id_comment} : {token : string , id : string , id_comment : string}) => {
        try {
          const response = await apisService.deleteComment(token , id , id_comment);
          return response;
        } catch(error:any) {
            console.log(error.response?.data?.message || error.message || "An error occurred while adding the point of sale");
        }
        
    } 
)
    

    export const modifier_commentaire = createAsyncThunk(
        "apis/modifier_commentaire",
        async ({token ,  id_comment , comment , id  } : {token : string ,  id_comment : string , comment:modifierComment , id : string }) => {
            try {
                console.log("token in apis slice" , token , "id_comment" , id_comment , "comment" , comment , "id" , id)
                const response = await apisService.ModifierComment(token , id_comment , comment , id);
                return response;

            } catch(error:any) {
                console.log(error.response?.data?.message || error.message || "An error occurred while adding the point of sale");

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
            state.pointDeVenteAjouter = null;
            state.rendez_vous_List = null
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
                state.pointsDeVente = state.pointsDeVente? [...state.pointsDeVente, action.payload] : [action.payload];
                
                
            })
            .addCase(ajoutePointDeVente.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string || "Something went wrong";
                state.pointDeVenteAjouter = null;
            })
            .addCase(getAllRendezVous.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllRendezVous.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.rendez_vous_List = action.payload;
            })
            .addCase(getAllRendezVous.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message || "Something went wrong";
                state.rendez_vous_List = null;
            })
            .addCase(updateRendezVous.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateRendezVous.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (state.rendez_vous_List) {
                    state.rendez_vous_List = state.rendez_vous_List.map(rdv => 
                        rdv.id === action.payload.id ? action.payload : rdv
                    );
                }
            })      
            .addCase(updateRendezVous.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string || "Something went wrong";
            }) 

            .addCase(update_Point_De_Vente.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(update_Point_De_Vente.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (state.pointsDeVente) {
                    state.pointsDeVente = state.pointsDeVente.map(point => 
                        point.id === action.payload.id ? action.payload : point
                    );
                }
            })  
            .addCase(update_Point_De_Vente.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string || "Something went wrong";
            })

            .addCase(get_All_Comments.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(get_All_Comments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.Comments = action.payload;
            })

            .addCase(get_All_Comments.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string || "Something went wrong";
                state.Comments = null;
            }) 

            .addCase(ajouter_commentaire.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(ajouter_commentaire.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.Comments =  state.Comments? [...state.Comments, action.payload] : [action.payload];
            })
            .addCase(ajouter_commentaire.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string || "Something went wrong";
                
            })
            .addCase(supprimer_commentaire.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(supprimer_commentaire.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (state.Comments) {
                    state.Comments = state.Comments.filter(comment => comment.id_comment !== action.payload);
                }
            })
            .addCase(supprimer_commentaire.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string || "Something went wrong";
                console.log(state.message);
            }) 
            .addCase(modifier_commentaire.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(modifier_commentaire.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (state.Comments) {
                    state.Comments = state.Comments.map(comment =>
                        comment.id_comment === action.payload.id_comment ? action.payload : comment
                    );
                }
            }) 
            .addCase(modifier_commentaire.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string || "Something went wrong";
                console.log(state.message);
            });

    },
});

export const { reset } = apisSlice.actions;

export default apisSlice.reducer;
