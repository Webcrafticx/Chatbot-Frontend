import React from "react";
import { Menu, LogOut } from "lucide-react";
import { logout } from "../../../services/auth";

const Header = ({ toggleMobileSidebar }) => {
  const handleLogout = async () => {
    if (window.confirm("Do you want to Logout?")) {
      try {
        await logout();
        window.location.href = "/";
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 fixed top-0 left-0 lg:left-[250px] right-0 z-10">
      <div className="flex items-center justify-between px-4 py-4 gap-6 sm:px-6">
        {/* Mobile menu button */}
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <Menu size={24} />
        </button>

        {/* Spacer to push logout to the right */}
        <div className="flex-grow"></div>

        {/* Logout button */}
        <button 
          onClick={handleLogout}
          className="w-9 h-9 rounded-full bg-[#F6F9FC] flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
          title="Logout"
        >
          <LogOut className="w-5 h-5 text-[#8BA3CB]" />
        </button>
      </div>
    </div>
  );
};

export default Header;