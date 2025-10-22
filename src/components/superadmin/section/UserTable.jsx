import React from "react";
import { Trash2 } from "lucide-react";

const UserTable = ({ users = [], onDelete }) => {
  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      onDelete && onDelete(user);
    }
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">User List</h2>
        <p className="text-sm text-gray-600 mt-1">
          View and manage all registered users
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
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
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Registered Date
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.registeredDate || "-"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(user)}
                      className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1 cursor-pointer mx-auto"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
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
  );
};

export default UserTable;
