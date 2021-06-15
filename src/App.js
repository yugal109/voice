import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import "./css/new.css";
import "./css/homeScreen.css";
import "./css/footer.css";

const App = () => {
  return (
    <div>
      <Navbar/>
      <HomeScreen/>
      <Footer/>
    </div>
  );
};

export default App;
