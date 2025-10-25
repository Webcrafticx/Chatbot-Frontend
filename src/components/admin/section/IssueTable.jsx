import React, { useState, useEffect } from "react";
import { getVisitorsListApi, updateVisitorStatusApi } from "../../../services/admin/api";

const IssueTable = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
    fromDate: "",
  });

  useEffect(() => {
    fetchVisitorsList();
  }, [pagination.page, pagination.limit, filters]);

  const getChatbotSlug = () => {
    return localStorage.getItem("chatbotSlug");
  };

  const fetchVisitorsList = async () => {
    try {
      setLoading(true);
      const slug = getChatbotSlug();

      if (!slug) {
        console.error("Chatbot slug not found");
        setLoading(false);
        return;
      }

      const params = {
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.fromDate && { fromDate: filters.fromDate }),
      };

      const response = await getVisitorsListApi(slug, params);

      //  Match your actual response structure
      if (response?.List?.data && Array.isArray(response.List.data)) {
        const transformedIssues = response.List.data.map((visitor) => ({
          id: visitor._id,
          name: visitor.name || "Unknown",
          mobile: visitor.phone || "N/A",
          problem: visitor.message || "No issue reported",
          solved:
            visitor.status === "resolved" ||
            visitor.status === "solved" ||
            visitor.solved === true,
          date: visitor.createdAt
            ? new Date(visitor.createdAt).toISOString().split("T")[0]
            : "N/A",
        }));

        setIssues(transformedIssues);
        setPagination((prev) => ({
          ...prev,
          total: response.List.total || transformedIssues.length,
        }));
      } else {
        setIssues([]);
      }
    } catch (error) {
      console.error("Error fetching visitors list:", error);
      alert("Failed to fetch issues");
      setIssues([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, value) => {
    try {
      const isSolved = value === "Solved";

      await updateVisitorStatusApi(getChatbotSlug(), id, {
  status: isSolved ? "solved" : "unsolved",
//   solved: isSolved,
});


      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === id ? { ...issue, solved: isSolved } : issue
        )
      );

    //   alert(`Status updated to ${value}`);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
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

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              placeholder="Search by name or problem..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) => handleFilterChange("fromDate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setFilters({ search: "", fromDate: "" });
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto w-full">
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
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {issue.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {issue.mobile}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {issue.problem}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={issue.solved ? "Solved" : "Unsolved"}
                          onChange={(e) =>
                            handleStatusChange(issue.id, e.target.value)
                          }
                          className={`px-3 py-1 text-sm rounded-full border cursor-pointer focus:outline-none ${
                            issue.solved
                              ? "bg-green-100 text-green-700 border-green-300"
                              : "bg-red-100 text-red-700 border-red-300"
                          }`}
                        >
                          <option value="Solved" className="cursor-pointer">
                            Solved
                          </option>
                          <option value="Unsolved" className="cursor-pointer">
                            Unsolved
                          </option>
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

          {/* Pagination */}
          {issues.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}{" "}
                  of {pagination.total} results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={
                      pagination.page * pagination.limit >= pagination.total
                    }
                    className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IssueTable;
