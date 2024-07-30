// authService.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUserType } from "../../Types/DataTypes";

const BaseUri = "http://192.168.43.134:3000/users/";

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

const authservice = {
    register
}

export default authservice;
