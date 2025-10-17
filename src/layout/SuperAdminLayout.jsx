import React, { useState } from "react";
import Sidebar from "../components/superadmin/common/Sidebar";
import Header from "../components/superadmin/common/Header";

const SuperAdminLayout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar 
        isMobileSidebarOpen={isMobileSidebarOpen} 
        toggleMobileSidebar={toggleMobileSidebar} 
      />
      <Header toggleMobileSidebar={toggleMobileSidebar} />
      <div className="lg:ml-[250px] pt-16 lg:pt-20 px-4 py-6 sm:px-6">
        {children}
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}
    </div>
  );
};

export default SuperAdminLayout;