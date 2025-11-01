import React, { useState } from "react";
import { Trash2, RefreshCw, X, CalendarDays, AlertCircle } from "lucide-react";
import { deleteUser, renewSubscriptionApi } from "../../../services/superadmin/api";

const UserTable = ({ users = [], loading = false, onDeleteUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [renewModalUser, setRenewModalUser] = useState(null);
  const [duration, setDuration] = useState(1);
  const [renewing, setRenewing] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const pricePerMonth = 79;

  const confirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser(selectedUser._id);
      if (onDeleteUser) onDeleteUser(selectedUser._id);
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete user");
    }
  };

  const closeModal = () => setSelectedUser(null);

  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleRenew = async () => {
    if (!renewModalUser) return;
    if (!duration || duration <= 0) {
      setMessage({ type: "error", text: "Please enter a valid duration in months." });
      return;
    }

    try {
      setRenewing(true);
      const payload = {
        durationInMonths: duration,
        amount: pricePerMonth * duration,
        paymentMode: "online",
        userId: renewModalUser._id,
        endDate: renewModalUser.subscription?.endDate,
      };

      const res = await renewSubscriptionApi(payload);

      if (res?.success || res?.status === true) {
        setMessage({
          type: "success",
          text: `Subscription renewed successfully for ${renewModalUser.name}!`,
        });
        setRenewModalUser(null);
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
      setTimeout(() => setMessage({ type: "", text: "" }), 4000);
    }
  };

  const isExpired = (user) => {
    if (!user.subscription?.endDate) return true;
    return new Date(user.subscription.endDate) < new Date();
  };

  return (
    <div className="p-5 relative">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">User List</h2>
        <p className="text-sm text-gray-600 mt-1">
          View and manage all registered users and their subscriptions
        </p>
      </div>

      {/* Status Message */}
      {message.text && (
        <div
          className={`mb-4 text-sm px-3 py-2 rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Registered
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Subscription Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-gray-500 text-sm"
                  >
                    Loading...
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user) => {
                  const expired = isExpired(user);
                  const status = expired ? "expired" : "active";
                  return (
                    <tr
                      key={user._id}
                      className={`transition-colors duration-200 ${
                        expired ? "bg-red-50/40 hover:bg-red-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {user.subscription ? (
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                expired
                                  ? "bg-red-100 text-red-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {expired ? "Expired" : "Active"}
                            </span>
                            {!expired && (
                              <span className="text-gray-600 text-xs">
                                until {formatDate(user.subscription.endDate)}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-center flex justify-center gap-2">
                        <button
                          onClick={() => setRenewModalUser(user)}
                          className="flex items-center gap-1 text-sm bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition cursor-pointer"
                        >
                          <RefreshCw size={14} />
                          Renew
                        </button>
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={16} />
                          {/* <span className="hidden sm:inline text-sm">Delete</span> */}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-gray-500 text-sm"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Renew Modal */}
      {renewModalUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-3 cursor-pointer"
          onClick={() => setRenewModalUser(null)}
        >
          <div
            className="bg-white rounded-xl shadow-lg w-full max-w-sm p-5 relative cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setRenewModalUser(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Renew Subscription
                </h3>
                <p className="text-xs text-gray-600">
                  For <strong>{renewModalUser.name}</strong> — ₹79/month
                </p>
              </div>
            </div>

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
                  placeholder="Enter number of months"
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
      )}

      {/* Delete Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Delete User
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900">
                {selectedUser.name}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-3">
              {/* <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                Cancel
              </button> */}
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
