import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUserType, updatePassword, updateProfile } from "../../Types/DataTypes";


const BaseUri = "http://192.168.1.4:3000/users/";

const register = async (loginData: loginUserType): Promise<any> => {
    try {
        const response = await axios.post(BaseUri + "login", loginData);
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log('error:', error);
        throw error; 
    }
}

const UpdateProfile = async (token: string, id: string, updatedProfile: updateProfile): Promise<any> => {
    try {
        console.log("Sending request to update profile with:", { token, id, updatedProfile });
        const response = await axios.patch(BaseUri + "updateUser/" + id, updatedProfile, { headers: { Authorization: `Bearer ${token}` } });
        console.log("Response from update profile:", response.data);
        return response.data;
    } catch (error) {
        console.log('Update profile error:', error);
        throw error;
    }
} 

const UpdatePassword = async (token :string , id : string , updatedPassword: updatePassword  ) : Promise<any> => {
    try {
       const response = await axios.patch (BaseUri + "changePassword/" + id , updatedPassword , {headers: {Authorization: `Bearer ${token}`}});

       return response.data
    } catch (error) {
     console.log('Update password error:', error);
     throw error
    }
    
}


const authservice = {
    register,
    UpdateProfile,
    UpdatePassword
}

export default authservice;
