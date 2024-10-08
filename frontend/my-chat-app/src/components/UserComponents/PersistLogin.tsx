import {Outlet} from "react-router-dom";
import {useState, useEffect} from "react";
import useRefreshToken from "../../hooks/useRefreshToken.jsx";
import useAuth from "../../hooks/useAuth.jsx";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    // @ts-ignore
    const { auth } = useAuth();

    // @ts-ignore
    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }


        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {isLoading
                ? <div className="h-screen flex items-center justify-center w-full">
                    <span className="loader"></span>
                </div>
                : <Outlet />
            }
        </>
    )

}

export default PersistLogin;