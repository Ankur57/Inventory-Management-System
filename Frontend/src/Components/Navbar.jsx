import { useState } from "react";
import { Menu, X } from "lucide-react"; // icons
import mylogo from '../assets/Logo3.png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  

  const handleLogout = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/logout`,
      {},
      { withCredentials: true }
    );

    console.log("✅ Logged out successfully");
    navigate('/login');
  } catch (error) {
    console.log("Logout error:", error);
  }
};


  return (
    <nav className="flex justify-between items-center px-4 py-3 shadow-md">
      {/* Logo */}
      <div>
        <img src={mylogo} alt="Logo" className="h-12 w-28 sm:h-16 sm:w-36" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 mr-10">
        <Link to = '/home' className="font-Playfair text-xl cursor-pointer">Home</Link>
        <Link to = '/inventory' className="font-Playfair text-lg cursor-pointer">Inventory</Link>
        <Link to = '/insights' className="font-Playfair text-lg cursor-pointer">Insights</Link>
        <h2 onClick={handleLogout} className="font-Playfair text-lg cursor-pointer">Logout</h2>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute z-50 top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 md:hidden">
          <Link to = '/home' className="font-Playfair text-lg cursor-pointer">Home</Link>
          <Link to = '/inventory' className="font-Playfair text-lg cursor-pointer">Inventory</Link>
          <Link to = '/insights' className="font-Playfair text-lg cursor-pointer">Insights</Link>
          <Link to = '/login' className="font-Playfair text-lg cursor-pointer">Logout</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
