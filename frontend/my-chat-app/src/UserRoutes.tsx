import {
    Routes,
    Route
} from "react-router-dom"

import Discussion from "./pages/homePages/Discussion.tsx";
import NavBar from "./components/UserComponents/NavBar.tsx";

export default function UserRoutes () {
    return(
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Discussion />} />
                <Route path="/:receiver/:sender" element={<Discussion />} />
            </Routes>
        </>
    )
}