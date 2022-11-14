import React from "react";
import classes from "./App.module.scss";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Header } from "../Header";
import { ArticlesList } from "../ArticlesList";
import { SignUp } from "../User/SignUp";
const App = () => {
  // console.log(service.getArticles())

  return (
    <div className={classes["App"]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path={["/", "/articles"]}>
            <ArticlesList />
          </Route>
          {/* <ArticlesList /> */}
          <Route path="/signup">
            <SignUp />
          </Route> 
        </Switch>
      </Router>
    </div>
  );
};

export default App;
