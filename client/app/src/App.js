import React from "react";
import "./App.css";
import "./assets/style.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import User from "./pages/User";
import Post from "./pages/Post";
import { ApolloProvider } from "@apollo/client";
import client from "./config/graphql";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <h1>Apollo Client</h1>
          <Link to="/">/User</Link> <Link to="/post">/Post</Link>
          <hr />
          <Switch>
            <Route exact path="/" component={User} />
            <Route path="/post" component={Post} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
