import { BrowserRouter ,Routes, Route, Navigate} from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyles"
import DashBoard from "./pages/Dashboard";
import Booking from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Account from "./pages/Account"
function App() {
  return (
    <>
    <GlobalStyle/>
    <BrowserRouter>
    <Routes>
    <Route index element={<Navigate replace
     to='dashboard'/>}/>

    <Route path="dashboard" element={<DashBoard/>}/>
    <Route path="booking" element={<Booking/>}/>
    <Route path="cabins" element={<Cabins/>}/>
    <Route path="users" element={<Users/>}/>
    <Route path="settings" element={<Settings/>}/>
    <Route path="account" element={<Account/>}/>
    <Route path="login" element={<Login/>}/>
    <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
