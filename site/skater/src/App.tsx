import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Logout from "./components/Auth/Logout";
import Account from "./components/Account/Account";
import SellerProducts from "./components/Seller/Products";
import Profile from "./components/Account/Profile";
import Orders from "./components/Account/Orders";
import Address from "./components/Account/Address";
import Payments from "./components/Account/Payments";
import useLocalStorage from "./hooks/useLocalStorage";
import { Route, Routes } from "react-router-dom";

import { useState } from "react";
import Search from "./components/Search/Search";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const [localUser, setLocalUser] = useLocalStorage("user", "");

  return (
    <>
      <Header localUser={localUser} setLocalUser={setLocalUser} />
      <div className="min-vh-100">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/home" Component={Home} />
          <Route path="/skateboards" Component={Home} />
          <Route path="/skates" Component={Home} />
          <Route path="/shoes" Component={Home} />
          <Route path="/apparel" Component={Home} />
          <Route path="/accessories" Component={Home} />
          <Route path="/login" element={<Login localUser={localUser} setLocalUser={setLocalUser}/>} />
          <Route path="/logout" element={<Logout localUser={localUser} setLocalUser={setLocalUser}/>} />
          <Route path="/account" element={<Account localUser={localUser} setLocalUser={setLocalUser}/>}>
            <Route path="/account/profile" element={<Profile />} />
            <Route path="/account/seller" element={<SellerProducts />} />
            <Route path="/account/orders" Component={Orders} />
            <Route path="/account/address" Component={Address} />
            <Route path="/account/payments" Component={Payments} />
          </Route>
          <Route path="/cart" Component={Home} />
          <Route path="/register" Component={Register} />
          <Route path="/search/:keyword" element={<Search />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
