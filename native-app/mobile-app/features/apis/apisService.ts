import axios from "axios";
import { ajoute_point_de_vente, getPointDeVente, getRendezVous, updatePointDeVente, UpdateRendezVous } from "../../Types/DataTypes";

const BaseUri = "http://192.168.1.66:3000/users/"; //Carte réseau sans fil Wi-Fi

// Function to fetch all point de vente data with token authorization
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



  




const apisService = {
    get_all_point_de_vente ,
    ajouter_point_de_vente,
    get_rendez_vous ,
    update_rendez_vous ,
    update_Point_De_Vente
};

export default apisService;
