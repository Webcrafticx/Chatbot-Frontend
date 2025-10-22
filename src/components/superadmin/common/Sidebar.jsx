import React from "react";
import { LayoutDashboard, Plus, Menu, UserPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isMobileSidebarOpen, toggleMobileSidebar }) => {
  const location = useLocation();
  
  // Function to check if current path matches the link
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Common styles for navigation items
  const getNavItemStyles = (path) => {
    const baseStyles = "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium";
    
    if (isActive(path)) {
      return `${baseStyles} bg-[#1C1C27] text-white`;
    }
    
    return `${baseStyles} text-[#1C1C27] hover:bg-gray-100`;
  };

  return (
    <div className={`w-[250px] h-screen bg-white shadow-md border-r border-gray-200 fixed top-0 left-0 z-20
      lg:translate-x-0 transition-transform duration-300 ease-in-out
      ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* Mobile menu button */}
      <div className="lg:hidden absolute right-0 top-0 -mr-12 p-4">
        <button 
          onClick={toggleMobileSidebar}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Logo replaced with text - changed border to grey */}
      <div className="px-6 py-6 border-b border-gray-200 mt-4">
        <Link to="/" className="flex items-center justify-center">
          <span className="text-2xl font-bold text-[#1C1C27] bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ChatBot
          </span>
        </Link>
      </div>

      {/* Overview Section */}
      <div className="px-6 mt-6">
        <p className="text-xs text-[#686868] mb-4">OVERVIEW</p>
        <div className="flex flex-col gap-2">
          {/* Register User */}
          <Link
            to="/register-user"
            className={getNavItemStyles("/register-user")}
            onClick={toggleMobileSidebar}
          >
            <UserPlus size={18} />
            <span>Register User</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;