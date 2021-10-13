import React from "react";
import { Link, Redirect, Route, withRouter } from "react-router-dom";
import Account from "./Account";
import Home from "./Home";
import Login from "./Login";
import NotesContainer from "./notes/Notescontainer";
import Register from "./Register";

const Navbar = (props) => {
  const { userLoggedIn, handleAuth } = props;

  return (
    <div>
      <h1> user auth</h1>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {userLoggedIn ? (
          <React.Fragment>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/notes">My Notes</Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  localStorage.removeItem("loginToken");
                  alert("successfully logged out");
                  handleAuth();
                  props.history.push("/");
                }}
              >
                Logout
              </Link>
            </li>
          </React.Fragment>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </> //React.Fragment
        )}
      </ul>

      <Route path="/" component={Home} exact={true}></Route>
      <Route path="/register" component={Register} exact={true} />
      <Route
        path="/login"
        // exact={true}
        render={(props) => {
          return <Login {...props} handleAuth={handleAuth} />;
        }}
      />
      {/* <Route path="/login" component={Login} exact={true}/> or */}

      {userLoggedIn ? (
        <>
          <Route path="/account" component={Account} />
          <Route path="/notes" component={NotesContainer} />
        </>
      ) : (
        <>
          <Redirect to="/"></Redirect>
        </>
      )}
    </div>
  );
};

const WrappedNavbar = withRouter(Navbar);
export default WrappedNavbar;
/*
shorthand
export default withRouter(Navbar)
*/
