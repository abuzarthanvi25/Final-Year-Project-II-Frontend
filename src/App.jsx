import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth} from "@/layouts";
import {Home} from './pages/home/index'
import { SignIn, SignUp } from "@/pages/auth";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/Sign-up" element={<SignUp />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
