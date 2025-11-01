import React, { useState } from "react";
import { X } from "lucide-react";
import { renewSubscriptionApi } from "../../../services/admin/api";

const RenewModal = ({ open, onClose, onSuccess }) => {
  const [duration, setDuration] = useState(1);
  const [renewing, setRenewing] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const pricePerMonth = 79;

  const handleRenew = async () => {
    if (!duration || duration <= 0) {
      setMessage({ type: "error", text: "Please enter a valid duration in months." });
      return;
    }

    try {
      setRenewing(true);

      const userId = localStorage.getItem("userId");
      const endDate = localStorage.getItem("subscriptionEndDate");

      const payload = {
        durationInMonths: duration,
        amount: pricePerMonth * duration,
        paymentMode: "online",
        userId,
        endDate,
      };

      const res = await renewSubscriptionApi(payload);

      if (res?.success || res?.status === true) {
        const currentEndDate = endDate ? new Date(endDate) : new Date();
        currentEndDate.setMonth(currentEndDate.getMonth() + duration);

        // localStorage.setItem("subscriptionStatus", "active");
        // localStorage.setItem("subscriptionEndDate", currentEndDate.toISOString());

        setMessage({ type: "success", text: "Subscription renewed successfully!" });

        if (onSuccess) onSuccess();

        setTimeout(() => {
          setMessage({ type: "", text: "" });
          onClose();
        }, 1500);
      } else {
        setMessage({
          type: "error",
          text: res?.message || "Failed to renew subscription.",
        });
      }
    } catch (err) {
      console.error("Renew error:", err);
      setMessage({
        type: "error",
        text: "Something went wrong while renewing subscription.",
      });
    } finally {
      setRenewing(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-3 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-sm p-5 relative cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
          aria-label="close"
        >
          <X size={16} />
        </button>

        <h3 className="text-base font-semibold text-gray-900 mb-2">
          Renew Subscription
        </h3>
        <p className="text-xs text-gray-600 mb-4">
          Enter duration (in months) and confirm renewal. ₹79/month applies.
        </p>

        {message.text && (
          <div
            className={`mb-3 text-sm px-3 py-2 rounded-md ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-3 mb-5">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Duration (Months)
            </label>
            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md text-sm px-3 py-2 focus:ring-1 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Total Amount
            </label>
            <input
              type="text"
              readOnly
              value={
                duration > 0
                  ? `₹${pricePerMonth * duration} (₹79 × ${duration})`
                  : "—"
              }
              className="w-full border border-gray-300 rounded-md text-sm px-3 py-2 bg-gray-50 cursor-default"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleRenew}
            disabled={renewing}
            className="px-3 py-1.5 bg-black text-white rounded-md text-sm hover:bg-gray-800 disabled:opacity-60 cursor-pointer"
          >
            {renewing ? "Renewing…" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenewModal;
