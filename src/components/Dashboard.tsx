import React from "react";

type Datum = { title: string; value: string };

type DashboardProps = {
  username: string;
  data: Datum[];
  onLogout: () => void;
};

const Dashboard: React.FC<DashboardProps> = ({ username, data, onLogout }) => (
  <section className="w-full max-w-xl mx-auto p-4 bg-white rounded shadow">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Welcome, {username}!</h2>
      <button
        className="text-sm text-gray-500 underline hover:text-gray-800"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
    <h3 className="text-lg font-semibold mb-2">Your Data</h3>
    {data.length === 0 ? (
      <div className="text-gray-500">No data added yet.</div>
    ) : (
      <ul className="divide-y">
        {data.map((item, idx) => (
          <li key={idx} className="py-2 flex justify-between items-center">
            <span className="font-medium">{item.title}</span>
            <span className="text-gray-700">{item.value}</span>
          </li>
        ))}
      </ul>
    )}
  </section>
);

export default Dashboard;