import React, { useState, useEffect, useRef } from "react";
import { Route, Redirect } from "react-router-dom";

import axios from "axios";
import FormData from "form-data";

const Form = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [redirect, setRedirect] = useState(false);

  const refName = useRef(null);
  const refImage = useRef(null);
  const refBio = useRef(null);
  const refPhone = useRef(null);
  let image_url = "";

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let data = JSON.stringify({
      userId: props.location.state.userId,
      data: {
        userName: refName.current.value,
        bio: refBio.current.value,
        photo_url: image_url,
        phone: refPhone.current.value,
      },
    });

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_API}/admin/update`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${props.location.state.token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setIsLoading(false);
        setRedirect(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: {
            token: props.location.state.token,
            email: props.location.state.email,
            userId: props.location.state.userId,
          },
        }}
      />
    );
  }

  if (props.location.state) {
    if (isLoading) {
      return (
        <div>
          <h5>Loading...</h5>
        </div>
      );
    }

    return (
      <Route path={"/"}>
        <form
          className="form profile-info"
          encType="multipart/form-data"
          onSubmit={submitHandler}
        >
          <div
            className="profile-presentation"
            style={{ flexDirection: "column" }}
          >
            <h4>Change info</h4>
            <p className="profile-comment">
              Changes will be reflected to every services
            </p>
          </div>
          <hr />
          <div>
            <span className="text-muted">CHANGE PHOTO</span>
            <input
              type="file"
              className="form-control"
              placeholder={userData.userName}
              ref={refImage}
              onChange={() => {
                let data = new FormData();
                data.append("image", refImage.current.files[0]);
                data.append("userId", props.location.state.userId);

                let config = {
                  method: "post",
                  url: `${process.env.REACT_APP_API}/admin/upload`,
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${props.location.state.token}`,
                  },
                  data: data,
                };

                axios(config)
                  .then(async (response) => {
                    image_url = await response.data.url;
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }}
            ></input>
          </div>
          <hr />
          <div>
            <span className="text-muted">NAME</span>
            <input
              type="text"
              className="form-control"
              placeholder={userData.userName}
              ref={refName}
            ></input>
          </div>
          <hr />
          <div>
            <span className="text-muted">BIO</span>
            <textarea
              className="form-control"
              rows="3"
              placeholder={userData.bio}
              ref={refBio}
            ></textarea>
          </div>
          <hr />
          <div>
            <span className="text-muted">PHONE</span>
            <input
              type="text"
              className="form-control"
              placeholder={userData.phone}
              ref={refPhone}
            ></input>
          </div>
          <hr />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
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

export default Form;
