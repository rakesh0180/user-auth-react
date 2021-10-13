import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Account(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://dct-user-auth.herokuapp.com/users/account", {
        headers: {
          "x-auth": localStorage.getItem("loginToken"),
        },
      })
      .then((res) => {
        const result = res.data;
        console.log(result);
        setUser(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <h2>User Account</h2>
      <p>Email - {user.email}</p>
      <p>Username - {user.username}</p>
      <p>Created - {user.createdAt}</p>
    </div>
  );
}
