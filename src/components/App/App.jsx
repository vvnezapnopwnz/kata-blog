import blogService from "../../services/blogService";
import { ArticlesList } from "../ArticlesList";
import { Header } from "../Header";
import { SingleArticle } from "../SingleArticle";
import { SignIn } from "../User/SignIn";
import { SignUp } from "../User/SignUp";
import { Profile } from "../User/Profile";
import classes from "./App.module.scss";
import "antd/dist/antd.css";
import React, { useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  useAuthState,
  useAuthDispatch,
  alreadyAuthent
} from "../../context/authContext";
const App = () => {
  // console.log(service.getArticles())
  const { getArticles, getArticle } = new blogService();
  const {  status } = useAuthState();
  const dispatch = useAuthDispatch();
  useEffect(() => {
    if(localStorage.getItem('token') && status === 'idle') {
      alreadyAuthent(dispatch)
    }
  }, [dispatch, status]);


  return (
    <div className={classes["App"]}>
        <Router>
          <Header />
          <Switch>
            <Route exact path={["/", "/articles"]}>
              <ArticlesList getArticles={getArticles} />
            </Route>
            <Route path={"/articles/:slug"}>
              <SingleArticle getArticle={getArticle} />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
    </div>
  );
};

export default App;
