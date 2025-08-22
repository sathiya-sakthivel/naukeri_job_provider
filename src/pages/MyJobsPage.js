import React from "react";

function MyJobsPage() {
  const jobs = [
    { id: 1, title: "Frontend Developer", date: "2025-08-01", applicants: 24, status: "Active" },
    { id: 2, title: "Backend Developer", date: "2025-07-20", applicants: 15, status: "Closed" },
  ];

  return (
    <div className="jobs-card">
      <h2>My Jobs</h2>
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Posted Date</th>
            <th>Applicants</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.date}</td>
              <td>{job.applicants}</td>
              <td>{job.status}</td>
              <td>
                <button>Edit</button>
                <button>View Applicants</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyJobsPage;
