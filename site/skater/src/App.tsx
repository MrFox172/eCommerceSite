import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Route path="/" Component={Home} />
      <Route path="/home" Component={Home} />
      <Footer />
    </>
  );
}

export default App;
