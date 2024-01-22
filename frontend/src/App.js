import React from "react";
import Login from "./components/Login";
import Sigup from "./components/Sigup";
import "./index.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" component={Sigup} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
