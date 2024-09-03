import axios from "axios";
import {BASE_URL} from "../constants";

// Crée une instance d'Axios avec la configuration de base
const axiosClient = axios.create({
    baseURL: BASE_URL, // URL de base de votre API
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL, // URL de base de votre API
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true,
});



export default axiosClient;