import axiosClient from "../services/axios.jsx";
import useAuth from "./useAuth.tsx";
import {REFRESH_URL} from "../constants";

const useRefreshToken = () => {
    // @ts-ignore
    const { setAuth } = useAuth();

    return async () => {

        try {
            const response = await axiosClient.post(
                REFRESH_URL,
                {},
                {withCredentials: true}
            );
            setAuth((prev: any) => {
                console.log(JSON.stringify(prev));
                console.log(response.data.accessToken);
                return {...prev,
                    // roles: response.data.roles,
                    accessToken: response.data.accessToken,};
            });
            return response.data.accessToken;
        }catch (err: any){
            console.log(err);
            if (err.response?.status === 403) {
                console.log('Requête annulée :', err.response.data.detail);
            }
        }

    };
};

export default useRefreshToken;