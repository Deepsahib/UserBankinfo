import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../cascading/Login.css'; // CSS file you'll create

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("http://localhost:3000/api/auth/register", formData);
      console.log(response.data);
      if (response.data.success) {
        navigate('/login');
      }
      alert("Account created successfully!");
      localStorage.setItem('user', JSON.stringify(response.data.token));
      navigate('/navbar');
    } catch (error) {
      console.log(error.message);
      alert("Error creating account. Please try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">
          Register Yourself Here
        </h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label htmlFor="username" className="login-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="login-input"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="login-input"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="login-input"
              required
            />
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Submit
          </button>
        </form>

        <p className="login-footer">
          Already have an account?{' '}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
