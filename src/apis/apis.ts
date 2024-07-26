import axios from "axios";
import { headers } from "next/headers";

const BaseUri = "http://localhost:3000/users/";

// Function to fetch all users
export const fetchUsersApi = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token used for fetch:", token);

    const response = await axios.get(BaseUri + "admin/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const deleteUserApi = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(BaseUri + "deleteUser/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('User deleted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('There was an error deleting the user:', error);
    throw error;
  }
};

export const createUser = async (
    nom: string,
    prenom: string,
    email: string,
    password: string,
    role: string,
    num_tel: number
  ) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post(BaseUri + 'create', {
        nom,
        prenom,
        email,
        password,
        role,
        num_tel
      }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      console.log('User created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('There was an error creating the user:', error);
      throw error;
    }
  };

  export const getAllEquipes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(BaseUri + "admin/getEquipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data; 
    } catch (error) {
      console.error('There was an error fetching equipes:', error);
      throw error;
    }
  };

  export const deleteEquipeApi = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(BaseUri + "admin/deleteEquipe/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Equipe deleted successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('There was an error deleting the Equipe:', error);
      throw error;
    }
  };

  export const createEquipe = async (
    secteur: string,
    lieu: string,
    nom: string,
    id_chefEquipe: string,
  ) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post(BaseUri + 'admin/create/equipe', {
        secteur,
        lieu,
        nom,
        id_chefEquipe,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      console.log('Equipe created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('There was an error creating the Equipe:', error);
      throw error;
    }
  };