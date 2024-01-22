import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="container">
      <p className="forms_header">LOGIN</p>
      <form>
        <div className="input_div">
          <input type="text" name="username" placeholder="Username.." />
        </div>
        <div className="input_div">
          <input type="text" name="password" placeholder="Password.." />
        </div>
        <input type="submit" value="LOGIN" />
      </form>
      <p className="linker">
        Don't have account-?<Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
