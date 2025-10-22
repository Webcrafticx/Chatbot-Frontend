import React, { useState } from "react";

const IssueTable = () => {
  const [issues, setIssues] = useState([
    {
      id: 1,
      name: "Rohit Sharma",
      mobile: "9876543210",
      problem: "Login not working",
      solved: false,
      date: "2025-10-22",
    },
    {
      id: 2,
      name: "Priya Verma",
      mobile: "9123456789",
      problem: "Image upload issue",
      solved: true,
      date: "2025-10-21",
    },
    {
      id: 3,
      name: "Amit Singh",
      mobile: "9001122334",
      problem: "Payment failed twice",
      solved: false,
      date: "2025-10-20",
    },
  ]);

  const handleStatusChange = (id, value) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id ? { ...issue, solved: value === "Solved" } : issue
      )
    );
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Reported Issues</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage reported issues and update their status below
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
                Mobile
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Problem
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {issues.length > 0 ? (
              issues.map((issue) => (
                <tr
                  key={issue.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">{issue.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{issue.mobile}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{issue.problem}</td>
                  <td className="px-6 py-4">
                    <select
                      value={issue.solved ? "Solved" : "Unsolved"}
                      onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                      className={`px-3 py-1 text-sm rounded-full border cursor-pointer focus:outline-none ${
                        issue.solved
                          ? "bg-green-100 text-green-700 border-green-300"
                          : "bg-red-100 text-red-700 border-red-300"
                      }`}
                    >
                      <option className="cursor-pointer">Solved</option>
                      <option className="cursor-pointer">Unsolved</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 cursor-pointer">
                    {issue.date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-10 text-center text-gray-500 text-sm"
                >
                  No issues reported yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssueTable;
