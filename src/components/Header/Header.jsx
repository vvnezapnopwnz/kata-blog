// import { Pagination } from 'antd'
import classes from "./Header.module.scss";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={classes["Header"]}>
      <Link to="/articles" className={classes["Header__title"]}>
        RealWorld Blog
      </Link>
      <button className={classes["signin__button"]} onClick={() => {}}>
        Sing In
      </button>
      <button className={classes["signup__button"]} onClick={() => {}}>
        <Link to="/signup">Sing Up</Link>
      </button>
    </header>
  );
};

export default Header;
