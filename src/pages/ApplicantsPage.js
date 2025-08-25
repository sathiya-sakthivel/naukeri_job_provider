import React from "react";

function ApplicantsPage() {
  const applicants = [
    { id: 1, name: "Alice Johnson", skills: "React, Node.js", experience: "3 years", status: "Pending" },
    { id: 2, name: "Bob Smith", skills: "Java, Spring", experience: "5 years", status: "Shortlisted" },
  ];

  return (
    <div className="jobs-card">
      <h2>Applicants for Frontend Developer</h2>
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Skills</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant.id}>
              <td>{applicant.name}</td>
              <td>{applicant.skills}</td>
              <td>{applicant.experience}</td>
              <td>{applicant.status}</td>
              <td>
                <button>Shortlist</button>
                <button>Reject</button>
                <button>Contact</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicantsPage;
