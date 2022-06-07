import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Data from "./components/Data";
import Form from "./components/Form";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div
        className="container"
        style={{ textAlign: "center", marginTop: "1em" }}
      >
        <Switch>
          <Route exact path="/" render={(props) => <Data {...props} />} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/form" render={(props) => <Form {...props} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
