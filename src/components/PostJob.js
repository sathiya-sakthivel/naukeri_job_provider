import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const [form, setForm] = useState({ title: "", company: "", location: "", description: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePost = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/jobs", form);
      setMessage(res.data.message);
      navigate("/jobs"); // go back to job list
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: "500px" }}>
      <h2 className="mb-3 text-center">Post a Job</h2>
      <input className="form-control mb-2" placeholder="Title" name="title" value={form.title} onChange={handleChange} />
      <input className="form-control mb-2" placeholder="Company" name="company" value={form.company} onChange={handleChange} />
      <input className="form-control mb-2" placeholder="Location" name="location" value={form.location} onChange={handleChange} />
      <textarea className="form-control mb-2" placeholder="Description" name="description" value={form.description} onChange={handleChange} />
      <button className="btn btn-primary w-100" onClick={handlePost}>Post Job</button>
      <p className="mt-2 text-center">{message}</p>
    </div>
  );
}

export default PostJob;
