import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/todoapp";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile />} />

        {/* Dynamic Route */}
        <Route path="/task/:id" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;