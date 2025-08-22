import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { FaBriefcase, FaUsers, FaUserTie, FaFileAlt } from "react-icons/fa";

// Dummy data (replace with backend data)
const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    category: "IT",
    applications: [
      { id: 1, name: "Alice", email: "alice@example.com" },
      { id: 2, name: "Bob", email: "bob@example.com" },
    ],
    status: "Active",
  },
  {
    id: 2,
    title: "Data Analyst",
    category: "Finance",
    applications: [{ id: 3, name: "Charlie", email: "charlie@example.com" }],
    status: "Closed",
  },
];

function DashboardEmployer() {
  const [jobs] = useState(dummyJobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const stats = [
    { title: "Total Jobs", value: jobs.length, icon: <FaBriefcase size={24} />, bg: "bg-purple-600", color: "text-white" },
    { title: "Active Listings", value: jobs.filter(j => j.status === "Active").length, icon: <FaUserTie size={24} />, bg: "bg-green-600", color: "text-white" },
    { title: "Total Applicants", value: jobs.reduce((acc, j) => acc + j.applications.length, 0), icon: <FaUsers size={24} />, bg: "bg-blue-600", color: "text-white" },
    { title: "Shortlisted", value: 0, icon: <FaFileAlt size={24} />, bg: "bg-yellow-500", color: "text-white" },
  ];

  const handleViewApplicants = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Employer Dashboard</h1>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          Post a Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-2xl transition-shadow duration-300">
            <CardContent className={`flex items-center p-5 ${stat.bg} rounded-xl`}>
              <div className="mr-4">{stat.icon}</div>
              <div>
                <h2 className={`text-3xl font-bold ${stat.color}`}>{stat.value}</h2>
                <p className={`mt-1 ${stat.color} text-sm uppercase tracking-wide`}>{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Job List Table */}
      <Card className="p-6 hover:shadow-2xl transition-shadow duration-300 rounded-xl bg-white">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Jobs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="p-3 text-left">Job Title</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Applications</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-medium text-gray-700">{job.title}</td>
                  <td className="p-3 text-gray-500">{job.category}</td>
                  <td className="p-3 text-gray-500">{job.applications.length}</td>
                  <td className={`p-3 font-semibold ${job.status === "Active" ? "text-green-600" : "text-red-500"}`}>{job.status}</td>
                  <td className="p-3 space-x-2 flex flex-wrap">
                    <button
                      onClick={() => handleViewApplicants(job)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition">
                      Edit
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Applicants Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md animate-fadeIn">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{selectedJob.title} - Applicants</h3>
            <ul className="space-y-3 max-h-72 overflow-y-auto">
              {selectedJob.applications.length === 0 && <p className="text-gray-500">No applicants yet.</p>}
              {selectedJob.applications.map((app) => (
                <li key={app.id} className="border border-gray-200 p-3 rounded-lg flex justify-between items-center hover:shadow-md transition">
                  <div>
                    <p className="font-medium text-gray-700">{app.name}</p>
                    <p className="text-gray-500 text-sm">{app.email}</p>
                  </div>
                  <div className="space-x-2 flex">
                    <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition">Shortlist</button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition">Reject</button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="mt-5 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardEmployer;
