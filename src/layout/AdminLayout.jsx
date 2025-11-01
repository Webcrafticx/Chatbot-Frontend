import React, { useState, useEffect } from "react";
import Sidebar from "../components/admin/common/Sidebar";
import Header from "../components/admin/common/Header";
import { CalendarDays, RefreshCw } from "lucide-react";
import RenewModal from "../components/admin/common/RenewModal";

const AdminLayout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [renewModalOpen, setRenewModalOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  useEffect(() => {
    const endDate = localStorage.getItem("subscriptionEndDate");
    const status = localStorage.getItem("subscriptionStatus");

    if (!endDate || status !== "active") {
      setIsExpired(true);
      return;
    }

    const expiryDate = new Date(endDate);
    const today = new Date();

    setIsExpired(today > expiryDate);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <Sidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        toggleMobileSidebar={toggleMobileSidebar}
      />
      <Header toggleMobileSidebar={toggleMobileSidebar} />

      <div className="lg:ml-[250px] pt-16 lg:pt-20 px-4 py-6 sm:px-6 relative z-0">
        {children}

        {isExpired && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center z-20">
            <div className="max-w-md bg-white rounded-xl shadow-lg p-6 border border-gray-200 relative">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-red-100 text-red-600 flex items-center justify-center rounded-full mb-3">
                  <CalendarDays size={22} />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  Subscription Expired
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Your admin access is paused. Please renew your subscription to continue.
                </p>

                <button
                  onClick={() => setRenewModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                >
                  <RefreshCw size={16} />
                  Renew Subscription
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Shared Renew Modal */}
      <RenewModal
        open={renewModalOpen}
        onClose={() => setRenewModalOpen(false)}
        onSuccess={() => {
          setIsExpired(false);
          setRenewModalOpen(false);
        }}
      />

      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-lg bg-opacity-50 z-10 lg:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;
