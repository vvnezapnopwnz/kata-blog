import { ArticlesList } from "../ArticlesList";
import { Header } from "../Header";
import { SingleArticle } from "../SingleArticle";
import { SignIn } from "../User/SignIn";
import { SignUp } from "../User/SignUp";
import classes from "./App.module.scss";
import "antd/dist/antd.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

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
          <Route path={"/articles/:slug"}>
            <SingleArticle />
          </Route>
          {/* <ArticlesList /> */}
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
