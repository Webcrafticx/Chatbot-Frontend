import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteUser } from "../../../services/superadmin/api";

const UserTable = ({ users = [], loading = false, onDeleteUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);

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

  return (
    <div className="p-5 relative">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">User List</h2>
        <p className="text-sm text-gray-600 mt-1">
          View and manage all registered users
        </p>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Registered Date</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500 text-sm">
                    Loading...
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                    <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 capitalize">{user.role}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1 cursor-pointer mx-auto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500 text-sm">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Delete User</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900">{selectedUser.name}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                Cancel
              </button>
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
