import './App.css'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"

import AuthRoutes from "./AuthRoutes.tsx";
import UserRoutes from "./UserRoutes.tsx";
import RequireAuth from "./components/UserComponents/RequireAuth.tsx";
import PersistLogin from "./components/UserComponents/PersistLogin.tsx";

function App() {

  return (
      <>
          <Router>
              <Routes>
                 <Route path="*" element={<AuthRoutes/>} />
                  <Route element={<PersistLogin/>}>
                      {/*<Route element={<RequireAuth/>}>*/}
                          <Route path="quickmessage/*" element={<UserRoutes/>} />
                      {/*</Route>*/}
                  </Route>
              </Routes>
          </Router>
      </>
  )
}

export default App
