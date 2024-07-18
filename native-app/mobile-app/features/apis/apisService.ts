import axios from "axios";
import { ajoute_point_de_vente, getPointDeVente } from "../../Types/DataTypes";

const BaseUri = "http://192.168.137.1:3000/users/";

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


const apisService = {
    get_all_point_de_vente ,
    ajouter_point_de_vente
};

export default apisService;
