import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^\S+@\S+\.\S+$/;

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = "Provide username";
      isValid = false;
    } else if (!usernameRegex.test(formData.username)) {
      newErrors.username = "Invalid username";
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Provide email";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email";
      isValid = false;
    }

    // Validate password
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const url =
        "http://localhost/phpfullstack/1.1/ReactPhpAuth/backend/signup.php";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to register new user. Status: ${response.status}`
        );
      } else {
        const result = await response.json();
        console.log(result);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <p className="forms_header">SIGNUP</p>
      <form onSubmit={handleSignUp}>
        <div className="input_div">
          <input
            type="text"
            name="username"
            placeholder="Username.."
            value={formData.username}
            onChange={handleChange}
          />
          <p className="error">{errors.username}</p>
        </div>
        <div className="input_div">
          <input
            type="text"
            name="email"
            placeholder="Email.."
            value={formData.email}
            onChange={handleChange}
          />
          <p className="error">{errors.email}</p>
        </div>
        <div className="input_div">
          <input
            type="password"
            name="password"
            placeholder="Password.."
            value={formData.password}
            onChange={handleChange}
          />
          <p className="error">{errors.password}</p>
        </div>
        <div className="input_div">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password.."
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <p className="error">{errors.confirmPassword}</p>
        </div>
        <input type="submit" value="SIGNUP" />
      </form>
      <p className="linker">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
