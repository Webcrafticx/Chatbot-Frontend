import React, { useState } from "react";
import { Menu, LogOut, X } from "lucide-react";
import { logout } from "../../../services/auth";

const Header = ({ toggleMobileSidebar }) => {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogoutConfirm = async () => {
    try {
      setLoggingOut(true);
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoggingOut(false);
      setLogoutModalOpen(false);
    }
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 fixed top-0 left-0 lg:left-[250px] right-0 z-10">
        <div className="flex items-center justify-between px-4 py-4 gap-6 sm:px-6">
          {/* Mobile menu button */}
          <button
            onClick={toggleMobileSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
          >
            <Menu size={24} />
          </button>

          {/* Spacer */}
          <div className="flex-grow"></div>

          {/* Logout button */}
          <button
            onClick={() => setLogoutModalOpen(true)}
            className="w-9 h-9 rounded-full bg-[#F6F9FC] flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-[#8BA3CB]" />
          </button>
        </div>
      </div>

      {/* Logout confirmation modal */}
      {logoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-lg shadow-md w-full max-w-sm p-5 relative">
            {/* Close button */}
            <button
              onClick={() => setLogoutModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
              aria-label="close"
            >
              <X size={16} />
            </button>

            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Logout Confirmation
            </h3>
            <p className="text-xs text-gray-600 mb-5">
              Are you sure you want to log out of your account?
            </p>

            <div className="flex justify-end gap-2">
              {/* <button
                onClick={() => setLogoutModalOpen(false)}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button> */}
              <button
                onClick={handleLogoutConfirm}
                disabled={loggingOut}
                className="px-3 py-1.5 bg-black text-white rounded-md text-sm hover:bg-gray-800 disabled:opacity-60 cursor-pointer"
              >
                {loggingOut ? "Logging out…" : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
