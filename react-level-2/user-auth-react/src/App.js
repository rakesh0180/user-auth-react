import React, { useEffect, useState } from "react";
import Navbar from "./component/Navbar";

const App = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleAuth = () => {
    setUserLoggedIn(!userLoggedIn);
  };

  //page reload if loginToken is present then call handleAuth
  useEffect(() => {
    if (localStorage.getItem("loginToken")) {
      handleAuth();
    }
  }, []);

  return (
    <div>
      <Navbar userLoggedIn={userLoggedIn} handleAuth={handleAuth} />
    </div>
  );
};
export default App;
