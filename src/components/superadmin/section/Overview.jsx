import React, { useState, useEffect } from "react";
import StatsCard from "./StatsCard";
import { TotalUsersIcon, ActiveUsersIcon, InactiveUsersIcon } from "../svg";


const Overview = ({ users, error }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  });

  useEffect(() => {
    if (users?.length > 0) {
      const active = users.filter((u) => u.isActive).length;
      const inactive = users.length - active;

      setStats({
        totalUsers: users.length,
        activeUsers: active,
        inactiveUsers: inactive,
      });
    } else {
      setStats({
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0,
      });
    }
  }, [users]);

  if (error)
    return (
      <div className="p-5">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading users: {error}
        </div>
      </div>
    );

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">User Overview</h2>
        <p className="text-sm text-gray-600 mt-1">
          Track total, active, and inactive users
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Users"
          count={stats.totalUsers}
          subtitle="All registered users"
          icon={TotalUsersIcon}
        />
        <StatsCard
          title="Active Users"
          count={stats.activeUsers}
          subtitle="Currently active users"
          icon={ActiveUsersIcon}
        />
        <StatsCard
          title="Inactive Users"
          count={stats.inactiveUsers}
          subtitle="Currently inactive users"
          icon={InactiveUsersIcon}
        />
      </div>
    </div>
  );
};

export default Overview;
