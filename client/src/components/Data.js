import React, { useState, useEffect } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import axios from "axios";

const Data = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState();
  useEffect(() => {
    if (props.location.state) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API}/admin/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${props.location.state.token}`,
        },
        data: JSON.stringify({
          userId: props.location.state.userId,
        }),
      })
        .then(function (response) {
          setUserData(response.data.data);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.debug(error);
        });
    }
  }, []);

  if (props.location.state) {
    if (isLoading && !userData) {
      return (
        <div>
          <h5>Loading...</h5>
        </div>
      );
    }
    return (
      <Route path={"/"}>
        <div className="form profile-info">
          <div
            className="profile-presentation"
            style={{ flexDirection: "column" }}
          >
            <h4>Profile</h4>
            <p className="profile-comment">
              Some info may be visible to other people
            </p>
          </div>
          <hr />
          <div>
            <span className="text-muted">PHOTO</span>
            <img
              className="image-content"
              src={`${process.env.REACT_APP_API}${userData.photo_url}`}
              alt="profile"
            ></img>
          </div>
          <hr />
          <div>
            <span className="text-muted">NAME</span>
            <span className="text-content">{userData.userName}</span>
          </div>
          <hr />
          <div>
            <span className="text-muted">BIO</span>
            <span style={{ margin: "auto" }}>{userData.bio}</span>
          </div>
          <hr />
          <div>
            <span className="text-muted">PHONE</span>
            <span className="text-content">{userData.phone}</span>
          </div>
          <hr />
          <div>
            <span className="text-muted">EMAIL</span>
            <span className="text-content">{props.location.state.email}</span>
          </div>
          <hr />
          <Link
            to={{
              pathname: "/form",
              state: {
                token: props.location.state.token,
                email: props.location.state.email,
                userId: props.location.state.userId,
              },
            }}
          >
            <button type="button" className="btn btn-primary">
              Edit
            </button>
          </Link>
        </div>
      </Route>
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            prevLocation: "/",
          },
        }}
      />
    );
  }
};

export default Data;
