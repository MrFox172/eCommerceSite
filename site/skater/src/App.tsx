import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";

import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/home" Component={Home} />
        <Route path="/skateboards" Component={Home} />
        <Route path="/skates" Component={Home} />
        <Route path="/shoes" Component={Home} />
        <Route path="/apparel" Component={Home} />
        <Route path="/accessories" Component={Home} />
        <Route path="/login" Component={Home} />
        <Route path="/cart" Component={Home} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
