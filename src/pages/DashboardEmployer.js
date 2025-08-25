import React from "react";
import { FaBriefcase, FaUsers, FaClipboardList, FaCalendarAlt } from "react-icons/fa";

function EmployerDashboard() {
  const stats = [
    { title: "Jobs Posted", value: 12, icon: <FaBriefcase />, color: "bg-blue-100 text-blue-600" },
    { title: "Applications", value: 85, icon: <FaUsers />, color: "bg-green-100 text-green-600" },
    { title: "Shortlisted", value: 24, icon: <FaClipboardList />, color: "bg-purple-100 text-purple-600" },
    { title: "Interviews", value: 7, icon: <FaCalendarAlt />, color: "bg-orange-100 text-orange-600" },
  ];

  const applications = [
    { name: "John Doe", position: "Frontend Developer", status: "Shortlisted", date: "22 Aug 2025" },
    { name: "Priya Sharma", position: "UI/UX Designer", status: "Under Review", date: "21 Aug 2025" },
    { name: "Rahul Singh", position: "Backend Engineer", status: "Rejected", date: "20 Aug 2025" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-10">JobPortal</h1>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-3 text-blue-600 font-medium">
            <FaBriefcase /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <FaBriefcase /> Post Job
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <FaClipboardList /> My Jobs
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <FaUsers /> Applications
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-semibold text-gray-800">Employer Dashboard</h2>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700">
            + Post a Job
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-sm rounded-xl p-6 flex items-center gap-4"
            >
              <div className={`p-3 rounded-lg text-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-gray-500">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Applications</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                <th className="p-3">Candidate</th>
                <th className="p-3">Position</th>
                <th className="p-3">Status</th>
                <th className="p-3">Applied On</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">{app.name}</td>
                  <td className="p-3 text-gray-600">{app.position}</td>
                  <td
                    className={`p-3 font-semibold ${
                      app.status === "Shortlisted"
                        ? "text-green-600"
                        : app.status === "Rejected"
                        ? "text-red-600"
                        : "text-orange-500"
                    }`}
                  >
                    {app.status}
                  </td>
                  <td className="p-3 text-gray-500">{app.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default EmployerDashboard;
