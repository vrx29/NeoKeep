import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import {  Routes,
  Route
} from "react-router-dom";
import Dashboard from "./components/Dashboard";

import PrivateRoute from "./routes/PrivateRoute";

function App() {
  
  return (
   <>
      <Header />
      <Routes>
        <Route path="/" element={<PrivateRoute redirectTo="/login">
          <Dashboard/>
        </PrivateRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
  </>
  );
}

export default App;
