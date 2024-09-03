import {Navigate, useLocation} from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";

const RequireAuth = () => {
    const { auth }: any = useAuth();
    const location = useLocation();

    return (
        !auth?.username
                ? <Navigate to="/" state={{ from: location }} replace />
                : <Navigate to="/quickmessage" state={{ from: location }} replace />
    );
}

export default RequireAuth;