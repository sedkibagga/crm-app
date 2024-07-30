import axios from "axios";
import { ajoute_point_de_vente, ajouteComment, getPointDeVente, getRendezVous, modifierComment, updatePointDeVente, UpdateRendezVous } from "../../Types/DataTypes";

const BaseUri = "http://192.168.43.44:3000/users/"; //Carte réseau sans fil Wi-Fi


const get_all_point_de_vente = async (token: string): Promise<getPointDeVente[]> => {
    try {
        // console.log("token:", token);
        const response = await axios.get(BaseUri + "getPointDeVente", {
             
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error ; 
    }
}; 
const ajouter_point_de_vente = async(PointDeVente : ajoute_point_de_vente , token: string) : Promise<any> => {
  try { 

    const response = await axios.post(BaseUri + "ajouterPointDeVente", PointDeVente , { headers: { Authorization: `Bearer ${token}` } }); 
    if (response.data) {
      return response.data;
    } 

  } catch(error:any) {
    throw new Error(error.response?.data?.message || error.message || "An error occurred while adding the point of sale");
}
};

const get_rendez_vous = async(token : string) : Promise<getRendezVous[]> => {
    try{
      const response = await axios.get(BaseUri+"getRendezVous" , {headers: {Authorization: `Bearer ${token}`}});
     
        return response.data;
      
    } catch(error:any) {
     throw new Error(error.response?.data?.message || error.message || "An error occurred while adding the point of sale");
    }
}

const update_rendez_vous = async (token: string , id: string , updateRendezVous: UpdateRendezVous) : Promise<any> => {
    try {
       const response = await axios.patch(BaseUri+"update/rendezVous/"+id, updateRendezVous , {headers: {Authorization: `Bearer ${token}`}}) ;

        return response.data;
    } catch(error:any) {
        throw new Error(error.response?.data?.message || error.message || "An error occurred while adding the point of sale");
    }
} 


const update_Point_De_Vente = async (token : string , id : string , updatePointDeVente : updatePointDeVente) : Promise<any> => {
     try { 
        const response = await axios.patch(BaseUri + "update/pointDeVente/" + id , updatePointDeVente , {headers: {Authorization: `Bearer ${token}`}});
        return response.data;

     } catch (error : any) { 
        throw new Error(error.response?.data?.message || error.message || "An error occurred while adding the point of sale");

     }
} 

const getAllComments = async (token : string , id : string) : Promise<any> => {
    try {
        const response = await axios.get(BaseUri + "Commentaires/" + id , {headers: {Authorization: `Bearer ${token}`}});
        return response.data;
    } catch (error : any) {
        throw new Error(error.response?.data?.message || error.message || "An error occurred while adding the point of sale");
    }
} 

const ajouterComment = async (token : string , id : string , data : ajouteComment) : Promise<any> => {
    try {
        const response = await axios.post(BaseUri+"ajouterCommentaire/" + id , data , {headers: {Authorization: `Bearer ${token}`}});
        return response.data;
    } catch (error : any) {
        throw new Error(error.response?.data?.message || error.message || "An error occurred while adding the point of sale");

    }
}

const deleteComment = async (token : string , id : string , id_comment : string) : Promise<any> => {
    try {
        const response = await axios.delete(BaseUri+"supprimerComment/"+id+"/"+id_comment , {headers: {Authorization: `Bearer ${token}`}});
        return response.data;
    } catch (error:any) {
        console.log(error.response?.data?.message || error.message || "An error occurred while adding the point of sale");
     throw new Error(error.response?.data?.message || error.message || "An error occurred while adding the point of sale");
    }

} 

const ModifierComment = async (token : string , id_comment : string , comment : modifierComment , id : string) : Promise<any> => {
    try {
        console.log ("token in apis service" , token , "id_comment" , id_comment , "comment" , comment , "id" , id) 
        console.log(BaseUri+'modifierCommentaire/'+id+'/'+id_comment) ; 
        const response = await axios.patch(BaseUri+'modifierCommentaire/'+id+'/'+id_comment , comment , {headers: {Authorization: `Bearer ${token}`}});
        return response.data;

    } catch (error:any) {
        console.log(error.response?.data?.message || error.message || "An error occurred while adding the point of sale");
        throw new Error(error.response?.data?.message || error.message || "An error occurred while adding the point of sale");

    }
}


const apisService = {
    get_all_point_de_vente ,
    ajouter_point_de_vente,
    get_rendez_vous ,
    update_rendez_vous ,
    update_Point_De_Vente ,
    getAllComments ,
    ajouterComment, 
    deleteComment,
    ModifierComment
};

export default apisService;
