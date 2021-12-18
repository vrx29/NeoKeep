import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  
  return (
   <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
  </>
  );
}

export default App;
