// import { Pagination } from 'antd'
import {
  useAuthState,
  useAuthDispatch,
  doLogout,
  alreadyAuthent
} from "../../context/authContext";
import classes from "./Header.module.scss";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Header = () => {
  const { user: loggedUser, status, error } = useAuthState();
  const dispatch = useAuthDispatch();
  const logOut = () => doLogout(dispatch);


  return (
    <header className={classes["Header"]}>
      <Link to="/articles" className={classes["Header__title"]}>
        RealWorld Blog
      </Link>
      {loggedUser ? (
        <>
          <button className={classes["create-article__button"]} onClick={() => {}}>
            <Link to="/create"> Create article</Link>
          </button>
          <Link to="/profile">
          <div className={classes['user']}>
            <div className={classes['user__name']}>{loggedUser.username}</div>
            <img
              className={classes['user__avatar']}
              src={loggedUser.image}
              alt={`${loggedUser.username}`}
            />
          </div>
          </Link>
          <button className={classes["logout__button"]} onClick={() => logOut()}>
            LogOut
          </button>
        </>
      ) : (
        <>
          <button className={classes["signin__button"]} onClick={() => {}}>
            <Link to="/sign-in">Sing In</Link>
          </button>
          <button className={classes["signup__button"]} onClick={() => {}}>
            <Link to="/sign-up">Sing Up</Link>
          </button>
        </>
      )}
    </header>
  );
};

export default Header;
