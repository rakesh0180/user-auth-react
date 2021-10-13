import React, { useState } from "react";
import axios from "axios";
import validator from "validator";
import swal from "sweetalert";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const errors = {};

  const runValidation = () => {
    //username validation
    if (validator.isEmpty(username)) {
      errors.username = "username can't be empty";
    } else if (!username.match(/^[A-Za-z]+$/)) {
      errors.username = "username should have only character value";
    }
    // email validation
    if (validator.isEmpty(email)) {
      errors.email = "email can't be empty";
    } else if (!validator.isEmail(email)) {
      errors.email = "invalid email formate";
    }
    // password validation
    if (validator.isEmpty(password)) {
      errors.password = "password can't be empty";
    } else if (!validator.isLength(password, [8, 15])) {
      errors.password = "password must have atleast 8-15 characters";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      email: email,
      password: password,
    };
    console.log(formData);

    runValidation();

    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      axios
        .post("http://dct-user-auth.herokuapp.com/users/register", formData)
        .then((res) => {
          const result = res.data;
          console.log(result);

          if (result.hasOwnProperty("err")) {
            //to display api error
            alert(result.message);
          } else {
            swal("Successfully Registered", "success", {
              buttons: false,
              timer: 2950,
            });
            //  console.log("successfully created account");
            props.history.push("/login"); //
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      setFormErrors(errors);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const mySpanStyle = {
    color: "red",
    fontFamily: "Arial",
    padding: "10px",
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleChange}
          name="username"
          placeholder="enter username"
        />
        <br />
        {formErrors.username && (
          <span style={mySpanStyle}>{formErrors.username}</span>
        )}
        <br />
        <input
          type="text"
          value={email}
          onChange={handleChange}
          placeholder="enter email"
          name="email"
        />
        <br />
        {formErrors.email && (
          <span style={mySpanStyle}>{formErrors.email}</span>
        )}
        <br />
        <input
          type="password"
          value={password}
          onChange={handleChange}
          name="password"
          placeholder="enter password"
        />
        <br />
        {formErrors.password && (
          <span style={mySpanStyle}>{formErrors.password}</span>
        )}
        <br />
        <input type="submit" value="Sign In" />
      </form>
    </div>
  );
};
export default Register;
