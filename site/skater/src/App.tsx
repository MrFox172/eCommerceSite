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
import Payments from "./components/Account/Payments";
import useLocalStorage from "./hooks/useLocalStorage";
import { Route, Routes } from "react-router-dom";
import Verify from "./components/Auth/Verify";
import ProductPage from "./components/ProductPage/ProductPage";

import SkateboardBG from "./assets/SkateboardCarouselBackdrop.png";
import SkateBG from "./assets/SkatesCarouselBackdrop.png";
import ShoeBG from "./assets/ShoesCarouselBackdrop.png";
import ApparelBG from "./assets/ApparelCarouselBackdrop.png";
import AccessoriesBG from "./assets/AccessoriesCarouselBackdrop.png";

import { useState } from "react";
import Search from "./components/Search/Search";

import { CartManager } from "./interfaces/cartManager";

import SellProductsPage from "./components/SellProductsPage/SellProductsPage";

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
          <Route
            path="/skateboards"
            element={
              <SellProductsPage
                searchTerm={"Skateboard"}
                background={SkateboardBG}
              />
            }
          />
          <Route
            path="/skates"
            element={
              <SellProductsPage searchTerm={"Skates"} background={SkateBG} />
            }
          />
          <Route
            path="/shoes"
            element={
              <SellProductsPage searchTerm={"Shoes"} background={ShoeBG} />
            }
          />
          <Route
            path="/apparel"
            element={
              <SellProductsPage searchTerm={"Apperal"} background={ApparelBG} />
            }
          />
          <Route
            path="/accessories"
            element={
              <SellProductsPage
                searchTerm={"Accessories"}
                background={AccessoriesBG}
              />
            }
          />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route
            path="/login"
            element={
              <Login localUser={localUser} setLocalUser={setLocalUser} />
            }
          />
          <Route
            path="/logout"
            element={
              <Logout localUser={localUser} setLocalUser={setLocalUser} />
            }
          />
          <Route
            path="/account"
            element={
              <Account localUser={localUser} setLocalUser={setLocalUser} />
            }
          >

            <Route path="/account/profile" element={<Profile />} />
            <Route path="/account/seller" element={<SellerProducts />} />
            <Route path="/account/orders" Component={Orders} />
            <Route path="/account/payments" Component={Payments} />
          </Route>
          <Route path="/cart" Component={Home} />
          <Route
            path="/register"
            element={
              <Register localUser={localUser} setLocalUser={setLocalUser} />
            }
          />
          <Route path="/search/:keyword" element={<Search />} />
          <Route path="/:id/verify/:token" element={<Verify />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
