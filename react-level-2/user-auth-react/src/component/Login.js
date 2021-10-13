import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
import validator from "validator";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFormErrors, setLoginFormErrors] = useState({});
  const errors = {};

  const runValidation = () => {
    //email field
    if (validator.isEmpty(email)) {
      errors.email = "email not be empty";
    } else if (!validator.isEmail(email)) {
      errors.email = "invalid email formate";
    }

    // password field
    if (validator.isEmpty(password)) {
      errors.password = "password not be empty";
    } else if (!validator.isLength(password, [8, 15])) {
      errors.password = "password must have atleast 8-15 characters";
    }
  };

  const mySpanStyle = {
    color: "red",
    fontFamily: "Arial",
    padding: "10px",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };
    console.log(formData);

    //validation
    runValidation();

    if (Object.keys(errors).length === 0) {
      setLoginFormErrors({});
      axios
        .post("http://dct-user-auth.herokuapp.com/users/login", formData)
        .then((res) => {
          const result = res.data;
          console.log("result", result);
          if (result.hasOwnProperty("error")) {
            // diff way of view particular properties present in object or not Object.keys(result).includes("error")
            alert(result.error);
          } else {
            swal("successfully login ", "success");
            localStorage.setItem("loginToken", result.loginToken);
            props.history.push("/");
            props.handleAuth();
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      setLoginFormErrors(errors);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <div>
      <h2>login page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={handleChange}
          name="email"
          placeholder="enter email"
        />
        <br />
        {loginFormErrors.email && (
          <div>
            <span style={mySpanStyle}>{loginFormErrors.email}</span>
            <br />
            <br />
          </div>
        )}

        <input
          type="password"
          value={password}
          onChange={handleChange}
          name="password"
          placeholder="enter password"
        />
        <br />
        {loginFormErrors.password && (
          <div>
            <span style={mySpanStyle}>{loginFormErrors.password}</span>
            <br />
            <br />
          </div>
        )}

        <input type="submit" value="login" />
      </form>
    </div>
  );
};
export default Login;
