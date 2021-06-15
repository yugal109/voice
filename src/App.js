import React from "react";
import { BrowserRouter as Router,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import "./css/new.css";
import "./css/homeScreen.css";
import "./css/footer.css";

const App = () => {
  return (
    <Router>
    <div>
      <Navbar/>
      <Route path="/" exact component={HomeScreen}/>
      <Route path="/sign-up" component={RegisterScreen}/>
      <Route path="/sign-in" component={LoginScreen}/>
      <Footer/>
    </div>
    </Router>
  );
};

export default App;
