import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/todoapp";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Login from   "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
         <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile />} />

        {/* Dynamic Route */}
        <Route path="/task/:id" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;