import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Job Listings</h2>
        <Link to="/post-job" className="btn btn-success">
          + Post Job
        </Link>
      </div>

      {/* Job List */}
      {jobs.length === 0 ? (
        <p className="text-muted">No jobs found.</p>
      ) : (
        <div className="list-group">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="list-group-item shadow-sm mb-3 rounded"
            >
              <h5 className="fw-bold">
                {job.title} - {job.company}
              </h5>
              <p className="mb-1 text-primary">{job.location}</p>
              <p className="text-muted">{job.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobList;
