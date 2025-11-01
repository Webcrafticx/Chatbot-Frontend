import React, { useState, useEffect } from "react";
import { CalendarDays, RefreshCw } from "lucide-react";
import RenewModal from "../../../components/admin/common/RenewModal";

const Subscription = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [renewModalOpen, setRenewModalOpen] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      const localStatus = localStorage.getItem("subscriptionStatus");
      const localEndDate = localStorage.getItem("subscriptionEndDate");

      if (localStatus && localEndDate) {
        setSubscription({
          status: localStatus,
          endDate: localEndDate,
        });
      } else {
        setSubscription(null);
      }
    } catch (error) {
      console.error("Error fetching subscription:", error);
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-16">
        <div className="text-gray-600 text-sm">Loading subscription…</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-5">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5 max-w-4xl mx-auto">
        {message.text && (
          <div
            className={`mb-3 text-sm px-3 py-2 rounded-md transition-all ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-blue-600" />
            </div>

            <div className="flex flex-col">
              <span
                className={`text-sm font-medium ${
                  subscription?.status === "active"
                    ? "text-gray-900"
                    : "text-red-600"
                }`}
              >
                {subscription?.status === "active"
                  ? "Active Subscription"
                  : "No Active Subscription"}
              </span>
              <span className="text-xs text-gray-500">
                Ends on {subscription ? formatDate(subscription.endDate) : "—"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                subscription?.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {subscription?.status
                ? subscription.status.toUpperCase()
                : "INACTIVE"}
            </span>

            <button
              onClick={() => setRenewModalOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition cursor-pointer"
            >
              <RefreshCw size={14} />
              Renew
            </button>
          </div>
        </div>
      </div>

      {/* Shared Renew Modal */}
      <RenewModal
        open={renewModalOpen}
        onClose={() => setRenewModalOpen(false)}
        onSuccess={() => {
          fetchSubscription();
          setRenewModalOpen(false);
        }}
      />
    </div>
  );
};

export default Subscription;
