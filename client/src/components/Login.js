import React, { useRef, useState } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import axios from "axios";

// svg
import devchallenge from "../icons/devchallenges-light.svg";
import google from "../icons/Google.svg";
import facebook from "../icons/Facebook.svg";
import twitter from "../icons/Twitter.svg";
import github from "../icons/Github.svg";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState(null);

  const refEmail = useRef(null);
  const refPassword = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();

    const email = refEmail.current.value;
    const password = refPassword.current.value;

    var data = JSON.stringify({
      email: `${email}`,
      password: `${password}`,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_API}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setToken(response.data.token);
        setUserId(response.data.userId);
        setIsLoggedIn(true);
      })
      .catch(function (error) {
        setMessage("Invalid credentials");
      });
  };

  if (isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: {
            token: token,
            email: refEmail.current.value,
            userId: userId,
          },
        }}
      />
    );
  }
  return (
    <Route path="/login">
      <form
        className="form"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <img className="svg" src={devchallenge} alt="devchallenges" />
        <p>
          <b>Join thousand of learners from around the world</b>
        </p>
        <p>
          Master web development by making real-life projects. There are
          multiple paths for you to choice
        </p>
        <input
          type="email"
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="Email"
          ref={refEmail}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          ref={refPassword}
        />
        <button type="submit" className="btn btn-primary">
          Start coding now
        </button>
        <span className="text-muted">
          or continue with these social profile
        </span>
        <div className="social-container">
          <img className="svg" src={google} alt="google" />
          <img className="svg" src={facebook} alt="facebook" />
          <img className="svg" src={twitter} alt="twitter" />
          <img className="svg" src={github} alt="github" />
        </div>
        <span className="text-muted">
          Don't have an account? <Link to={"/signup"}>Sign Up</Link>
        </span>
        {message && (
          <div className="message">
            <p className="mb-0">{message}</p>
          </div>
        )}
      </form>
    </Route>
  );
};

export default Login;
