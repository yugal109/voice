import React from "react";
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import LogoutScreen from "./screens/LogoutScreen";
import Error from "./components/Error"
import "./css/new.css";
import "./css/homeScreen.css";
import "./css/footer.css";

const App = () => {
  return (
    <Router>
      <Navbar/>
      {/* <Switch> */}
      <Route path="/" exact component={HomeScreen}/>
      <Route path="/sign-up" component={RegisterScreen}/>
      <Route path="/sign-in" component={LoginScreen}/>
      <Route path="/sign-out" component={LogoutScreen}/>
      {/* <Route component={Error}/> */}
      {/* </Switch> */}
      <Footer/>
    </Router>
  );
};

export default App;
