import axiosClient from "../services/axios.jsx";
import useAuth from "./useAuth.tsx";
import {LOGOUT_URL} from "../constants";

const useLogout = () => {
    // @ts-ignore
    const {setAuth} = useAuth();
    return async () => {
        setAuth({})
        try {
              await axiosClient.post(
                LOGOUT_URL,
            );
        } catch (err) {
            console.log(err);
        }
    };
}

export default useLogout;

