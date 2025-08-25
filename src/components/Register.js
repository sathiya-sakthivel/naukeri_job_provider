import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3 text-center">Register</h2>
      <input className="form-control mb-2" placeholder="Name" name="name" value={form.name} onChange={handleChange} />
      <input className="form-control mb-2" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
      <input className="form-control mb-2" type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} />
      <button className="btn btn-primary w-100" onClick={handleRegister}>Register</button>
      <p className="mt-2 text-center">{message}</p>
      <p className="text-center mt-2">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
