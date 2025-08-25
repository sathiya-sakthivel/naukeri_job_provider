import React, { useState } from "react";

function PostJobPage() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    skills: "",
    location: "",
    salary: "",
    type: "Full-time",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", job);
    alert("Job posted successfully!");
  };

  return (
    <div className="form-container">
      <h2>Post a New Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Job Title</label>
        <input type="text" name="title" value={job.title} onChange={handleChange} required />

        <label>Job Description</label>
        <textarea name="description" value={job.description} onChange={handleChange} required />

        <label>Required Skills (comma separated)</label>
        <input type="text" name="skills" value={job.skills} onChange={handleChange} />

        <label>Location</label>
        <input type="text" name="location" value={job.location} onChange={handleChange} />

        <label>Salary / CTC</label>
        <input type="text" name="salary" value={job.salary} onChange={handleChange} />

        <label>Employment Type</label>
        <select name="type" value={job.type} onChange={handleChange}>
          <option>Full-time</option>
          <option>Internship</option>
          <option>Part-time</option>
          <option>Contract</option>
        </select>

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}

export default PostJobPage;
