import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Home from "./Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/home" component={Home} />
        {/* Add more routes here */}
      </Switch>
    </Router>
  );
};

export default App;
