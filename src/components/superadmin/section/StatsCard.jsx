import React from 'react'

const StatsCard = ({ title, count, subtitle, icon: Icon }) => {
  return (
    <div
      className="bg-white border rounded-3xl p-5 flex items-center justify-between"
      style={{ borderColor: "#DFEAF2" }}
    >
      <div>
        <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
        <p className="text-4xl font-bold text-black mt-2">{count}</p>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      <div className="-mt-16">
        <Icon />
      </div>
    </div>
  );
};

export default StatsCard
