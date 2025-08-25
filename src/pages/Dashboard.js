import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { FaBriefcase, FaUsers, FaUserTie, FaFileAlt } from "react-icons/fa";

function DashboardEmployer() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Simulate fetching jobs (replace with API later)
  useEffect(() => {
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
        applications: [
          { id: 3, name: "Charlie", email: "charlie@example.com" },
        ],
        status: "Closed",
      },
    ];
    setJobs(dummyJobs);
  }, []);

  const stats = [
    { title: "Total Jobs", value: jobs.length, icon: <FaBriefcase size={24} />, bg: "bg-purple-500", color: "text-white" },
    { title: "Active Listings", value: jobs.filter(j => j.status === "Active").length, icon: <FaUserTie size={24} />, bg: "bg-green-500", color: "text-white" },
    { title: "Total Applicants", value: jobs.reduce((acc, j) => acc + j.applications.length, 0), icon: <FaUsers size={24} />, bg: "bg-blue-500", color: "text-white" },
    { title: "Shortlisted", value: 0, icon: <FaFileAlt size={24} />, bg: "bg-yellow-500", color: "text-white" }, // replace with real data
  ];

  const handleViewApplicants = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Employer Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Post a Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-xl transition-shadow duration-300">
            <CardContent className={`flex items-center p-4 ${stat.bg} rounded-lg`}>
              <div className="mr-4">{stat.icon}</div>
              <div>
                <h2 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h2>
                <p className={`${stat.color} mt-1`}>{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Job List */}
      <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Jobs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="p-2">Job Title</th>
                <th className="p-2">Category</th>
                <th className="p-2">Applications</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium text-gray-700">{job.title}</td>
                  <td className="p-2 text-gray-500">{job.category}</td>
                  <td className="p-2 text-gray-500">{job.applications.length}</td>
                  <td className="p-2 text-gray-500">{job.status}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleViewApplicants(job)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View Applicants
                    </button>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
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
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">{selectedJob.title} - Applicants</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {selectedJob.applications.length === 0 && <p>No applicants yet.</p>}
              {selectedJob.applications.map((app) => (
                <li key={app.id} className="border p-2 rounded flex justify-between items-center">
                  <div>
                    <p className="font-medium">{app.name}</p>
                    <p className="text-gray-500 text-sm">{app.email}</p>
                  </div>
                  <div className="space-x-2">
                    <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                      Shortlist
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
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
