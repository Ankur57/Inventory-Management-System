import { useState } from "react";
import { Menu, X } from "lucide-react"; // icons
import mylogo from '../assets/Logo3.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-4 py-3 shadow-md">
      {/* Logo */}
      <div>
        <img src={mylogo} alt="Logo" className="h-12 w-28 sm:h-16 sm:w-36" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 mr-10">
        <h2 className="font-Playfair text-xl cursor-pointer">Home</h2>
        <h2 className="font-Playfair text-lg cursor-pointer">Inventory</h2>
        <h2 className="font-Playfair text-lg cursor-pointer">Insights</h2>
        <h2 className="font-Playfair text-lg cursor-pointer">Logout</h2>
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
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 md:hidden">
          <h2 className="font-Playfair text-lg cursor-pointer">Home</h2>
          <h2 className="font-Playfair text-lg cursor-pointer">Inventory</h2>
          <h2 className="font-Playfair text-lg cursor-pointer">Insights</h2>
          <h2 className="font-Playfair text-lg cursor-pointer">Logout</h2>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
