import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      setMessage(res.data.message);
      setUser(res.data.user);
      navigate("/jobs");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3 text-center">Login</h2>
      <input className="form-control mb-2" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
      <input className="form-control mb-2" type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} />
      <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
      <p className="mt-2 text-center">{message}</p>
      <p className="text-center mt-2">
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
