import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-[#555] text-white p-4 flex gap-6 justify-center">
      <Link to="/">Home</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
}