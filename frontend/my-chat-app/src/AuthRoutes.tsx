import {
    Routes,
    Route
} from "react-router-dom"

import Logo from "./components/Logo.tsx";
import Signup from "./pages/authPages/Signup.tsx";
import Login from "./pages/authPages/Login.tsx";
import ErrorBoundary from "./components/UserBoundary.tsx";

export default function AuthRoutes () {
    return(
        <>
            <div className="max-w-sm mx-auto">
                <Logo size="h-32 w-32" />
                <Routes>
                        <Route path="/signup" element={
                            <ErrorBoundary>
                                <Signup />
                            </ErrorBoundary>
                        } />
                    <Route path="/" element={<Login />} />
                </Routes>
            </div>
        </>
    )
}