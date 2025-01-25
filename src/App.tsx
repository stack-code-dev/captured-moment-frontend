import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/Auth/Login";
import { SignUp } from "./pages/Auth/SignUp";
import { Home } from "./pages/Home/Home";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
      </Routes>
    </Router>
  )
}

const Root = () => {
  const isAithenticated = !!localStorage.getItem('cm:token');

  return isAithenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
}

